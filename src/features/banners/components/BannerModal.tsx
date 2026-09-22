import { Button, DatePicker, Form, Input, InputNumber, Modal, Switch } from "antd"
import type { FormInstance } from "antd"

type BannerModalProps = {
    isModalOpen: boolean
    handleCancel: () => void
    editingBanner: any
    form: FormInstance
    image?: string
    mobileImage?: string
    handleFinish: (values: any) => void
    isPending?: boolean
}

export default function BannerModal({
    isModalOpen,
    handleCancel,
    editingBanner,
    form,
    image,
    mobileImage,
    handleFinish,
    isPending = false,
}: BannerModalProps) 
{
    return (
        <Modal
            open={isModalOpen}
            
            onCancel={handleCancel}
            centered
            width={680}
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
                        <i className={`bi ${editingBanner ? "bi-pencil" : "bi-image"}`} />
                    </span>
                    <span>
                        <span className="block text-base font-semibold text-gray-900 dark:text-white">
                            {editingBanner ? "Bannerni tahrirlash" : "Yangi banner qo'shish"}
                        </span>
                        <span className="block text-xs font-normal text-gray-500 dark:text-slate-400">
                            Sarlavha, rasmlar, tugma va muddatni kiriting
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
                        {editingBanner ? "Saqlash" : "Qo'shish"}
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
                    <Form.Item
                        name="title"
                        label="Sarlavha"
                        rules={[{ required: true, message: "Sarlavhani kiriting" }]}
                    >
                        <Input placeholder="Summer Sale" size="large" />
                    </Form.Item>
                    <Form.Item name="subtitle" label="Quyi sarlavha">
                        <Input placeholder="Up to 50% discounts" size="large" />
                    </Form.Item>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    <Form.Item
                        name="buttonText"
                        label="Tugma matni"
                        rules={[{ required: true, message: "Tugma matnini kiriting" }]}
                    >
                        <Input placeholder="Shop Now" size="large" />
                    </Form.Item>
                    <Form.Item
                        name="link"
                        label="Havola"
                        rules={[{ required: true, message: "Havolani kiriting" }]}
                    >
                        <Input
                            placeholder="/products"
                            size="large"
                            prefix={<i className="bi bi-link-45deg text-gray-400" />}
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    name="image"
                    label="Desktop rasm"
                    rules={[{ required: true, message: "Desktop rasm havolasini kiriting" }]}
                >
                    <Input
                        placeholder="https://..."
                        size="large"
                        prefix={<i className="bi bi-display text-gray-400" />}
                    />
                </Form.Item>

                <Form.Item
                    name="mobileImage"
                    label="Mobil rasm"
                    rules={[{ required: true, message: "Mobil rasm havolasini kiriting" }]}
                >
                    <Input
                        placeholder="https://..."
                        size="large"
                        prefix={<i className="bi bi-phone text-gray-400" />}
                    />
                </Form.Item>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3 dark:border-slate-700 dark:bg-slate-900/40">
                        <p className="text-[11px] text-gray-400 mb-2">Desktop preview</p>
                        <div className="h-24 rounded-xl overflow-hidden bg-white flex items-center justify-center text-gray-400 dark:bg-slate-800">
                            {image ? (
                                <img src={image} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <i className="bi bi-image text-xl" />
                            )}
                        </div>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3 dark:border-slate-700 dark:bg-slate-900/40">
                        <p className="text-[11px] text-gray-400 mb-2">Mobile preview</p>
                        <div className="h-24 rounded-xl overflow-hidden bg-white flex items-center justify-center text-gray-400 dark:bg-slate-800">
                            {mobileImage ? (
                                <img src={mobileImage} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <i className="bi bi-phone text-xl" />
                            )}
                        </div>
                    </div>
                </div>

                <Form.Item name="sortOrder" label="Tartib">
                    <InputNumber min={0} className="w-full!" size="large" />
                </Form.Item>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    <Form.Item
                        name="startDate"
                        label="Boshlanish"
                        rules={[{ required: true, message: "Boshlanish sanasini tanlang" }]}
                    >
                        <DatePicker
                            showTime
                            size="large"
                            className="w-full!"
                            placeholder="Sanani tanlang"
                            format="DD.MM.YYYY HH:mm"
                        />
                    </Form.Item>
                    <Form.Item
                        name="endDate"
                        label="Tugash"
                        rules={[{ required: true, message: "Tugash sanasini tanlang" }]}
                    >
                        <DatePicker
                            showTime
                            size="large"
                            className="w-full!"
                            placeholder="Sanani tanlang"
                            format="DD.MM.YYYY HH:mm"
                        />
                    </Form.Item>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 mb-5 dark:border-slate-700/60 dark:bg-slate-900/40">
                    <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">Holati</p>
                        <p className="text-xs text-gray-400 dark:text-slate-400">
                            Faol bannerlar do'konda ko'rinadi
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
