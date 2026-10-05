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
          colorBgContainer: isDark ? "#24302a" : "#ffffff",
          colorText: isDark ? "#f4f7f5" : "#121816",
          colorBorder: isDark ? "rgba(255,255,255,0.12)" : "#e6eae7",
        },
        components: {
          Input: {
            colorBgContainer: isDark ? "#1a2420" : "#f7faf8",
            hoverBg: isDark ? "#1a2420" : "#f7faf8",
            activeBg: isDark ? "#1a2420" : "#ffffff",
            colorText: isDark ? "#f4f7f5" : "#121816",
            colorBorder: isDark ? "rgba(255,255,255,0.16)" : "#e6eae7",
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
        <aside className="relative hidden w-[44%] overflow-hidden bg-[#143026] text-white lg:flex lg:flex-col">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(61,204,122,0.35),transparent_42%),radial-gradient(circle_at_80%_85%,rgba(16,80,48,0.55),transparent_46%)]" />
          <div className="relative flex items-center gap-3 px-12 pt-12">
            <img src={MARK} alt="" className="h-9 w-9" />
            <span className="text-lg font-bold tracking-[-0.03em]">Dealport</span>
          </div>

          <div className="relative mt-16 flex flex-1 flex-col px-12 pb-12">
            <p className="max-w-md text-[42px] font-bold leading-[1.08] tracking-[-0.045em]">
              Do‘koningizni bir joydan boshqaring
            </p>
            <p className="mt-5 max-w-sm text-[15px] leading-7 text-white/75">
              Buyurtmalar, mahsulotlar va mijozlar bitta dashboardda.
            </p>

            <div className="mt-12 space-y-3">
              {[
                { icon: "bi-bag-check", label: "Buyurtmalar va holatlar" },
                { icon: "bi-box-seam", label: "Katalog va ombor" },
                { icon: "bi-people", label: "Mijozlar va hisobotlar" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3.5 backdrop-blur-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/12">
                    <i className={`bi ${item.icon}`} />
                  </span>
                  <span className="text-sm font-semibold">{item.label}</span>
                </div>
              ))}
            </div>

            <p className="mt-auto pt-10 text-xs text-white/45">Dealport admin</p>
          </div>
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

          <div className="w-full max-w-[420px] rounded-3xl border border-line bg-white p-7 shadow-[0_20px_60px_rgba(16,24,20,0.08)] sm:p-8 dark:border-white/10 dark:bg-[#24302a] dark:shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
            <div className="mb-6 lg:hidden">
              <img src={LOGO} alt="Dealport" className="h-7" />
            </div>
            <p className="text-[26px] font-bold tracking-[-0.04em] text-ink">Xush kelibsiz</p>
            <p className="mt-1.5 text-sm text-muted">Hisobingizga kiring</p>

            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={(values) => mutate(values)}
              className="mt-7"
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
