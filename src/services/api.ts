import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_BASE_URL
})

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("crmAccessToken")
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (err) => {

    if (err.response?.status === 401) {
      const isLoginRequest = err.config?.url?.includes("/auth/login")
      if (!isLoginRequest) {
        localStorage.removeItem("crmAccessToken")
        localStorage.removeItem("crmRefreshToken")
        window.location.href = "/login"
        
      }
      return Promise.reject(err)
    }
    return Promise.reject(err);
  }
);


export default api
