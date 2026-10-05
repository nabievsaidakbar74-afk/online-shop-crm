import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConfigProvider, theme } from "antd"
import { useSelector } from "react-redux"
import IndexRoute from "./routes/IndexRoute"
import UserProvider from "./features/auth/contexts/UserContext"
import type { RootState } from "./store"

const queryClient = new QueryClient()

function App() {
  const isDark = useSelector((state: RootState) => state.theme.isDark)

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#2E9A62",
          colorPrimaryHover: "#21764A",
          colorPrimaryActive: "#1B6840",
          borderRadius: 10,
          fontFamily: '"Manrope", ui-sans-serif, system-ui, sans-serif',
          controlHeight: 40,
          colorBgContainer: isDark ? "#16202C" : "#ffffff",
          colorText: isDark ? "#F3F6F8" : "#121816",
          colorTextSecondary: isDark ? "#A7B3C2" : "#66716B",
          colorTextPlaceholder: isDark ? "#7E8C9E" : "#8B958F",
          colorBorder: isDark ? "rgba(255,255,255,0.08)" : "#E6EAE7",
          colorBgElevated: isDark ? "#16202C" : "#ffffff",
        },
        components: {
          Table: {
            headerBg: "transparent",
            headerColor: isDark ? "#7E8C9E" : "#8B958F",
            rowHoverBg: isDark ? "rgba(46,154,98,0.12)" : "#E8F6EE",
            borderColor: isDark ? "rgba(255,255,255,0.08)" : "#E6EAE7",
            colorBgContainer: isDark ? "#16202C" : "#ffffff",
          },
          Pagination: {
            itemActiveBg: "#2E9A62",
            colorText: isDark ? "#F3F6F8" : "#121816",
          },
          Modal: {
            contentBg: isDark ? "#16202C" : "#ffffff",
            headerBg: isDark ? "#16202C" : "#ffffff",
            titleColor: isDark ? "#F3F6F8" : "#121816",
          },
          Drawer: {
            colorBgElevated: isDark ? "#121A24" : "#ffffff",
          },
          Input: {
            colorBgContainer: isDark ? "#101820" : "#ffffff",
            colorText: isDark ? "#F3F6F8" : "#121816",
            activeShadow: "0 0 0 3px rgba(46, 154, 98, 0.16)",
          },
          InputNumber: {
            colorBgContainer: isDark ? "#101820" : "#ffffff",
            colorText: isDark ? "#F3F6F8" : "#121816",
            activeShadow: "0 0 0 3px rgba(46, 154, 98, 0.16)",
          },
          Select: {
            colorBgContainer: isDark ? "#101820" : "#ffffff",
            optionSelectedBg: isDark ? "rgba(46,154,98,0.16)" : "#E8F6EE",
          },
          Switch: {
            colorPrimary: "#2E9A62",
            colorPrimaryHover: "#3AAD74",
          },
          Button: {
            colorPrimary: "#2E9A62",
            colorPrimaryHover: "#21764A",
            colorPrimaryActive: "#1B6840",
            primaryColor: "#ffffff",
            defaultBg: isDark ? "#16202C" : "#ffffff",
            defaultBorderColor: isDark ? "rgba(255,255,255,0.1)" : "#E6EAE7",
          },
          Form: {
            labelColor: isDark ? "#A7B3C2" : "#3E4A44",
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