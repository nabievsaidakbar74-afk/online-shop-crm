import { useEffect } from "react"
import { Button, ConfigProvider, Form, Input, Typography, theme } from "antd"
import { useSelector } from "react-redux"
import LOGO from "../../../assets/svg/DealPort.svg"
import useLogin from "../hooks/useLogin"

type LoginValues = {
  login: string
  email: string
  password: string
}

export default function Login() {
  const isDark = useSelector((state: { theme: { isDark: boolean } }) => state.theme.isDark)
  const { isPending, mutate } = useLogin()
  const [form] = Form.useForm<LoginValues>()

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  const onFinish = (values: LoginValues) => {
    mutate(values)
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#2E9A62",
          borderRadius: 10,
          fontFamily: "inherit",
          colorTextLightSolid: "#ffffff",
          colorBgContainer: isDark ? "#334155" : "#ffffff",
          colorText: isDark ? "#e5e7eb" : "#111827",
          colorTextHeading: isDark ? "#f8fafc" : "#111827",
          colorBorder: isDark ? "#475569" : "#e5e7eb",
        },
        components: {
          Input: {
            colorBgContainer: isDark ? "#334155" : "#ffffff",
            hoverBg: isDark ? "#334155" : "#ffffff",
            activeBg: isDark ? "#334155" : "#ffffff",
            colorText: isDark ? "#f8fafc" : "#111827",
            colorBorder: isDark ? "#475569" : "#e5e7eb",
            hoverBorderColor: isDark ? "#64748b" : "#2E9A62",
            colorTextPlaceholder: isDark ? "#94a3b8" : "#9ca3af",
          },
          Button: {
            colorPrimary: "#2E9A62",
            colorPrimaryHover: "#21764A",
            colorPrimaryActive: "#1B6840",
            primaryColor: "#ffffff",
            colorTextLightSolid: "#ffffff",
          },
          Typography: {
            colorTextHeading: isDark ? "#f8fafc" : "#111827",
            colorText: isDark ? "#d1d5db" : "#6b7280",
          },
        },
      }}
    >
      <div className={`relative min-h-dvh w-full flex items-center justify-center p-4 ${isDark ? "bg-[#0E141C]" : "bg-canvas"}`}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(46,154,98,0.14),transparent_55%)]" />
        <div className={`relative w-full max-w-[420px] rounded-2xl border p-8 shadow-[0_12px_40px_rgba(16,24,20,0.06)] ${isDark ? "border-white/10 bg-[#16202C]" : "border-line bg-white"}`}>
          <div className="flex flex-col items-center gap-2 mb-8">
            <img src={LOGO} alt="DealPort" className="h-9" />
            <Typography.Title
              level={3}
              style={{ margin: "12px 0 0", color: isDark ? "#f8fafc" : "#111827" }}
            >
              Welcome back
            </Typography.Title>
            <Typography.Text style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
              Sign in to your CRM account
            </Typography.Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            initialValues={{
              login: "admin@example.com",
              email: "admin@example.com",
              password: "Admin123!",
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label={<span style={{ color: isDark ? "#e5e7eb" : "#374151" }}>Email</span>}
              name="email"
              rules={[
                { required: true, message: "Email kiriting" },
                { type: "email", message: "Email noto‘g‘ri" },
              ]}
            >
              <Input
                size="large"
                prefix={<i className="bi bi-envelope text-gray-400" />}
                placeholder="customer@example.com"
                className={isDark ? "[&_input]:[-webkit-text-fill-color:#f8fafc] [&_input]:[box-shadow:0_0_0_1000px_#334155_inset]" : ""}
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: isDark ? "#e5e7eb" : "#374151" }}>Password</span>}
              name="password"
              rules={[{ required: true, message: "Parol kiriting" }]}
            >
              <Input.Password
                size="large"
                prefix={<i className="bi bi-lock text-gray-400" />}
                placeholder="Customer123!"
                className={isDark ? "[&_input]:[-webkit-text-fill-color:#f8fafc] [&_input]:[box-shadow:0_0_0_1000px_#334155_inset]" : ""}
              />
            </Form.Item>

            <Form.Item className="mb-0! mt-6!">
              <Button type="primary" htmlType="submit" size="large" block loading={isPending} disabled={isPending}>
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  )
}
