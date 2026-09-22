import { useEffect } from "react"
import { Button, Form, Input } from "antd"
import useMe from "../hooks/usMe"
import useUpdateProfile from "../hooks/useUpdateProfile"
import useUpdatePassword from "../hooks/useUpdatePassword"

const pageWrap =
  "p-5 space-y-5 overflow-y-auto h-[calc(100vh-6rem)] bg-[#F3F4F6] dark:bg-slate-900"

const card =
  "rounded-2xl border bg-white border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:bg-slate-800 dark:border-slate-700/60 dark:shadow-none"

const fallbackAvatar = "https://placehold.co/240x240?text=Avatar"

function SectionTitle({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-9 h-9 shrink-0 rounded-xl bg-[#4EA674]/10 text-[#4EA674] flex items-center justify-center">
        <i className={`bi ${icon}`} />
      </span>
      <div>
        <h3 className="font-semibold text-sm text-gray-800 dark:text-white">{title}</h3>
        {subtitle && <p className="text-xs text-gray-400 dark:text-slate-400">{subtitle}</p>}
      </div>
    </div>
  )
}

function InfoRow({ label, value, mono }: { label: string; value?: string | number | null; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-gray-50 last:border-0 dark:border-slate-700/40">
      <span className="text-xs text-gray-400 dark:text-slate-400">{label}</span>
      <span
        className={`text-xs font-medium text-gray-700 dark:text-slate-200 truncate max-w-45 text-right ${mono ? "font-mono" : ""
          }`}
      >
        {value === null || value === undefined || value === "" ? "—" : value}
      </span>
    </div>
  )
}

function roleLabel(role?: string) {
  if (!role) return "—"
  return role.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function Profile() {
  const { data, isLoading } = useMe()
  const profile = data?.data ?? data

  const [profileForm] = Form.useForm()
  const [passwordForm] = Form.useForm()

  const { isPending: isSaving, updateProfile } = useUpdateProfile()
  const { isPending: isChangingPassword, updatePassword } = useUpdatePassword()

  const avatar = Form.useWatch("avatar", profileForm)
  const firstName = Form.useWatch("firstName", profileForm)
  const lastName = Form.useWatch("lastName", profileForm)

  useEffect(() => {
    if (profile) {
      profileForm.setFieldsValue({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        avatar: profile.avatar,
      })
    }
  }, [profile, profileForm])

  const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim()

  const formatDate = (value?: string) =>
    value
      ? new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
      : "—"

  const handleProfileFinish = (values: any) => {
    updateProfile({
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      avatar: values.avatar,
    })
  }

  const handlePasswordFinish = (values: any) => {
    updatePassword(
      { currentPassword: values.currentPassword, newPassword: values.newPassword },
      { onSuccess: () => passwordForm.resetFields() }
    )
  }

  const handleReset = () => {
    profileForm.setFieldsValue({
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      phone: profile?.phone,
      avatar: profile?.avatar,
    })
  }

  if (isLoading) {
    return (
      <div className={pageWrap}>
        <div className="h-36 rounded-3xl bg-gray-200/70 dark:bg-slate-800 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <div className="h-96 rounded-2xl bg-gray-200/70 dark:bg-slate-800 animate-pulse" />
            <div className="h-72 rounded-2xl bg-gray-200/70 dark:bg-slate-800 animate-pulse" />
          </div>
          <div className="space-y-5">
            <div className="h-72 rounded-2xl bg-gray-200/70 dark:bg-slate-800 animate-pulse" />
            <div className="h-56 rounded-2xl bg-gray-200/70 dark:bg-slate-800 animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={pageWrap}>
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#4EA674] to-[#2f7f56] p-6">
        {avatar && (
          <img src={avatar} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 blur-[3px]" />
        )}
        <div className="relative flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/20 backdrop-blur-sm flex items-center justify-center text-white/80 shrink-0 ring-2 ring-white/30">
              <img
                src={avatar || fallbackAvatar}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = fallbackAvatar
                }}
              />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-white truncate">{fullName || "Admin"}</h1>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${profile?.isActive ? "bg-white text-[#2f7f56]" : "bg-white/20 text-white"
                    }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${profile?.isActive ? "bg-[#4EA674]" : "bg-white/70"}`} />
                  {profile?.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="mt-1 text-sm text-white/80 truncate">{profile?.email}</p>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-medium text-white">
                <i className="bi bi-shield-check" />
                {roleLabel(profile?.role)}
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-white/15 px-4 py-2.5 backdrop-blur-sm">
            <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-white/70">
              <i className="bi bi-clock-history" />
              Oxirgi yangilanish
            </p>
            <p className="text-base font-semibold text-white">{formatDate(profile?.updatedAt)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        <div className="lg:col-span-2 space-y-5">
          <Form form={profileForm} layout="vertical" requiredMark={false} onFinish={handleProfileFinish}>
            <div className={`${card} p-6`}>
              <div className="pb-4 mb-5 border-b border-gray-100 dark:border-slate-700/60">
                <SectionTitle
                  icon="bi-person-gear"
                  title="Shaxsiy ma'lumotlar"
                  subtitle="Faqat quyidagi maydonlarni o'zgartirish mumkin"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <Form.Item
                  label="Ism"
                  name="firstName"
                  rules={[{ required: true, message: "Ismni kiriting" }]}
                >
                  <Input size="large" placeholder="Valijonjon" prefix={<i className="bi bi-person text-gray-400" />} />
                </Form.Item>

                <Form.Item
                  label="Familiya"
                  name="lastName"
                  rules={[{ required: true, message: "Familiyani kiriting" }]}
                >
                  <Input size="large" placeholder="Aliyev" prefix={<i className="bi bi-person text-gray-400" />} />
                </Form.Item>

                <Form.Item
                  label="Telefon raqami"
                  name="phone"
                  rules={[{ required: true, message: "Telefon raqamini kiriting" }]}
                >
                  <Input size="large" placeholder="+998901234567" prefix={<i className="bi bi-telephone text-gray-400" />} />
                </Form.Item>

                <Form.Item label="Avatar havolasi" name="avatar">
                  <Input size="large" placeholder="https://..." prefix={<i className="bi bi-image text-gray-400" />} />
                </Form.Item>
              </div>

              <div className="mt-2 rounded-2xl border border-gray-100 bg-gray-50/70 p-4 dark:border-slate-700/60 dark:bg-slate-900/40">
                <p className="mb-3 inline-flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-slate-400">
                  <i className="bi bi-lock" />
                  Bu maydonlarni o'zgartirib bo'lmaydi
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2 text-sm text-gray-500 dark:text-slate-400">E-mail</p>
                    <Input
                      size="large"
                      disabled
                      value={profile?.email}
                      prefix={<i className="bi bi-envelope text-gray-400" />}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-sm text-gray-500 dark:text-slate-400">Rol</p>
                    <Input
                      size="large"
                      disabled
                      value={roleLabel(profile?.role)}
                      prefix={<i className="bi bi-shield-check text-gray-400" />}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-100 pt-4 dark:border-slate-700/60">
                <p className="hidden sm:block text-xs text-gray-400 dark:text-slate-400">
                  O'zgarishlar darhol saqlanadi
                </p>
                <div className="flex items-center gap-3 ml-auto">
                  <Button size="large" shape="round" onClick={handleReset} disabled={isSaving}>
                    Bekor qilish
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    shape="round"
                    loading={isSaving}
                    icon={<i className="bi bi-check2" />}
                    onClick={() => profileForm.submit()}
                  >
                    O'zgarishlarni saqlash
                  </Button>
                </div>
              </div>
            </div>
          </Form>

          <div className={`${card} p-6`}>
            <div className="pb-4 mb-5 border-b border-gray-100 dark:border-slate-700/60">
              <SectionTitle icon="bi-key" title="Parolni o'zgartirish" subtitle="Xavfsizlik uchun kuchli parol tanlang" />
            </div>

            <Form form={passwordForm} layout="vertical" requiredMark={false} onFinish={handlePasswordFinish}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
                <Form.Item
                  label="Joriy parol"
                  name="currentPassword"
                  rules={[{ required: true, message: "Joriy parolni kiriting" }]}
                >
                  <Input.Password size="large" placeholder="••••••••" />
                </Form.Item>

                <Form.Item
                  label="Yangi parol"
                  name="newPassword"
                  rules={[
                    { required: true, message: "Yangi parolni kiriting" },
                    { min: 6, message: "Kamida 6 ta belgi bo'lsin" },
                  ]}
                >
                  <Input.Password size="large" placeholder="••••••••" />
                </Form.Item>

                <Form.Item
                  label="Parolni takrorlang"
                  name="confirmPassword"
                  dependencies={["newPassword"]}
                  rules={[
                    { required: true, message: "Parolni takrorlang" },
                    ({ getFieldValue }) => ({
                      validator: (_, value) =>
                        !value || getFieldValue("newPassword") === value
                          ? Promise.resolve()
                          : Promise.reject(new Error("Parollar mos kelmadi")),
                    }),
                  ]}
                >
                  <Input.Password size="large" placeholder="••••••••" />
                </Form.Item>
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="hidden sm:block text-xs text-gray-400 dark:text-slate-400">
                  <i className="bi bi-info-circle mr-1.5" />
                  Parol o'zgargach, yangi parol bilan kirasiz
                </p>
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  className="ml-auto"
                  loading={isChangingPassword}
                  icon={<i className="bi bi-shield-lock" />}
                  onClick={() => passwordForm.submit()}
                >
                  Parolni yangilash
                </Button>
              </div>
            </Form>
          </div>
        </div>

        <div className="space-y-5">
          <div className={`${card} p-5`}>
            <div className="pb-4 mb-4 border-b border-gray-100 dark:border-slate-700/60">
              <SectionTitle icon="bi-person-badge" title="Avatar" subtitle="Havola kiritilsa shu yerda ko'rinadi" />
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#4EA674]/15 bg-gray-50 dark:bg-slate-900/40">
                <img
                  src={avatar || fallbackAvatar}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallbackAvatar
                  }}
                />
              </div>
              <p className="mt-3 text-base font-semibold text-gray-900 dark:text-white truncate max-w-full">
                {fullName || "Admin"}
              </p>
              <p className="text-xs text-gray-400 dark:text-slate-400 truncate max-w-full">{profile?.email}</p>

              <Button
                size="small"
                shape="round"
                className="mt-4"
                icon={<i className="bi bi-x-lg" />}
                onClick={() => profileForm.setFieldsValue({ avatar: "" })}
              >
                Rasmni olib tashlash
              </Button>
            </div>
          </div>

          <div className={`${card} p-5`}>
            <div className="pb-4 mb-4 border-b border-gray-100 dark:border-slate-700/60">
              <SectionTitle icon="bi-info-circle" title="Hisob ma'lumotlari" />
            </div>
            <InfoRow label="Admin ID" value={profile?.id} mono />
            <InfoRow label="E-mail" value={profile?.email} />
            <InfoRow label="Telefon" value={profile?.phone} mono />
            <InfoRow label="Rol" value={roleLabel(profile?.role)} />
            <InfoRow label="Holati" value={profile?.isActive ? "Faol" : "Nofaol"} />
            <InfoRow label="Ro'yxatdan o'tgan" value={formatDate(profile?.createdAt)} />
            <InfoRow label="Yangilangan" value={formatDate(profile?.updatedAt)} />
          </div>

          <div className={`${card} p-5`}>
            <div className="flex items-center gap-2 mb-3">
              <i className="bi bi-lightbulb text-gray-400 dark:text-slate-400" />
              <h3 className="font-semibold text-sm text-gray-800 dark:text-white">Maslahatlar</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
              {[
                "E-mail va rolni faqat super admin o'zgartira oladi.",
                "Telefon raqamini +998 formatida kiriting.",
                "Avatar uchun to'g'ridan-to'g'ri rasm havolasini bering.",
                "Parolni muntazam yangilab turing.",
              ].map((tip) => (
                <li key={tip} className="flex gap-2">
                  <i className="bi bi-check2 text-[#4EA674] mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
