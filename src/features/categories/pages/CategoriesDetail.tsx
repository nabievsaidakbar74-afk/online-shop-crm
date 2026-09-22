import { useEffect } from "react"
import { Button, Form, Input, InputNumber, Switch } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import useCategoriesDetails from "../hooks/useCategoriesDetails"
import useUpdateCategories from "../hooks/useUpdateCategories"

const pageWrap =
    "p-5 space-y-5 overflow-y-auto h-[calc(100vh-6rem)] bg-[#F3F4F6] dark:bg-slate-900"
const card =
    "rounded-2xl border bg-white border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:bg-slate-800 dark:border-slate-700/60 dark:shadow-none"
function SectionTitle({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
    return (
        <div className="flex items-center gap-3">
            <span className="w-9 h-9 shrink-0 rounded-xl bg-[#4EA674]/10 text-[#4EA674] flex items-center justify-center">
                <i className={`bi ${icon}`} />
            </span>
            <div>
                <h3 className="font-semibold text-sm text-gray-800 dark:text-white">{title}</h3>
                <p className="text-xs text-gray-400 dark:text-slate-400">{subtitle}</p>
            </div>
        </div>
    )
}
function Stat({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="rounded-xl bg-white/15 px-4 py-2.5 backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-wide text-white/70">{label}</p>
            <p className="text-base font-semibold text-white">{value}</p>
        </div>
    )
}
export default function CategoriesDetail() {

    const { isPending, mutate: updateCategory } = useUpdateCategories()

    const { id } = useParams()
    const navigate = useNavigate()
    const { data, isLoading } = useCategoriesDetails(id ?? null)
    const [form] = Form.useForm()

    const category = data?.data ?? data

    const name = Form.useWatch("name", form)
    const slug = Form.useWatch("slug", form)
    const description = Form.useWatch("description", form)
    const image = Form.useWatch("image", form)
    const isActive = Form.useWatch("isActive", form)

    useEffect(() => {
        if (category) {
            form.setFieldsValue({
                name: category?.name,
                slug: category?.slug,
                description: category?.description,
                image: category?.image,
                sortOrder: category?.sortOrder ?? 0,
                isActive: category?.isActive ?? false,
            })
        }
    }, [category, form])

    const handleClose = () => {
        form.resetFields()
        navigate("/categori")
    }


    const handleFinish = (values: any) => {
        if (!id) return
        updateCategory({ values, id })
    }

    const formatDate = (value?: string) =>
        value ? new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"

    if (isLoading) {
        return (
            <div className={pageWrap}>
                <div className="h-36 rounded-3xl bg-gray-200/70 dark:bg-slate-800 animate-pulse" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <div className="lg:col-span-2 h-105 rounded-2xl bg-gray-200/70 dark:bg-slate-800 animate-pulse" />
                    <div className="space-y-5">
                        <div className="h-56 rounded-2xl bg-gray-200/70 dark:bg-slate-800 animate-pulse" />
                        <div className="h-40 rounded-2xl bg-gray-200/70 dark:bg-slate-800 animate-pulse" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={pageWrap}>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleClose}
                        className="w-10 h-10 rounded-xl border border-gray-200 bg-white text-gray-600 hover:text-[#4EA674] hover:border-[#4EA674]/40 transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:text-[#4EA674]"
                    >
                        <i className="bi bi-arrow-left text-lg" />
                    </button>
                    <div className="text-sm">
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-[#4EA674] transition-colors dark:text-slate-400"
                        >
                            Categories
                        </button>
                        <span className="text-gray-300 dark:text-slate-600 mx-2">/</span>
                        <span className="font-medium text-gray-800 dark:text-white">{category?.name ?? "Detail"}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-mono text-gray-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
                    <i className="bi bi-hash" />
                    <span className="truncate max-w-45">{id}</span>
                </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to- from-[#4EA674] to-[#2f7f56] p-6">
                {image && (
                    <img
                        src={image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-25 blur-[2px]"
                    />
                )}
                <div className="relative flex flex-wrap items-center justify-between gap-5">
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/20 backdrop-blur-sm flex items-center justify-center text-white/80 shrink-0">
                            {image ? (
                                <img src={image} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <i className="bi bi-collection text-2xl" />
                            )}
                        </div>
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <h1 className="text-2xl font-bold text-white truncate">{name || "Category"}</h1>
                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${isActive ? "bg-white text-[#2f7f56]" : "bg-white/20 text-white"
                                        }`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#4EA674]" : "bg-white/70"}`} />
                                    {isActive ? "Active" : "Inactive"}
                                </span>
                            </div>
                            <p className="mt-1 text-sm font-mono text-white/80 truncate">/{slug || "category-slug"}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Stat label="Products" value={category?._count?.products ?? category?.products?.length ?? 0} />
                        <Stat label="Sub categories" value={category?._count?.children ?? category?.children?.length ?? 0} />
                        <Stat label="Order" value={category?.sortOrder ?? 0} />
                    </div>
                </div>
            </div>

            <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={handleFinish}
                initialValues={{ sortOrder: 0, isActive: false }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
                    <div className="lg:col-span-2 space-y-5">
                        <div className={`${card} p-6`}>
                            <div className="pb-4 mb-5 border-b border-gray-100 dark:border-slate-700/60">
                                <SectionTitle
                                    icon="bi-tag"
                                    title="Category Information"
                                    subtitle="Basic information about this category"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                                <Form.Item
                                    label="Category Name"
                                    name="name"
                                    rules={[{ required: true, message: "Category Name kiriting" }]}
                                >
                                    <Input placeholder="e.g. Smartphones" size="large" prefix={<i className="bi bi-tag text-gray-400" />} />
                                </Form.Item>

                                <Form.Item label="Slug" name="slug" rules={[{ required: true, message: "Slug kiriting" }]}>
                                    <Input placeholder="e.g. smartphones" size="large" prefix={<span className="text-gray-400">#</span>} />
                                </Form.Item>
                            </div>

                            <Form.Item label="Description" name="description">
                                <Input.TextArea rows={4} placeholder="Enter category description..." className="resize-none" />
                            </Form.Item>

                            <Form.Item
                                label={
                                    <span className="flex items-center gap-2">
                                        Image URL
                                        <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[11px] font-normal text-gray-400 dark:bg-slate-700 dark:text-slate-300">
                                            optional
                                        </span>
                                    </span>
                                }
                                name="image"
                                className="mb-0"
                            >
                                <Input
                                    placeholder="https://example.com/image.png"
                                    size="large"
                                    prefix={<i className="bi bi-image text-gray-400" />}
                                />
                            </Form.Item>
                        </div>

                        <div className={`${card} p-6`}>
                            <div className="pb-4 mb-5 border-b border-gray-100 dark:border-slate-700/60">
                                <SectionTitle icon="bi-sliders" title="Category Settings" subtitle="Configure category behavior" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                                <Form.Item label="Sort Order" name="sortOrder" className="mb-0">
                                    <InputNumber className="w-full" size="large" min={0} />
                                </Form.Item>

                                <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 dark:border-slate-700/60 dark:bg-slate-900/40">
                                    <div>
                                        <p className="text-sm font-medium text-gray-800 dark:text-white">Status</p>
                                        <p className="text-xs text-gray-400 dark:text-slate-400">
                                            {isActive ? "Show this category in shop" : "Hide this category from shop"}
                                        </p>
                                    </div>
                                    <Form.Item name="isActive" valuePropName="checked" className="mb-0">
                                        <Switch />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 flex items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white/85 px-4 py-3 backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-800/85">
                            <p className="hidden sm:block text-xs text-gray-400 dark:text-slate-400">
                                Last updated {formatDate(category?.updatedAt)}
                            </p>
                            <div className="flex items-center gap-3 ml-auto">
                                <Button size="large" shape="round" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button
                                    disabled={isPending}
                                    type="primary"
                                    size="large"
                                    shape="round"
                                    loading={isPending}
                                    icon={<i className="bi bi-check2" />}
                                    onClick={() => form.submit()}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className={`${card} p-5`}>
                            <div className="flex items-center gap-2 mb-4">
                                <i className="bi bi-eye text-gray-400 dark:text-slate-400" />
                                <h3 className="font-semibold text-sm text-gray-800 dark:text-white">Category Preview</h3>
                            </div>

                            <div className="w-full h-44 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-100 bg-gray-50 mb-4 dark:border-slate-700 dark:bg-slate-900/40">
                                {image ? (
                                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center text-gray-400 dark:text-slate-500">
                                        <i className="bi bi-image text-3xl mb-1 block opacity-50" />
                                        <span className="text-xs">No image available</span>
                                    </div>
                                )}
                            </div>

                            <h4 className="font-bold text-base text-gray-900 dark:text-white mb-1 truncate">
                                {name || "Category Name"}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2 mb-4">
                                {description || "Category description will appear here."}
                            </p>

                            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-700/60">
                                <span className="text-xs font-mono text-gray-400 dark:text-slate-400 truncate">
                                    /{slug || "category-slug"}
                                </span>
                                <span
                                    className={`text-xs font-medium ${isActive ? "text-[#4EA674]" : "text-rose-400"
                                        }`}
                                >
                                    {isActive ? "Active" : "Inactive"}
                                </span>
                            </div>
                        </div>

                        <div className={`${card} p-5`}>
                            <div className="flex items-center gap-2 mb-4">
                                <i className="bi bi-info-circle text-gray-400 dark:text-slate-400" />
                                <h3 className="font-semibold text-sm text-gray-800 dark:text-white">Meta</h3>
                            </div>
                            <dl className="space-y-3 text-xs">
                                {[
                                    { label: "Created", value: formatDate(category?.createdAt) },
                                    { label: "Updated", value: formatDate(category?.updatedAt) },
                                    { label: "Parent", value: category?.parent?.name ?? "—" },
                                    { label: "Products", value: category?._count?.products ?? 0 },
                                ].map((row) => (
                                    <div key={row.label} className="flex items-center justify-between gap-3">
                                        <dt className="text-gray-400 dark:text-slate-400">{row.label}</dt>
                                        <dd className="font-medium text-gray-700 dark:text-slate-200 truncate">{row.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        <div className={`${card} p-5`}>
                            <div className="flex items-center gap-2 mb-3">
                                <i className="bi bi-lightbulb text-gray-400 dark:text-slate-400" />
                                <h3 className="font-semibold text-sm text-gray-800 dark:text-white">Category tips</h3>
                            </div>
                            <ul className="space-y-2.5 text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                                {[
                                    "Use a short and descriptive category name.",
                                    "Keep the slug lowercase and URL-friendly.",
                                    "Use a high-quality category image.",
                                    "Sort order determines the display position.",
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
            </Form>
        </div>
    )
}