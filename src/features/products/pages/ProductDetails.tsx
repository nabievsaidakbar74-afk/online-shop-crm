import { useMemo, useState } from "react"
import { Image, Tag } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import useProductsDetail from "../hooks/useProductsDetail"
import ProductDrawer from "../components/ProductDrawer"

const pageWrap =
    "p-5 space-y-5 overflow-y-auto h-[calc(100vh-6rem)] bg-[#F3F4F6] dark:bg-slate-900"

const card =
    "rounded-2xl border bg-white border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:bg-slate-800 dark:border-slate-700/60 dark:shadow-none"

const fallbackImg = "https://placehold.co/600x600?text=No+Image"

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

function Stat({ icon, label, value }: { icon: string; label: string; value: string | number }) {
    return (
        <div className="rounded-xl bg-white/15 px-4 py-2.5 backdrop-blur-sm">
            <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-white/70">
                <i className={`bi ${icon}`} />
                {label}
            </p>
            <p className="text-base font-semibold text-white">{value}</p>
        </div>
    )
}

function InfoRow({ label, value, mono }: { label: string; value?: string | number | null; mono?: boolean }) {
    return (
        <div className="flex items-center justify-between gap-3 py-2 border-b border-gray-50 last:border-0 dark:border-slate-700/40">
            <span className="text-xs text-gray-400 dark:text-slate-400">{label}</span>
            <span
                className={`text-xs font-medium text-gray-700 dark:text-slate-200 truncate max-w-55 text-right ${mono ? "font-mono" : ""
                    }`}
            >
                {value === null || value === undefined || value === "" ? "—" : value}
            </span>
        </div>
    )
}

function StatusPill({ active, activeText, inactiveText }: { active?: boolean; activeText: string; inactiveText: string }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${active
                ? "bg-[#4EA674]/10 text-[#4EA674]"
                : "bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-300"
                }`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-[#4EA674]" : "bg-rose-400"}`} />
            {active ? activeText : inactiveText}
        </span>
    )
}

export default function ProductDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data, isLoading } = useProductsDetail(id ?? null)
    const [activeImage, setActiveImage] = useState(0)
    const [editOpen, setEditOpen] = useState(false)

    const product = data?.data ?? data

    const images = useMemo(() => {
        const list = [...(product?.images ?? [])]
        return list.sort((a: any, b: any) => Number(b.isMain) - Number(a.isMain) || a.sortOrder - b.sortOrder)
    }, [product])

    const variants = product?.variants ?? []

    const formatPrice = (value?: number) =>
        typeof value === "number" ? `${value.toLocaleString("uz-UZ")} UZS` : "—"

    const formatDate = (value?: string) =>
        value
            ? new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
            : "—"

    const stockPercent = product?.stock
        ? Math.min(100, Math.round(((product?.availableStock ?? 0) / product.stock) * 100))
        : 0

    const isLowStock = (product?.availableStock ?? 0) <= (product?.lowStockThreshold ?? 0)

    if (isLoading) {
        return (
            <div className={pageWrap}>
                <div className="h-36 rounded-3xl bg-gray-200/70 dark:bg-slate-800 animate-pulse" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <div className="lg:col-span-2 space-y-5">
                        <div className="h-100 rounded-2xl bg-gray-200/70 dark:bg-slate-800 animate-pulse" />
                        <div className="h-44 rounded-2xl bg-gray-200/70 dark:bg-slate-800 animate-pulse" />
                    </div>
                    <div className="space-y-5">
                        <div className="h-56 rounded-2xl bg-gray-200/70 dark:bg-slate-800 animate-pulse" />
                        <div className="h-40 rounded-2xl bg-gray-200/70 dark:bg-slate-800 animate-pulse" />
                    </div>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className={pageWrap}>
                <div className={`${card} p-12 text-center`}>
                    <i className="bi bi-box-seam text-4xl text-gray-300 dark:text-slate-600" />
                    <p className="mt-3 text-sm font-medium text-gray-700 dark:text-slate-200">Mahsulot topilmadi</p>
                    <p className="mt-1 text-xs text-gray-400 dark:text-slate-400">
                        Ushbu ID bo'yicha mahsulot mavjud emas
                    </p>
                    <button
                        onClick={() => navigate("/product")}
                        className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#4EA674] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#3d8b5f]"
                    >
                        <i className="bi bi-arrow-left" /> Mahsulotlarga qaytish
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className={pageWrap}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate("/product")}
                            className="w-10 h-10 rounded-xl border border-gray-200 bg-white text-gray-600 hover:text-[#4EA674] hover:border-[#4EA674]/40 transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:text-[#4EA674]"
                        >
                            <i className="bi bi-arrow-left text-lg" />
                        </button>
                        <div className="text-sm">
                            <button
                                onClick={() => navigate("/product")}
                                className="text-gray-400 hover:text-[#4EA674] transition-colors dark:text-slate-400"
                            >
                                Products
                            </button>
                            <span className="text-gray-300 dark:text-slate-600 mx-2">/</span>
                            <span className="font-medium text-gray-800 dark:text-white">{product?.name ?? "Detail"}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="hidden sm:flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-mono text-gray-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
                            <i className="bi bi-upc-scan" />
                            <span className="truncate max-w-45">{product?.sku}</span>
                        </div>
                        <button
                            onClick={() => setEditOpen(true)}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#4EA674] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#3d8b5f]"
                        >
                            <i className="bi bi-pencil-square" /> Tahrirlash
                        </button>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#4EA674] to-[#2f7f56] p-6">
                    {images[0]?.url && (
                        <img
                            src={images[0].url}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover opacity-20 blur-[3px]"
                        />
                    )}
                    <div className="relative flex flex-wrap items-center justify-between gap-5">
                        <div className="flex items-center gap-4 min-w-0">
                            <div className="w-18 h-18 rounded-2xl overflow-hidden bg-white/20 backdrop-blur-sm flex items-center justify-center text-white/80 shrink-0">
                                {images[0]?.url ? (
                                    <img src={images[0].url} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <i className="bi bi-box-seam text-2xl" />
                                )}
                            </div>
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h1 className="text-2xl font-bold text-white truncate">{product?.name}</h1>
                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${product?.isActive ? "bg-white text-[#2f7f56]" : "bg-white/20 text-white"
                                            }`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${product?.isActive ? "bg-[#4EA674]" : "bg-white/70"}`} />
                                        {product?.isActive ? "Active" : "Inactive"}
                                    </span>
                                </div>
                                <p className="mt-1 text-sm font-mono text-white/80 truncate">/{product?.slug}</p>
                                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                                    {product?.isNew && (
                                        <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-medium text-white">New</span>
                                    )}
                                    {product?.isPopular && (
                                        <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-medium text-white">Popular</span>
                                    )}
                                    {product?.isFeatured && (
                                        <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-medium text-white">Featured</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Stat icon="bi-cash-coin" label="Price" value={formatPrice(product?.price)} />
                            <Stat icon="bi-boxes" label="Available" value={product?.availableStock ?? 0} />
                            <Stat icon="bi-eye" label="Views" value={product?.viewsCount ?? 0} />
                            <Stat
                                icon="bi-star"
                                label="Rating"
                                value={`${product?.averageRating ?? 0} (${product?.reviewsCount ?? 0})`}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
                    <div className="lg:col-span-2 space-y-5">
                        <div className={`${card} p-6`}>
                            <div className="pb-4 mb-5 border-b border-gray-100 dark:border-slate-700/60">
                                <SectionTitle icon="bi-images" title="Product Gallery" subtitle={`${images.length} ta rasm`} />
                            </div>

                            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 flex items-center justify-center min-h-75 dark:border-slate-700 dark:bg-slate-900/40">
                                {images.length ? (
                                    <Image
                                        src={images[activeImage]?.url}
                                        alt={images[activeImage]?.alt}
                                        fallback={fallbackImg}
                                        className="max-h-70 object-contain"
                                    />
                                ) : (
                                    <div className="text-center text-gray-400 dark:text-slate-500">
                                        <i className="bi bi-image text-3xl mb-1 block opacity-50" />
                                        <span className="text-xs">No image available</span>
                                    </div>
                                )}
                            </div>

                            {images.length > 1 && (
                                <div className="mt-4 flex flex-wrap gap-3">
                                    {images.map((img: any, index: number) => (
                                        <button
                                            key={img.id}
                                            onClick={() => setActiveImage(index)}
                                            className={`relative w-18 h-18 rounded-xl overflow-hidden border-2 transition-colors ${index === activeImage
                                                ? "border-[#4EA674]"
                                                : "border-gray-100 hover:border-gray-300 dark:border-slate-700 dark:hover:border-slate-500"
                                                }`}
                                        >
                                            <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                                            {img.isMain && (
                                                <span className="absolute bottom-0 inset-x-0 bg-[#4EA674] text-[9px] font-medium text-white text-center">
                                                    Main
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={`${card} p-6`}>
                            <div className="pb-4 mb-5 border-b border-gray-100 dark:border-slate-700/60">
                                <SectionTitle icon="bi-card-text" title="Description" subtitle="Mahsulot haqida ma'lumot" />
                            </div>

                            {product?.shortDescription && (
                                <p className="rounded-xl bg-[#4EA674]/5 px-4 py-3 text-sm font-medium text-gray-700 dark:bg-slate-900/40 dark:text-slate-200">
                                    {product.shortDescription}
                                </p>
                            )}
                            <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-slate-400">
                                {product?.description || "Tavsif kiritilmagan."}
                            </p>

                            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                                <InfoRow label="SKU" value={product?.sku} mono />
                                <InfoRow label="Barcode" value={product?.barcode} mono />
                            </div>
                        </div>

                        <div className={`${card} p-6`}>
                            <div className="pb-4 mb-5 border-b border-gray-100 dark:border-slate-700/60">
                                <SectionTitle icon="bi-layers" title="Variants" subtitle={`${variants.length} ta variant`} />
                            </div>

                            {variants.length ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {variants.map((variant: any) => (
                                        <div
                                            key={variant.id}
                                            className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4 dark:border-slate-700/60 dark:bg-slate-900/40"
                                        >
                                            <div className="flex items-center justify-between gap-2 mb-3">
                                                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-gray-700 dark:text-slate-200">
                                                    <i className="bi bi-upc text-[#4EA674]" />
                                                    {variant.sku || "—"}
                                                </span>
                                                <StatusPill active={variant.isActive} activeText="Faol" inactiveText="Nofaol" />
                                            </div>

                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {Object.entries(variant.attributes ?? {}).map(([key, value]) => (
                                                    <Tag key={key} className="border-none rounded-full text-[11px] m-0">
                                                        {String(value)}
                                                    </Tag>
                                                ))}
                                            </div>

                                            <div className="flex items-end justify-between gap-3">
                                                <div>
                                                    <p className="text-[11px] text-gray-400 dark:text-slate-400">Narxi</p>
                                                    <p className="text-sm font-bold text-[#4EA674]">{formatPrice(variant.price)}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[11px] text-gray-400 dark:text-slate-400">Qoldiq</p>
                                                    <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">
                                                        {variant.availableStock ?? variant.stock ?? 0} / {variant.stock ?? 0}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-dashed border-gray-200 py-10 text-center dark:border-slate-700">
                                    <i className="bi bi-layers text-2xl text-gray-300 dark:text-slate-600" />
                                    <p className="mt-2 text-xs text-gray-400 dark:text-slate-400">Variantlar mavjud emas</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className={`${card} p-5`}>
                            <div className="pb-4 mb-4 border-b border-gray-100 dark:border-slate-700/60">
                                <SectionTitle icon="bi-cash-coin" title="Pricing" />
                            </div>

                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-[#4EA674]">{formatPrice(product?.price)}</span>
                                {product?.discountPercent > 0 && (
                                    <span className="mb-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-500 dark:bg-rose-500/10 dark:text-rose-300">
                                        -{product.discountPercent}%
                                    </span>
                                )}
                            </div>
                            {product?.oldPrice > 0 && (
                                <p className="mt-1 text-xs text-gray-400 line-through dark:text-slate-500">
                                    {formatPrice(product.oldPrice)}
                                </p>
                            )}

                            <div className="mt-4">
                                <InfoRow label="Chegirma" value={`${product?.discountPercent ?? 0}%`} />
                                <InfoRow label="Eski narxi" value={formatPrice(product?.oldPrice)} />
                            </div>
                        </div>

                        <div className={`${card} p-5`}>
                            <div className="pb-4 mb-4 border-b border-gray-100 dark:border-slate-700/60">
                                <SectionTitle icon="bi-boxes" title="Inventory" />
                            </div>

                            <div className="flex items-center justify-between gap-3 mb-2">
                                <span className="text-xs text-gray-400 dark:text-slate-400">Mavjud qoldiq</span>
                                <span
                                    className={`text-sm font-bold ${isLowStock ? "text-amber-500" : "text-gray-800 dark:text-white"}`}
                                >
                                    {product?.availableStock ?? 0} / {product?.stock ?? 0}
                                </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden dark:bg-slate-700">
                                <div
                                    className={`h-full rounded-full transition-all ${isLowStock ? "bg-amber-400" : "bg-[#4EA674]"}`}
                                    style={{ width: `${stockPercent}%` }}
                                />
                            </div>
                            {isLowStock && (
                                <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-500">
                                    <i className="bi bi-exclamation-triangle" />
                                    Qoldiq kam ({product?.lowStockThreshold} dan past)
                                </p>
                            )}

                            <div className="mt-3">
                                <InfoRow label="Umumiy" value={product?.stock} />
                                <InfoRow label="Band qilingan" value={product?.reservedStock} />
                                <InfoRow label="Kam qoldiq chegarasi" value={product?.lowStockThreshold} />
                            </div>
                        </div>

                        <div className={`${card} p-5`}>
                            <div className="pb-4 mb-4 border-b border-gray-100 dark:border-slate-700/60">
                                <SectionTitle icon="bi-award" title="Brand" />
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 shrink-0 rounded-xl border border-gray-100 bg-white flex items-center justify-center overflow-hidden dark:border-slate-700 dark:bg-slate-900/50">
                                    {product?.brand?.logo ? (
                                        <img src={product.brand.logo} alt="" className="w-full h-full object-contain" />
                                    ) : (
                                        <i className="bi bi-award text-lg text-gray-300 dark:text-slate-600" />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-800 truncate dark:text-white">
                                        {product?.brand?.name ?? "—"}
                                    </p>
                                    <p className="text-xs font-mono text-gray-400 truncate dark:text-slate-400">
                                        /{product?.brand?.slug ?? "—"}
                                    </p>
                                    <div className="mt-1.5">
                                        <StatusPill active={product?.brand?.isActive} activeText="Faol" inactiveText="Nofaol" />
                                    </div>
                                </div>
                            </div>
                            {product?.brand?.description && (
                                <p className="mt-3 text-xs leading-relaxed text-gray-500 line-clamp-2 dark:text-slate-400">
                                    {product.brand.description}
                                </p>
                            )}
                        </div>

                        <div className={`${card} p-5`}>
                            <div className="pb-4 mb-4 border-b border-gray-100 dark:border-slate-700/60">
                                <SectionTitle icon="bi-tag" title="Category" />
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 shrink-0 rounded-xl border border-gray-100 bg-white flex items-center justify-center overflow-hidden dark:border-slate-700 dark:bg-slate-900/50">
                                    {product?.category?.image ? (
                                        <img src={product.category.image} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <i className="bi bi-collection text-lg text-gray-300 dark:text-slate-600" />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-800 truncate dark:text-white">
                                        {product?.category?.name ?? "—"}
                                    </p>
                                    <p className="text-xs font-mono text-gray-400 truncate dark:text-slate-400">
                                        /{product?.category?.slug ?? "—"}
                                    </p>
                                    <div className="mt-1.5">
                                        <StatusPill active={product?.category?.isActive} activeText="Faol" inactiveText="Nofaol" />
                                    </div>
                                </div>
                            </div>
                            {product?.category?.description && (
                                <p className="mt-3 text-xs leading-relaxed text-gray-500 line-clamp-2 dark:text-slate-400">
                                    {product.category.description}
                                </p>
                            )}
                        </div>

                        <div className={`${card} p-5`}>
                            <div className="pb-4 mb-4 border-b border-gray-100 dark:border-slate-700/60">
                                <SectionTitle icon="bi-info-circle" title="Meta" />
                            </div>
                            <InfoRow label="Product ID" value={product?.id} mono />
                            <InfoRow label="Yaratilgan" value={formatDate(product?.createdAt)} />
                            <InfoRow label="Yangilangan" value={formatDate(product?.updatedAt)} />
                            <InfoRow label="Ko'rishlar" value={product?.viewsCount ?? 0} />
                            <InfoRow label="Sharhlar" value={product?.reviewsCount ?? 0} />
                            <InfoRow label="Reyting" value={product?.averageRating ?? 0} />
                        </div>
                    </div>
                </div>
            </div>

            <ProductDrawer open={editOpen} setOpen={setEditOpen} product={product} />
        </>
    )
}
