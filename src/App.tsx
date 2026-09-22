import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConfigProvider, theme } from "antd"
import { useSelector } from "react-redux"
import IndexRoute from "./routes/IndexRoute"
import UserProvider from "./features/auth/contexts/UserContext"

const queryClient = new QueryClient()

function App() {
  const isDark = useSelector((state: any) => state.theme?.isDark)

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#4EA674",
          borderRadius: 12,
          colorBgContainer: isDark ? "#1e293b" : "#ffffff",
          colorText: isDark ? "#e5e7eb" : "#111827",
          colorTextSecondary: isDark ? "#94a3b8" : "#6b7280",
          colorTextPlaceholder: isDark ? "#94a3b8" : "#9ca3af",
          colorBorder: isDark ? "#475569" : "#e5e7eb",
        },
        components: {
          Table: {
            headerBg: isDark ? "#334155" : "#F6FBF8",
            headerColor: isDark ? "#cbd5e1" : "#6b7280",
            rowHoverBg: isDark ? "#334155" : "#f9fafb",
            borderColor: isDark ? "#334155" : "#f3f4f6",
            colorBgContainer: isDark ? "#1e293b" : "#ffffff",
          },
          Pagination: {
            itemActiveBg: "#4EA674",
            colorText: isDark ? "#e5e7eb" : "#374151",
          },
          Modal: {
            contentBg: isDark ? "#1e293b" : "#ffffff",
            headerBg: isDark ? "#1e293b" : "#ffffff",
            titleColor: isDark ? "#f8fafc" : "#111827",
          },
          Drawer: {
            colorBgElevated: isDark ? "#0f172a" : "#ffffff",
          },
          Input: {
            colorBgContainer: isDark ? "#0f172a" : "#ffffff",
            colorText: isDark ? "#f8fafc" : "#111827",
            activeShadow: "0 0 0 2px rgba(78, 166, 116, 0.18)",
          },
          InputNumber: {
            colorBgContainer: isDark ? "#0f172a" : "#ffffff",
            colorText: isDark ? "#f8fafc" : "#111827",
            activeShadow: "0 0 0 2px rgba(78, 166, 116, 0.18)",
          },
          Select: {
            colorBgContainer: isDark ? "#0f172a" : "#ffffff",
            optionSelectedBg: isDark ? "#334155" : "#EAF5EF",
          },
          Switch: {
            colorPrimary: "#4EA674",
            colorPrimaryHover: "#5bb882",
          },
          Button: {
            colorPrimary: "#4EA674",
            colorPrimaryHover: "#5bb882",
            colorPrimaryActive: "#3d8b5f",
            primaryColor: "#ffffff",
            defaultBg: isDark ? "#1e293b" : "#ffffff",
            defaultBorderColor: isDark ? "#475569" : "#e5e7eb",
          },
          Form: {
            labelColor: isDark ? "#cbd5e1" : "#4b5563",
          },
        },
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <IndexRoute />
          </UserProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App