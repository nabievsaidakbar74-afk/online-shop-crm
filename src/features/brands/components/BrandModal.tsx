import { Button, Form, Input, Modal, Switch } from 'antd'
import type { FormInstance } from 'antd'

type BrandModalProps = {
    isModalOpen: boolean
    handleCancel: () => void
    editingBrand: any
    form: FormInstance
    logo?: string
    handleFinish: (values: any) => void
    isPending?: boolean
}

export default function BrandModal({
    isModalOpen,
    handleCancel,
    editingBrand,
    form,
    logo,
    handleFinish,
    isPending = false,
}: BrandModalProps) {
    return (
        <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            centered
            width={560}
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
                        <i className={`bi ${editingBrand ? 'bi-pencil' : 'bi-award'}`} />
                    </span>
                    <span>
                        <span className="block text-base font-semibold text-gray-900 dark:text-white">
                            {editingBrand ? "Brendni tahrirlash" : "Yangi brend qo'shish"}
                        </span>
                        <span className="block text-xs font-normal text-gray-500 dark:text-slate-400">
                            Brend nomi, slug va logosini kiriting
                        </span>
                    </span>
                </div>
            }
            footer={
                <div className="flex items-center justify-end gap-3">
                    <Button shape="round" size="large" onClick={handleCancel} disabled={isPending}>
                        Bekor qilish
                    </Button>
                    <Button
                        type="primary"
                        shape="round"
                        size="large"
                        loading={isPending}
                        onClick={() => form.submit()}
                    >
                        {editingBrand ? "Saqlash" : "Qo'shish"}
                    </Button>
                </div>
            }
        >
            <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                initialValues={{ isActive: true }}
                onFinish={handleFinish}
                disabled={isPending}
                className="py-2"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    <Form.Item
                        name="name"
                        label="Brend nomi"
                        rules={[{ required: true, message: 'Iltimos brend nomini kiriting!' }]}
                    >
                        <Input placeholder="Masalan: Apple" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="slug"
                        label="Slug"
                        rules={[{ required: true, message: 'Iltimos slugni kiriting!' }]}
                    >
                        <Input placeholder="Masalan: apple" size="large" prefix={<span className="text-gray-400">#</span>} />
                    </Form.Item>
                </div>

                <Form.Item name="description" label="Tavsifi">
                    <Input.TextArea rows={3} placeholder="Brend haqida tavsif..." className="resize-none" />
                </Form.Item>

                <Form.Item
                    name="logo"
                    label="Logo URL"
                    rules={[{ required: true, message: 'Iltimos logo havolasini kiriting!' }]}
                >
                    <Input
                        placeholder="https://..."
                        size="large"
                        prefix={<i className="bi bi-link-45deg text-gray-400" />}
                    />
                </Form.Item>

                <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-3 mb-4 dark:border-slate-700 dark:bg-slate-900/40">
                    <div className="w-20 h-14 rounded-xl overflow-hidden bg-white flex items-center justify-center shrink-0 text-gray-400 dark:bg-slate-800 dark:text-slate-500">
                        {logo ? (
                            <img src={logo} alt="" className="w-full h-full object-contain" />
                        ) : (
                            <i className="bi bi-image text-xl" />
                        )}
                    </div>
                    <div className="text-xs leading-5">
                        <p className="font-medium text-gray-700 dark:text-slate-200">Logo preview</p>
                        <p className="text-gray-500 dark:text-slate-400">
                            Havolani kiritsangiz logo shu yerda ko'rinadi
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 mb-5 dark:border-slate-700/60 dark:bg-slate-900/40">
                    <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">Holati</p>
                        <p className="text-xs text-gray-400 dark:text-slate-400">
                            Faol brendlar do'konda ko'rinadi
                        </p>
                    </div>
                    <Form.Item name="isActive" valuePropName="checked" className="mb-0">
                        <Switch checkedChildren="Faol" unCheckedChildren="Nofaol" />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}
