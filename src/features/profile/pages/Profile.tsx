import { Avatar, Button, Card, ConfigProvider, Form, Input, Typography, theme } from "antd"
import { useSelector } from "react-redux"
import { useUser } from "../../auth/contexts/UserContext"
import useMe from "../hooks/usMe"

const fallbackAvatar =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80"

export default function Profile() {
  const isDark = useSelector((state) => state.theme.isDark)
  const { user } = useUser()
  const [passwordForm] = Form.useForm()
  const [profileForm] = Form.useForm()

  const avatar = user?.avatar || fallbackAvatar
  const fullName = user ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() : "Wade Warren"
  const email = user?.email || "wade.warren@example.com"

  const { data, isLoading } = useMe()
  console.log(data)
console.log("user" + user)

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#4EA674",
          borderRadius: 20,
          colorBgContainer: isDark ? "#1e293b" : "#ffffff",
          colorText: isDark ? "#e5e7eb" : "#111827",
          colorBorder: isDark ? "#475569" : "#e5e7eb",
        },
        components: {
          Input: {
            colorBgContainer: isDark ? "#334155" : "#ffffff",
            colorText: isDark ? "#f8fafc" : "#111827",
            colorTextPlaceholder: isDark ? "#94a3b8" : "#9ca3af",
          },
          Card: {
            colorBgContainer: isDark ? "#1e293b" : "#ffffff",
          },
          Button: {
            colorPrimary: "#4EA674",
            colorPrimaryHover: "#5bb882",
            colorPrimaryActive: "#3d8b5f",
            primaryColor: "#ffffff",
            colorTextLightSolid: "#ffffff",
          },
        },
      }}
    >
      <div className={`p-5 space-y-4 overflow-y-auto h-[calc(100vh-6rem)] ${isDark ? "bg-slate-900" : "bg-[#F3F4F6]"}`}>
        <Typography.Title level={4} style={{ margin: 0, color: isDark ? "#f8fafc" : "#111827" }}>
          About section
        </Typography.Title>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="space-y-4">
            <Card>
              <div className="flex justify-between items-start mb-2">
                <Typography.Text strong>Profile</Typography.Text>
                <Button type="text" icon={<i className="bi bi-share" />} />
              </div>
              <div className="flex flex-col items-center text-center">
                <Avatar src={avatar} size={80} className="mb-3" />
                <Typography.Title level={5} style={{ margin: 0 }}>
                  {fullName || "Wade Warren"}
                </Typography.Title>
                <Typography.Text type="secondary">{email}</Typography.Text>
                <Typography.Text type="secondary" className="mt-3 text-xs">
                  Linked with Social media
                </Typography.Text>
                <div className="flex items-center gap-3 mt-2 text-gray-400">
                  <i className="bi bi-google"></i>
                  <i className="bi bi-facebook"></i>
                  <i className="bi bi-twitter-x"></i>
                  <i className="bi bi-linkedin"></i>
                </div>
                <Button className="mt-4" shape="round">
                  Social media
                </Button>
              </div>
            </Card>

            <Card>
              <div className="flex justify-between items-center mb-4">
                <Typography.Text strong>Change Password</Typography.Text>
                <Button type="link" size="small" style={{ color: "#4EA674" }}>
                  Need help?
                </Button>
              </div>
              <Form form={passwordForm} layout="vertical" requiredMark={false}>
                <Form.Item label="Current Password" name="currentPassword">
                  <Input.Password placeholder="Enter password" size="large" />
                </Form.Item>
                <Button type="link" size="small" style={{ color: "#4EA674", padding: 0, marginBottom: 12 }}>
                  Forgot Current Password? Click here
                </Button>
                <Form.Item label="New Password" name="newPassword">
                  <Input.Password placeholder="Enter password" size="large" />
                </Form.Item>
                <Form.Item label="Re-enter Password" name="confirmPassword">
                  <Input.Password placeholder="Enter password" size="large" />
                </Form.Item>
                <Button type="primary" htmlType="submit" size="large" block shape="round">
                  Save Change
                </Button>
              </Form>
            </Card>
          </div>

          <div className="xl:col-span-2">
            <Card styles={{ body: { border: `2px solid ${isDark ? "#60a5fa" : "#3B82F6"}`, borderRadius: 16 } }}>
              <div className="flex justify-between items-center mb-5">
                <Typography.Text strong>Profile Update</Typography.Text>
                <Button type="text" icon={<i className="bi bi-pencil" />}>
                  Edit
                </Button>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Avatar src={avatar} size={48} />
                <Button type="primary" shape="round">
                  Upload New
                </Button>
                <Button shape="round">Delete</Button>
              </div>

              <Form
                form={profileForm}
                layout="vertical"
                requiredMark={false}
                initialValues={{
                  firstName: user?.firstName || "Wade",
                  lastName: user?.lastName || "Warren",
                  password: "password",
                  phone: user?.phone || "(406) 555-0120",
                  email,
                  dob: "12 January 1999",
                  location: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
                  card: "8434 354 444",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                  <Form.Item label="First Name" name="firstName">
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item label="Last Name" name="lastName">
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item label="Password" name="password">
                    <Input.Password size="large" />
                  </Form.Item>
                  <Form.Item label="Phone Number" name="phone">
                    <Input size="large" suffix="🇺🇸" />
                  </Form.Item>
                  <Form.Item label="E-mail" name="email">
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item label="Date of birth" name="dob">
                    <Input size="large" suffix={<i className="bi bi-calendar3 text-gray-400" />} />
                  </Form.Item>
                </div>
                <Form.Item label="Location" name="location">
                  <Input size="large" />
                </Form.Item>
                <Form.Item label="Credit Card" name="card">
                  <Input size="large" prefix={<span className="inline-flex"><span className="w-4 h-4 rounded-full bg-red-500" /><span className="w-4 h-4 rounded-full bg-amber-400 -ml-2 opacity-90" /></span>} />
                </Form.Item>
                <Form.Item label="Biography" name="bio">
                  <Input.TextArea rows={4} placeholder="Enter a biography about you" />
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}
