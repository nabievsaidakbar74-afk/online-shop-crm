import {
    Drawer,
    Form,
    Input,
    InputNumber,
    Switch,
    Button,
    Select
} from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import useBrands from '../../brands/hooks/useBrands'
import useCategories from '../../categories/hooks/useCategories'
import useCreateProducts from '../hooks/useCreateProducts'
import useUpdateProducts from '../hooks/useUpdateProducts'

interface OptionType {
    id: string
    name: string
}

interface ProductDrawerProps {
    open: boolean
    setOpen: (open: boolean) => void
    product?: any
    onClose?: () => void
    onSubmit?: (values: any) => void
}

const sectionCard =
    "rounded-2xl border p-4 border-gray-100 bg-gray-50/70 dark:border-slate-700/60 dark:bg-slate-800/60"

function Section({
    icon,
    title,
    subtitle,
    children,
}: {
    icon: string
    title: string
    subtitle: string
    children: React.ReactNode
}) {


    return (
        <div className={sectionCard}>
            <div className="flex items-center gap-3 mb-4">
                <span className="w-9 h-9 shrink-0 rounded-xl bg-[#4EA674]/10 text-[#4EA674] flex items-center justify-center">
                    <i className={`bi ${icon}`} />
                </span>
                <div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white">{title}</h3>
                    <p className="text-xs text-gray-400 dark:text-slate-400">{subtitle}</p>
                </div>
            </div>
            {children}
        </div>
    )
}
function SwitchTile({
    name,
    title,
    subtitle,
}: {
    name: string
    title: string
    subtitle: string
}) {
    return (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white px-3 py-2.5 dark:border-slate-700/60 dark:bg-slate-900/50">
            <div>
                <p className="text-xs font-medium text-gray-800 dark:text-white">{title}</p>
                <p className="text-[11px] text-gray-400 dark:text-slate-400">{subtitle}</p>
            </div>
            <Form.Item name={name} valuePropName="checked" className="mb-0">
                <Switch size="small" />
            </Form.Item>
        </div>
    )
}

export default function ProductDrawer({
    open,
    setOpen,
    product,
    onClose,
    onSubmit,
}: ProductDrawerProps) {

    const isEdit = !!product?.id

    const { isPending: isCreating, mutate: createProduct } = useCreateProducts()
    const { isPending: isUpdating, mutate: updateProduct } = useUpdateProducts()
    const isPending = isCreating || isUpdating


    const [form] = Form.useForm()

    const { data: brandsRes, isLoading: brandsLoading } = useBrands()
    const { data: categoriesRes, isLoading: categoriesLoading } = useCategories()
    const brands: OptionType[] = brandsRes?.data ?? []
    const categories: OptionType[] = categoriesRes?.data ?? []

    const toOptions = (list: OptionType[]) =>
        list.map((item) => ({ value: item.id, label: item.name }))

    useEffect(() => {
        if (!open) return

        if (!isEdit) {
            form.resetFields()
            return
        }

        form.setFieldsValue({
            name: product.name,
            slug: product.slug,
            sku: product.sku,
            barcode: product.barcode,
            shortDescription: product.shortDescription,
            description: product.description,
            brandId: product.brandId,
            categoryId: product.categoryId,
            price: product.price,
            oldPrice: product.oldPrice,
            discountPercent: product.discountPercent,
            stock: product.stock,
            lowStockThreshold: product.lowStockThreshold,
            isActive: product.isActive,
            isFeatured: product.isFeatured,
            isNew: product.isNew,
            isPopular: product.isPopular,
            images: (product.images ?? []).map((img: any, index: number) => ({
                url: img?.url,
                alt: img?.alt ?? '',
                isMain: !!img?.isMain,
                sortOrder: img?.sortOrder ?? index,
            })),
            variants: (product.variants ?? []).map((variant: any) => ({
                sku: variant?.sku,
                price: variant?.price ?? 0,
                stock: variant?.stock ?? 0,
                attributes: {
                    storage: variant?.attributes?.storage,
                    ram: variant?.attributes?.ram,
                },
                isActive: variant?.isActive ?? true,
            })),
        })
    }, [open, isEdit, product, form])

    const handleClose = () => {
        setOpen(false)
        form.resetFields()
        onClose?.()
    }

    const handleFinish = (values: any) => {
        const payload: any = {
            ...values,
            images: (values.images ?? [])
                .filter((img: any) => img?.url)
                .map((img: any, index: number) => ({
                    url: img.url,
                    alt: img.alt ?? '',
                    isMain: !!img.isMain,
                    sortOrder: img.sortOrder ?? index,
                })),
            variants: (values.variants ?? []).map((variant: any) => ({
                sku: variant?.sku,
                price: variant?.price ?? 0,
                stock: variant?.stock ?? 0,
                attributes: variant?.attributes ?? {},
                isActive: variant?.isActive ?? true,
            })),
        }

        onSubmit?.(payload)

        if (isEdit) {
            updateProduct({ values: payload, id: product.id }, { onSuccess: handleClose })
        } else {
            createProduct(payload, { onSuccess: handleClose })
        }
    }


    return (
        <Drawer
            width={720}
            onClose={handleClose}
            open={open}
            styles={{
                header: { padding: "18px 24px" },
                body: { padding: 24, paddingBottom: 32 },
                footer: { padding: "14px 24px" },
            }}
            title={
                <div className="flex items-center gap-3">
                    <span className="w-10 h-10 shrink-0 rounded-2xl bg-[#4EA674]/10 text-[#4EA674] flex items-center justify-center text-lg">
                        <i className={`bi ${isEdit ? 'bi-pencil-square' : 'bi-bag-plus'}`} />
                    </span>
                    <div>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                            {isEdit ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo'shish"}
                        </p>
                        <p className="text-xs font-normal text-gray-400 dark:text-slate-400">
                            {isEdit
                                ? "Ma'lumotlarni o'zgartirib, saqlang"
                                : "Mahsulot ma'lumotlarini to'ldirib, saqlang"}
                        </p>
                    </div>
                </div>
            }
            footer={
                <div className="flex items-center justify-between gap-3">
                    <p className="hidden sm:block text-xs text-gray-400 dark:text-slate-400">
                        <i className="bi bi-asterisk text-[9px] mr-1.5" />
                        Nom, SKU va narx majburiy maydonlar
                    </p>
                    <div className="flex items-center gap-3 ml-auto">
                        <Button shape="round" size="large" onClick={handleClose} disabled={isPending}>
                            Bekor qilish
                        </Button>
                        <Button
                            type="primary"
                            shape="round"
                            size="large"
                            loading={isPending}
                            icon={<i className="bi bi-check2" />}
                            onClick={() => form.submit()}
                        >
                            {isEdit ? "O'zgarishlarni saqlash" : "Saqlash"}
                        </Button>
                    </div>
                </div>
            }
        >
            <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                disabled={isPending}
                onFinish={handleFinish}
                initialValues={{
                    price: 0,
                    oldPrice: 0,
                    discountPercent: 0,
                    stock: 0,
                    lowStockThreshold: 5,
                    isActive: true,
                    isFeatured: true,
                    isNew: true,
                    isPopular: true,
                    images: [{ url: '', alt: '', isMain: true, sortOrder: 0 }],
                    variants: []
                }}
                className="space-y-4"
            >
                <Section
                    icon="bi-box-seam"
                    title="Asosiy ma'lumotlar"
                    subtitle="Mahsulot nomi, kodi va tavsifi"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                        <Form.Item
                            name="name"
                            label="Mahsulot nomi"
                            rules={[{ required: true, message: "Mahsulot nomini kiriting!" }]}
                        >
                            <Input placeholder="iPhone 15 Pro" size="large" />
                        </Form.Item>

                        <Form.Item name="slug" label="Slug">
                            <Input
                                placeholder="iphone-15-pro"
                                size="large"
                                prefix={<span className="text-gray-400">#</span>}
                            />
                        </Form.Item>

                        <Form.Item
                            name="sku"
                            label="SKU"
                            rules={[{ required: true, message: "SKU kodingizni kiriting!" }]}
                        >
                            <Input placeholder="IPH15P-256" size="large" />
                        </Form.Item>

                        <Form.Item name="barcode" label="Shtrix-kod (Barcode)">
                            <Input placeholder="880123456789" size="large" />
                        </Form.Item>
                    </div>

                    <Form.Item name="shortDescription" label="Kalta tavsif">
                        <Input.TextArea rows={2} placeholder="Qisqacha ma'lumot..." className="resize-none" />
                    </Form.Item>

                    <Form.Item name="description" label="To'liq tavsif" className="mb-0">
                        <Input.TextArea rows={4} placeholder="Batafsil tavsif..." className="resize-none" />
                    </Form.Item>
                </Section>

                <Section
                    icon="bi-tags"
                    title="Kategoriya va Brend"
                    subtitle="Mahsulot qaysi guruhga tegishli"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                        <Form.Item name="brandId" label="Brend" className="mb-0">
                            <Select
                                placeholder="Brendni tanlang"
                                size="large"
                                loading={brandsLoading}
                                allowClear
                                showSearch
                                optionFilterProp="label"
                                options={toOptions(brands)}
                                notFoundContent={brandsLoading ? "Yuklanmoqda..." : "Brend topilmadi"}
                            />
                        </Form.Item>

                        <Form.Item name="categoryId" label="Kategoriya" className="mb-0">
                            <Select
                                placeholder="Kategoriyani tanlang"
                                size="large"
                                loading={categoriesLoading}
                                allowClear
                                showSearch
                                optionFilterProp="label"
                                options={toOptions(categories)}
                                notFoundContent={categoriesLoading ? "Yuklanmoqda..." : "Kategoriya topilmadi"}
                            />
                        </Form.Item>
                    </div>
                </Section>

                <Section icon="bi-cash-coin" title="Narx va Ombor" subtitle="Narxlar, chegirma va qoldiq">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
                        <Form.Item name="price" label="Narxi (UZS)" rules={[{ required: true }]}>
                            <InputNumber
                                className="w-full"
                                size="large"
                                min={0}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                            />
                        </Form.Item>

                        <Form.Item name="oldPrice" label="Eski narxi">
                            <InputNumber className="w-full" size="large" min={0} />
                        </Form.Item>

                        <Form.Item name="discountPercent" label="Chegirma (%)">
                            <InputNumber className="w-full" size="large" min={0} max={100} suffix="%" />
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                        <Form.Item name="stock" label="Ombordagi soni" className="mb-0">
                            <InputNumber className="w-full" size="large" min={0} />
                        </Form.Item>

                        <Form.Item name="lowStockThreshold" label="Oz qolganlik chegarasi" className="mb-0">
                            <InputNumber className="w-full" size="large" min={0} />
                        </Form.Item>
                    </div>
                </Section>

                <Section icon="bi-toggles" title="Status va Teglar" subtitle="Mahsulot ko'rinishi va belgilari">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <SwitchTile name="isActive" title="Aktiv" subtitle="Do'konda ko'rinadi" />
                        <SwitchTile name="isFeatured" title="Tanlangan" subtitle="Featured bo'limida" />
                        <SwitchTile name="isNew" title="Yangi" subtitle="New belgisi bilan" />
                        <SwitchTile name="isPopular" title="Ommabop" subtitle="Popular belgisi bilan" />
                    </div>
                </Section>

                <Section icon="bi-images" title="Rasmlar" subtitle="Mahsulot rasmlari havolalari">
                    <Form.List name="images">
                        {(fields, { add, remove }) => (
                            <div className="flex flex-col gap-3">
                                {fields.map(({ key, name, ...restField }, index) => (
                                    <div
                                        key={key}
                                        className="rounded-xl border border-dashed border-gray-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900/50"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-slate-400">
                                                Rasm #{index + 1}
                                            </span>
                                            <Button
                                                type="text"
                                                size="small"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => remove(name)}
                                            />
                                        </div>

                                        <div className="grid grid-cols-12 gap-3 items-end">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'url']}
                                                label="Rasm URL"
                                                className="col-span-12 sm:col-span-6 mb-0"
                                            >
                                                <Input placeholder="https://..." />
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'alt']}
                                                label="Alt matn"
                                                className="col-span-8 sm:col-span-4 mb-0"
                                            >
                                                <Input placeholder="Rasm nomi" />
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'isMain']}
                                                valuePropName="checked"
                                                label="Asosiy"
                                                className="col-span-4 sm:col-span-2 mb-0"
                                            >
                                                <Switch size="small" />
                                            </Form.Item>
                                        </div>
                                    </div>
                                ))}
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Rasm qo'shish
                                </Button>
                            </div>
                        )}
                    </Form.List>
                </Section>

                <Section icon="bi-layers" title="Variantlar" subtitle="Xotira, RAM va boshqa kombinatsiyalar">
                    <Form.List name="variants">
                        {(fields, { add, remove }) => (
                            <div className="flex flex-col gap-3">
                                {fields.map(({ key, name, ...restField }, index) => (
                                    <div
                                        key={key}
                                        className="rounded-xl border border-gray-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900/50"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4EA674]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#4EA674]">
                                                <i className="bi bi-layers" />
                                                Variant #{index + 1}
                                            </span>
                                            <Button
                                                type="text"
                                                size="small"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => remove(name)}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-3">
                                            <Form.Item {...restField} name={[name, 'sku']} label="SKU">
                                                <Input placeholder="Variant SKU" />
                                            </Form.Item>

                                            <Form.Item {...restField} name={[name, 'price']} label="Narxi">
                                                <InputNumber className="w-full" min={0} />
                                            </Form.Item>

                                            <Form.Item {...restField} name={[name, 'stock']} label="Soni">
                                                <InputNumber className="w-full" min={0} />
                                            </Form.Item>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'attributes', 'storage']}
                                                label="Xotira (Storage)"
                                            >
                                                <Input placeholder="256GB" />
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'attributes', 'ram']}
                                                label="Operativ xotira (RAM)"
                                            >
                                                <Input placeholder="8GB" />
                                            </Form.Item>
                                        </div>

                                        <Form.Item
                                            {...restField}
                                            name={[name, 'isActive']}
                                            valuePropName="checked"
                                            label="Aktiv variant"
                                            className="mb-0"
                                        >
                                            <Switch size="small" />
                                        </Form.Item>
                                    </div>
                                ))}
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Variant qo'shish
                                </Button>
                            </div>
                        )}
                    </Form.List>
                </Section>
            </Form>
        </Drawer>
    )
}
