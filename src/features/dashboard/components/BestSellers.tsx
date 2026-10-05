import { Card } from "antd";
import { Link } from "react-router-dom";
import useBestSellers from "../hooks/useBestSellers";

type SellerRow = {
    id?: string
    sku?: string
    image?: string
    name?: string
    totalOrders?: number
    orders?: number
    status?: string
    availableStock?: number
    price?: number
}

export default function BestSellers() {
    const { data, isLoading } = useBestSellers();

    return (
        <Card loading={isLoading}>
            <div className="mb-4 flex items-center justify-between">
                <p className="text-[15px] font-bold tracking-[-0.02em] text-ink">Best Selling Products</p>
                <Link to="/product" className="text-sm font-semibold text-faint transition-colors hover:text-brand">
                    All
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="data-table min-w-[640px]">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Orders</th>
                            <th>Status</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && data?.data?.length ? data.data.map((row: SellerRow, index: number) => {
                            const low = /low|out/i.test(row.status || "") || (row.availableStock != null && row.availableStock <= 5)
                            return (
                            <tr key={row.id || row.sku}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-canvas text-[11px] font-bold text-faint">
                                            {index + 1}
                                        </span>
                                        <img
                                            src={row.image}
                                            alt={row.name}
                                            className="h-9 w-9 rounded-lg bg-canvas object-cover"
                                        />
                                        <div className="flex min-w-0 flex-col">
                                            <span className="truncate font-semibold text-ink">
                                                {row.name}
                                            </span>
                                            <span className="text-[11px] text-faint">
                                                {row.sku}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {row.totalOrders ?? row.orders}
                                </td>
                                <td>
                                    <span className={`badge ${low ? "badge-warning" : "badge-success"}`}>
                                        {low ? "Low" : "Stock"}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap font-semibold text-ink">
                                    {row.price?.toLocaleString("en-US")} so'm
                                </td>
                            </tr>
                            )
                        }) : !isLoading ? (
                            <tr>
                                <td colSpan={4}>
                                    <div className="empty-state">
                                        <i className="bi bi-bag" />
                                        <p className="text-sm font-semibold text-ink">Hozircha sotuvlar yo'q</p>
                                    </div>
                                </td>
                            </tr>
                        ) : null}
                    </tbody>
                </table>
            </div>

        </Card>
    );
}