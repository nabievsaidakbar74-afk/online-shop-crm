import { useEffect } from "react"
import { Button, ConfigProvider, Form, Input, theme } from "antd"
import { useDispatch, useSelector } from "react-redux"
import LOGO from "../../../assets/svg/DealPort.svg"
import MARK from "../../../assets/svg/DealPortMark.svg"
import { actionTheme } from "../../../store"
import useLogin from "../hooks/useLogin"

type LoginValues = {
  email: string
  password: string
}

export default function Login() {
  const isDark = useSelector((state: { theme: { isDark: boolean } }) => state.theme.isDark)
  const dispatch = useDispatch()
  const { isPending, mutate } = useLogin()
  const [form] = Form.useForm<LoginValues>()

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#2E9A62",
          borderRadius: 12,
          fontFamily: "inherit",
          colorTextLightSolid: "#ffffff",
          colorBgContainer: isDark ? "#1c211e" : "#ffffff",
          colorText: isDark ? "#f4f7f5" : "#121816",
          colorBorder: isDark ? "rgba(255,255,255,0.12)" : "#e6eae7",
        },
        components: {
          Input: {
            colorBgContainer: isDark ? "#121614" : "#f7faf8",
            hoverBg: isDark ? "#121614" : "#f7faf8",
            activeBg: isDark ? "#121614" : "#ffffff",
            colorText: isDark ? "#f4f7f5" : "#121816",
            colorBorder: isDark ? "rgba(255,255,255,0.1)" : "#e6eae7",
            hoverBorderColor: "#2E9A62",
            activeBorderColor: "#2E9A62",
            colorTextPlaceholder: isDark ? "#8d9891" : "#8b958f",
          },
          Button: {
            colorPrimary: "#2E9A62",
            colorPrimaryHover: "#21764A",
            colorPrimaryActive: "#1B6840",
            primaryColor: "#ffffff",
            colorTextLightSolid: "#ffffff",
          },
        },
      }}
    >
      <div className="flex min-h-dvh bg-canvas text-ink">
        <aside className="relative hidden w-[46%] overflow-hidden bg-[#101512] text-white lg:flex lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute -left-24 top-[-10%] h-80 w-80 rounded-full bg-[#2E9A62]/30 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-12%] right-[-8%] h-96 w-96 rounded-full bg-[#3dcc7a]/15 blur-3xl" />
          <div className="relative flex items-center gap-3 px-10 pt-10">
            <img src={MARK} alt="" className="h-8 w-8" />
            <img src={LOGO} alt="Dealport" className="h-6 brightness-0 invert" />
          </div>
          <div className="relative px-10">
            <p className="max-w-sm text-[40px] font-bold leading-[1.1] tracking-[-0.04em]">
              Do‘koningizni bir joydan boshqaring
            </p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">
              Buyurtmalar, mahsulotlar va mijozlar bitta dashboardda.
            </p>
          </div>
          <p className="relative px-10 pb-10 text-xs text-white/40">Dealport admin</p>
        </aside>

        <main className="relative flex flex-1 items-center justify-center px-5 py-10">
          <button
            type="button"
            onClick={() => dispatch(actionTheme.toggleTheme())}
            className="icon-btn absolute right-4 top-4"
            aria-label="Toggle theme"
          >
            <i className={`bi ${isDark ? "bi-sun" : "bi-moon"}`} />
          </button>

          <div className="w-full max-w-[400px]">
            <div className="mb-8 lg:hidden">
              <img src={LOGO} alt="Dealport" className="h-7" />
            </div>
            <p className="text-[28px] font-bold tracking-[-0.04em] text-ink">Xush kelibsiz</p>
            <p className="mt-1.5 text-sm text-muted">Hisobingizga kiring</p>

            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={(values) => mutate(values)}
              className="mt-8"
            >
              <Form.Item
                label={<span className="text-sm font-semibold text-ink">Email</span>}
                name="email"
                rules={[
                  { required: true, message: "Email kiriting" },
                  { type: "email", message: "Email noto‘g‘ri" },
                ]}
              >
                <Input
                  size="large"
                  autoComplete="email"
                  prefix={<i className="bi bi-envelope text-faint" />}
                  placeholder="name@company.com"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-sm font-semibold text-ink">Parol</span>}
                name="password"
                rules={[{ required: true, message: "Parol kiriting" }]}
              >
                <Input.Password
                  size="large"
                  autoComplete="current-password"
                  prefix={<i className="bi bi-lock text-faint" />}
                  placeholder="Parolingiz"
                />
              </Form.Item>

              <Form.Item className="mb-0! mt-2!">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={isPending}
                  disabled={isPending}
                  className="h-11! font-semibold!"
                >
                  Kirish
                </Button>
              </Form.Item>
            </Form>
          </div>
        </main>
      </div>
    </ConfigProvider>
  )
}
