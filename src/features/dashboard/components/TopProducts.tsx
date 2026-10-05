import { useMemo, useState } from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import useTopProducts from "../hooks/useTopProducts";

type TopProduct = {
    id?: string
    image?: string
    name?: string
    sku?: string
    price?: number | string
}

export default function TopProducts() {
    const { data, isLoading } = useTopProducts()
    const [query, setQuery] = useState("")
    const products = useMemo(() => {
        const rows: TopProduct[] = Array.isArray(data) ? data : []
        const needle = query.trim().toLowerCase()
        if (!needle) return rows
        return rows.filter((item) =>
            item.name?.toLowerCase().includes(needle) || item.sku?.toLowerCase().includes(needle)
        )
    }, [data, query])

    return (
        <Card loading={isLoading}>
            <div className="mb-4 flex items-center justify-between">
                <p className="text-[15px] font-bold tracking-[-0.02em] text-ink">Top Products</p>
                <Link to="/product" className="text-sm font-semibold text-faint transition-colors hover:text-brand">
                    All
                </Link>
            </div>
            <label className="search-field mb-4">
                <i className="bi bi-search text-sm text-faint"></i>
                <input
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </label>
            <div className="rail max-h-[360px] space-y-1 overflow-y-auto">
                {products.length ? products.map((p: TopProduct) => (
                    <div key={p.id} className="flex items-center justify-between gap-3 rounded-xl px-1 py-2 transition-colors hover:bg-brand-soft">
                        <div className="flex min-w-0 items-center gap-3">
                            <img src={p.image} alt="" className="h-9 w-9 shrink-0 rounded-lg bg-canvas object-cover" />
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-ink">{p.name}</p>
                                <p className="text-xs text-faint">{p.sku}</p>
                            </div>
                        </div>
                        <p className="shrink-0 text-sm font-semibold text-ink">
                            {typeof p.price === "number" ? `${p.price.toLocaleString("en-US")} so'm` : p.price}
                        </p>
                    </div>
                )) : !isLoading && (
                    <div className="empty-state">
                        <i className="bi bi-box-seam" />
                        <p className="text-sm font-semibold text-ink">Mahsulotlar topilmadi</p>
                    </div>
                )}
            </div>
        </Card>
    )
}
