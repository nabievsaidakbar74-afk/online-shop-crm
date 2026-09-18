import { Button, ConfigProvider, Form, Input, InputNumber, Modal, Switch, theme } from "antd"
import { useSelector } from "react-redux"
import useCreateCategories from "../hooks/useCreateCategories"

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function CategoryModal({ open, setOpen }: Props) {
  const { isPending, mutate } = useCreateCategories()
  const [form] = Form.useForm()
  const isDark = useSelector((state: any) => state.theme.isDark)

  const image = Form.useWatch("image", form)

  const handleClose = () => {
    setOpen(false)
    form.resetFields()
  }

  const handleFinish = (values: any) => {
    mutate(values, {
      onSuccess: () => {
        setOpen(false)
        form.resetFields()
      },
    })
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#4EA674",
          borderRadius: 12,
          colorBgContainer: isDark ? "#1e293b" : "#ffffff",
          colorText: isDark ? "#e5e7eb" : "#111827",
          colorBorder: isDark ? "#475569" : "#e5e7eb",
        },
        components: {
          Modal: {
            contentBg: isDark ? "#1e293b" : "#ffffff",
            headerBg: isDark ? "#1e293b" : "#ffffff",
            titleColor: isDark ? "#f8fafc" : "#111827",
          },
          Input: {
            colorBgContainer: isDark ? "#334155" : "#ffffff",
            colorText: isDark ? "#f8fafc" : "#111827",
            colorTextPlaceholder: isDark ? "#94a3b8" : "#9ca3af",
          },
          InputNumber: {
            colorBgContainer: isDark ? "#334155" : "#ffffff",
            colorText: isDark ? "#f8fafc" : "#111827",
            colorTextPlaceholder: isDark ? "#94a3b8" : "#9ca3af",
          },
          Button: {
            colorPrimary: "#4EA674",
            colorPrimaryHover: "#5bb882",
            colorPrimaryActive: "#3d8b5f",
            primaryColor: "#ffffff",
          },
        },
      }}
    >
      <Modal
        open={open}
        onCancel={handleClose}
        centered
        width={640}
        destroyOnHidden
        styles={{
          container: { borderRadius: 20, padding: 0, overflow: "hidden" },
          header: { margin: 0, padding: "20px 24px" },
          body: { padding: "4px 24px 0" },
          footer: { margin: 0, padding: "16px 24px 20px" },
        }}
        title={
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-[#4EA674]/10 text-[#4EA674] flex items-center justify-center text-lg">
              <i className="bi bi-collection" />
            </span>
            <span>
              <span className={`block text-base font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                Add Category
              </span>
              <span className={`block text-xs font-normal ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                Yangi kategoriya ma'lumotlarini kiriting
              </span>
            </span>
          </div>
        }
        footer={
          <div className="flex items-center justify-end gap-3">
            <Button shape="round" size="large" onClick={handleClose} disabled={isPending}>
              Cancel
            </Button>
            <Button
              type="primary"
              shape="round"
              size="large"
              loading={isPending}
              onClick={() => form.submit()}
            >
              Save Category
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={{ isActive: true, sortOrder: 0 }}
          onFinish={handleFinish}
          disabled={isPending}
          className="py-2"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name kiriting" }]}>
              <Input placeholder="Smartphones" size="large" />
            </Form.Item>
            <Form.Item label="Slug" name="slug" rules={[{ required: true, message: "Slug kiriting" }]}>
              <Input placeholder="smartphones" size="large" />
            </Form.Item>
          </div>

          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} placeholder="Kategoriya haqida qisqa izoh" />
          </Form.Item>

          <Form.Item label="Image URL" name="image">
            <Input placeholder="https://..." size="large" prefix={<i className="bi bi-link-45deg text-gray-400" />} />
          </Form.Item>

          <div
            className={`flex items-center gap-3 rounded-2xl border p-3 mb-5 ${
              isDark ? "border-slate-700 bg-slate-800/60" : "border-gray-200 bg-gray-50"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center shrink-0 ${
                isDark ? "bg-slate-700 text-slate-400" : "bg-white text-gray-400"
              }`}
            >
              {image ? (
                <img src={image} alt="" className="w-full h-full object-cover" />
              ) : (
                <i className="bi bi-image text-xl" />
              )}
            </div>
            <div className="text-xs leading-5">
              <p className={isDark ? "text-slate-200 font-medium" : "text-gray-700 font-medium"}>Preview</p>
              <p className={isDark ? "text-slate-400" : "text-gray-500"}>
                Rasm havolasini kiritsangiz shu yerda ko'rinadi
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 items-start">
            <Form.Item label="Sort Order" name="sortOrder">
              <InputNumber className="w-full" min={0} size="large" />
            </Form.Item>
            <Form.Item label="Status" name="isActive" valuePropName="checked">
              <Switch checkedChildren="Active" unCheckedChildren="Hidden" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </ConfigProvider>
  )
}
