import { useState } from "react"
import { Button, Drawer, Form, Image, message, Popconfirm, Spin, Tag, Tooltip } from "antd"
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
import BannerModal from "./BannerModal"
import useBanners from "../hooks/useBanners"
import useCreateBanners from "../hooks/useCreateBanners"
import useUpdateBanners from "../hooks/useUpdateBanners"
import useDeleteBanners from "../hooks/useDeleteBanners"



function formatDate(value?: string | null) {
    if (!value) return "—"
    return new Date(value).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

function scheduleLabel(startDate?: string, endDate?: string) {
    const now = Date.now()
    const start = startDate ? new Date(startDate).getTime() : NaN
    const end = endDate ? new Date(endDate).getTime() : NaN
    if (Number.isFinite(start) && now < start) return { text: "Scheduled", color: "gold" }
    if (Number.isFinite(end) && now > end) return { text: "Expired", color: "default" }
    return { text: "Live", color: "success" }
}

function InfoRow({ label, value, mono }: { label: string; value?: string | number | null; mono?: boolean }) {
    return (
        <div className="flex items-center justify-between gap-3 py-2.5 border-b border-gray-50 last:border-0 dark:border-slate-700/40">
            <span className="text-xs text-gray-400 dark:text-slate-400">{label}</span>
            <span className={`text-xs font-medium text-gray-700 dark:text-slate-200 truncate max-w-60 text-right ${mono ? "font-mono" : ""}`}>
                {value === null || value === undefined || value === "" ? "—" : value}
            </span>
        </div>
    )
}

export default function Banners() {

    const { data, isLoading } = useBanners()
    const banners = Array.isArray(data?.data) ? data.data : []

    const { isPending, mutate } = useCreateBanners()
    const { isPending: isUpdating, mutate: updateBanner } = useUpdateBanners()
    const { mutate: deleteBanners, isPending: deletePending, variables } = useDeleteBanners()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingBanner, setEditingBanner] = useState<any>(null)
    const [detailBanner, setDetailBanner] = useState<any>(null)
    const [form] = Form.useForm()

    const image = Form.useWatch("image", form)
    const mobileImage = Form.useWatch("mobileImage", form)

    const showModal = (banner: any = null) => {
        setEditingBanner(banner)
        if (banner) {
            form.setFieldsValue({
                title: banner.title,
                subtitle: banner.subtitle,
                image: banner.image,
                mobileImage: banner.mobileImage,
                buttonText: banner.buttonText,
                link: banner.link,
                sortOrder: banner.sortOrder ?? 0,
                isActive: banner.isActive ?? true,
                startDate: banner.startDate ? dayjs(banner.startDate) : undefined,
                endDate: banner.endDate ? dayjs(banner.endDate) : undefined,
            })
        } else {
            form.resetFields()
        }
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        setEditingBanner(null)
        form.resetFields()
    }

    const handleFinish = (values: any) => {
        const toIso = (value: any) => {
            if (!value) return undefined
            if (typeof value?.toISOString === "function") {
                const iso = value.toISOString()
                if (typeof iso === "string") return iso
            }
            const date = new Date(value)
            return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
        }

        const startDate = toIso(values.startDate)
        const endDate = toIso(values.endDate)

        if (!startDate || !endDate) {
            message.error("Boshlanish va tugash sanalarini tanlang")
            return
        }

        const payload = {
            title: values.title,
            subtitle: values.subtitle ?? "",
            image: values.image,
            mobileImage: values.mobileImage,
            buttonText: values.buttonText,
            link: values.link,
            sortOrder: values.sortOrder ?? 0,
            isActive: values.isActive ?? true,
            startDate,
            endDate,
        }

        const onSuccess = () => {
            const editedId = editingBanner?.id
            setIsModalOpen(false)
            setEditingBanner(null)
            form.resetFields()
            if (editedId) {
                setDetailBanner((prev: any) =>
                    prev?.id === editedId ? { ...prev, ...payload } : prev
                )
            }
        }

        if (editingBanner) {
            updateBanner({ id: editingBanner.id, values: payload }, { onSuccess })
            return
        }

        mutate(payload, { onSuccess })
    }

    const handleDelete = (id: string) => {
        deleteBanners(id)
    }

    return (
        <>
            {
                isLoading
                    ? <div className="w-full h-screen flex items-center justify-center"><Spin size="large"></Spin></div>
                    : <div className="p-5 space-y-5 overflow-y-auto h-[calc(100vh-6rem)] bg-[#F3F4F6] dark:bg-slate-900">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <span className="w-11 h-11 shrink-0 rounded-2xl bg-[#4EA674]/10 text-[#4EA674] flex items-center justify-center text-lg">
                                    <i className="bi bi-card-image" />
                                </span>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Banners List</h2>
                                    <p className="text-xs text-gray-400 dark:text-slate-400">
                                        Do'kondagi barcha bannerlarni boshqaring
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => showModal()}
                                className="inline-flex items-center gap-2 rounded-full bg-[#4EA674] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#3d8b5f]"
                            >
                                <i className="bi bi-plus-lg" /> Add Banner
                            </button>
                        </div>

                        {banners.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-800">
                                <i className="bi bi-card-image text-3xl text-gray-300" />
                                <p className="mt-2 text-sm font-medium text-gray-500 dark:text-slate-400">Bannerlar yo'q</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                {banners.map((banner) => {
                                    const schedule = scheduleLabel(banner.startDate, banner.endDate)
                                    return (
                                        <article
                                            key={banner.id}
                                            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-slate-700/60 dark:bg-slate-800 dark:shadow-none"
                                        >
                                            <div className="relative h-44 bg-gray-100 dark:bg-slate-900 overflow-hidden">
                                                <img
                                                    src={banner.image}
                                                    alt={banner.title}
                                                    className="h-full w-full object-cover"
                                                />
                                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/55 to-transparent" />
                                                <div className="absolute top-3 left-3 flex items-center gap-2">
                                                    <Tag color={banner.isActive ? "success" : "error"} className="rounded-full border-none m-0">
                                                        {banner.isActive ? "Faol" : "Nofaol"}
                                                    </Tag>
                                                    <Tag color={schedule.color} className="rounded-full border-none m-0">
                                                        {schedule.text}
                                                    </Tag>
                                                </div>
                                                <span className="absolute top-3 right-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] text-white">
                                                    #{banner.sortOrder}
                                                </span>
                                            </div>

                                            <div className="p-4 space-y-3">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                                                            {banner.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 dark:text-slate-400 line-clamp-1">
                                                            {banner.subtitle}
                                                        </p>
                                                    </div>
                                                    <span className="shrink-0 rounded-full bg-[#4EA674]/10 px-3 py-1 text-xs font-medium text-[#4EA674]">
                                                        {banner.buttonText}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                                    <i className="bi bi-link-45deg" />
                                                    <span className="truncate font-mono">{banner.link}</span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-2 text-xs">
                                                    <div className="rounded-xl bg-gray-50 px-3 py-2 dark:bg-slate-900/50">
                                                        <p className="text-gray-400">Boshlanish</p>
                                                        <p className="mt-0.5 font-medium text-gray-700 dark:text-slate-200">{formatDate(banner.startDate)}</p>
                                                    </div>
                                                    <div className="rounded-xl bg-gray-50 px-3 py-2 dark:bg-slate-900/50">
                                                        <p className="text-gray-400">Tugash</p>
                                                        <p className="mt-0.5 font-medium text-gray-700 dark:text-slate-200">{formatDate(banner.endDate)}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-1">
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={banner.mobileImage}
                                                            alt=""
                                                            className="h-10 w-8 rounded-md object-cover border border-gray-100 dark:border-slate-700"
                                                        />
                                                        <span className="text-[11px] text-gray-400">Mobile version</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Tooltip title="Batafsil">
                                                            <Button
                                                                type="text"
                                                                shape="circle"
                                                                icon={<EyeOutlined />}
                                                                onClick={() => setDetailBanner(banner)}
                                                                className="text-gray-500! hover:text-[#4EA674]! dark:text-slate-300!"
                                                            />
                                                        </Tooltip>
                                                        <Tooltip title="Tahrirlash">
                                                            <Button
                                                                type="text"
                                                                shape="circle"
                                                                icon={<EditOutlined />}
                                                                onClick={() => showModal(banner)}
                                                                className="text-gray-500! hover:text-[#4EA674]! dark:text-slate-300!"
                                                            />
                                                        </Tooltip>
                                                        <Popconfirm
                                                            title="Bannerni o'chirish"
                                                            description="Rostdan ham ushbu bannerni o'chirmoqchimisiz?"
                                                            onConfirm={() => handleDelete(banner.id)}
                                                            okText="Ha"
                                                            cancelText="Yo'q"
                                                            okButtonProps={{ danger: true }}
                                                        >
                                                            <Tooltip title="O'chirish">
                                                                <Button type="text" shape="circle" danger icon={<DeleteOutlined />} />
                                                            </Tooltip>
                                                        </Popconfirm>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    )
                                })}
                            </div>
                        )}
                    </div>
            }

            <BannerModal
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                editingBanner={editingBanner}
                form={form}
                image={image}
                mobileImage={mobileImage}
                handleFinish={handleFinish}
                isPending={isPending || isUpdating}
            />

            <Drawer
                open={!!detailBanner}
                onClose={() => setDetailBanner(null)}
                width={560}
                title={
                    <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-[#4EA674]/10 text-[#4EA674] flex items-center justify-center">
                            <i className="bi bi-card-image" />
                        </span>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{detailBanner?.title}</p>
                            <p className="text-xs text-gray-400">{detailBanner?.subtitle}</p>
                        </div>
                    </div>
                }
                extra={
                    <div className="flex items-center gap-2">
                        <Button shape="round" icon={<EditOutlined />} onClick={() => {
                            showModal(detailBanner)
                            setDetailBanner(null)
                        }}>
                            Tahrirlash
                        </Button>
                        <Popconfirm
                            title="Bannerni o'chirish"
                            description="Rostdan ham ushbu bannerni o'chirmoqchimisiz?"
                            onConfirm={() => handleDelete(detailBanner?.id)}
                            okText="Ha"
                            cancelText="Yo'q"
                            okButtonProps={{ danger: true }}
                        >
                            <Button shape="round" danger icon={<DeleteOutlined />}>
                                O'chirish
                            </Button>
                        </Popconfirm>
                    </div>
                }
            >
                {detailBanner && (
                    <div className="space-y-5">
                        <div>
                            <p className="text-xs text-gray-400 mb-2">Desktop</p>
                            <Image
                                src={detailBanner.image}
                                alt={detailBanner.title}
                                className="rounded-2xl object-cover"
                                fallback="https://placehold.co/1200x400?text=Banner"
                            />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-2">Mobile</p>
                            <Image
                                src={detailBanner.mobileImage}
                                alt={detailBanner.title}
                                width={180}
                                className="rounded-2xl object-cover"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <Tag color={detailBanner.isActive ? "success" : "error"} className="rounded-full border-none">
                                {detailBanner.isActive ? "Faol" : "Nofaol"}
                            </Tag>
                            <Tag color={scheduleLabel(detailBanner.startDate, detailBanner.endDate).color} className="rounded-full border-none">
                                {scheduleLabel(detailBanner.startDate, detailBanner.endDate).text}
                            </Tag>
                            <span className="rounded-full bg-[#4EA674]/10 px-3 py-1 text-xs font-medium text-[#4EA674]">
                                {detailBanner.buttonText}
                            </span>
                        </div>

                        <div className="rounded-2xl border border-gray-100 px-4 py-2 dark:border-slate-700/60">
                            <InfoRow label="ID" value={detailBanner.id} mono />
                            <InfoRow label="Havola" value={detailBanner.link} />
                            <InfoRow label="Tartib" value={detailBanner.sortOrder} />
                            <InfoRow label="Boshlanish" value={formatDate(detailBanner.startDate)} />
                            <InfoRow label="Tugash" value={formatDate(detailBanner.endDate)} />
                            <InfoRow label="Yaratilgan" value={formatDate(detailBanner.createdAt)} />
                            <InfoRow label="Yangilangan" value={formatDate(detailBanner.updatedAt)} />
                            <InfoRow label="O'chirilgan" value={detailBanner.deletedAt ? formatDate(detailBanner.deletedAt) : "—"} />
                        </div>
                    </div>
                )}
            </Drawer>
        </>
    )
}
