import { useEffect, useState } from "react"
import useOrder from "../hooks/useOrder"
import { useNavigate } from "react-router-dom"

const stats = [
  { title: "Total Orders", value: "1,240", change: "+14.4%", up: true },
  { title: "New Orders", value: "240", change: "+20%", up: true },
  { title: "Completed Orders", value: "960", change: "85%", up: true },
  { title: "Canceled Orders", value: "87", change: "-5%", up: false },
]

const tabs = [
  { key: "all", label: "All order", status: undefined },
  { key: "delivered", label: "Completed", status: "DELIVERED" },
  { key: "pending", label: "Pending", status: "PENDING" },
  { key: "canceled", label: "Canceled", status: "CANCELLED" },
] as const

const PAGE_SIZE = 10

interface OrderItem {
  id: string
  productName: string
  productSku: string
  productImage: string | null
  quantity: number
}

interface OrderRow {
  id: string
  orderNumber: string
  status: string
  paymentStatus: string
  total: number
  createdAt: string
  items: OrderItem[]
}

function prettyLabel(value?: string | null) {
  if (!value) return "—"
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function formatMoney(value?: number | null) {
  return `${Number(value ?? 0).toLocaleString()} UZS`
}

function formatDate(value?: string | null) {
  if (!value) return "—"
  return new Date(value).toLocaleDateString("en-GB").replaceAll("/", "-")
}

function statusBadge(status: string) {
  const key = status?.toUpperCase()
  if (key === "DELIVERED" || key === "COMPLETED") return "badge badge-success"
  if (key === "PENDING") return "badge badge-warning"
  if (key === "SHIPPED" || key === "PROCESSING" || key === "CONFIRMED") return "badge badge-info"
  if (key === "CANCELLED" || key === "CANCELED") return "badge badge-danger"
  return "badge badge-neutral"
}

function statusIcon(status: string) {
  const key = status?.toUpperCase()
  if (key === "DELIVERED" || key === "COMPLETED") return "bi-truck"
  if (key === "PENDING") return "bi-clock-history"
  if (key === "SHIPPED") return "bi-box-seam"
  if (key === "CANCELLED" || key === "CANCELED") return "bi-x-circle"
  return "bi-circle"
}

function pageNumbers(current: number, total: number) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, total, current, current - 1, current + 1])
  return [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b)
}

export default function OrderManagment() {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["key"]>("all")
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    const next = searchInput.trim()
    const timer = setTimeout(() => {
      setSearch((prev) => {
        if (prev !== next) setPage(1)
        return next
      })
    }, 400)
    return () => clearTimeout(timer)
  }, [searchInput])

  const selectedTab = tabs.find((tab) => tab.key === activeTab) ?? tabs[0]
  const { data, isLoading, isFetching } = useOrder({
    page,
    limit: PAGE_SIZE,
    status: selectedTab.status,
    search: search || undefined,
  })
  const orders: OrderRow[] = Array.isArray(data?.data) ? data.data : []
  const meta = data?.meta
  const totalPages = meta?.totalPages ?? 1
  const currentPage = meta?.page ?? page
  const pages = pageNumbers(currentPage, totalPages)

  return (
    <div className="page-shell space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-[-0.03em] text-ink">Order List</h2>
          <p className="text-xs text-faint">So'nggi buyurtmalar va holatlar</p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" className="btn-primary">
            <i className="bi bi-plus-lg"></i> Add Order
          </button>
          <button type="button" className="text-sm font-semibold text-muted transition-colors hover:text-brand">
            More Action
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.title} className="surface p-5">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-muted">{s.title}</p>
              <i className="bi bi-three-dots-vertical cursor-pointer text-faint"></i>
            </div>
            <div className="mt-3 flex items-end gap-2">
              <p className="text-[28px] font-bold leading-none tracking-[-0.04em] text-ink">{s.value}</p>
              <span className={`mb-0.5 text-sm font-semibold ${s.up ? "text-brand" : "text-red-400"}`}>
                <i className={`bi ${s.up ? "bi-arrow-up" : "bi-arrow-down"}`}></i> {s.change}
              </span>
            </div>
            <p className="mt-2 text-xs text-faint">Last 7 days</p>
          </div>
        ))}
      </div>

      <div className="surface p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {tabs.map((tab) => {
              const count = tab.key === "all" && meta?.total != null ? ` (${meta.total})` : ""
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key)
                    setPage(1)
                  }}
                  className={`border-b-2 pb-2 text-sm font-semibold transition-colors ${activeTab === tab.key
                    ? "border-brand text-ink"
                    : "border-transparent text-faint hover:text-muted"
                    }`}
                >
                  {tab.label}{count}
                </button>
              )
            })}
          </div>
          <div className="flex items-center gap-2">
            <label className="search-field w-full sm:w-56">
              <i className="bi bi-search text-sm text-faint"></i>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search order report"
              />
            </label>
            <button type="button" className="icon-btn border border-line">
              <i className="bi bi-funnel"></i>
            </button>
            <button type="button" className="icon-btn border border-line">
              <i className="bi bi-arrow-left-right"></i>
            </button>
            <button type="button" className="icon-btn border border-line">
              <i className="bi bi-three-dots"></i>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table min-w-[760px]">
            <thead>
              <tr>
                <th className="w-10">
                  <input type="checkbox" className="accent-brand" />
                </th>
                <th>No.</th>
                <th>Order Id</th>
                <th>Product</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className={isFetching ? "opacity-60" : ""}>
              {isLoading && orders.length === 0 && (
                <tr>
                  <td colSpan={8}>
                    <div className="space-y-2 py-2">
                      {[0, 1, 2, 3].map((item) => (
                        <div key={item} className="skeleton h-10" />
                      ))}
                    </div>
                  </td>
                </tr>
              )}
              {!isLoading && orders.length === 0 && (
                <tr>
                  <td colSpan={8}>
                    <div className="empty-state">
                      <i className="bi bi-cart" />
                      <p className="text-sm font-semibold text-ink">No orders found</p>
                      <p className="text-xs text-faint">Filtr yoki qidiruvni o'zgartirib ko'ring</p>
                    </div>
                  </td>
                </tr>
              )}
              {orders.map((row, i) => {
                const firstItem = row.items?.[0]
                const extraCount = (row.items?.length ?? 0) - 1
                const paid = row.paymentStatus?.toUpperCase() === "PAID"

                return (
                  <tr key={row.id} className="cursor-pointer" onClick={() => navigate(row.id)}>
                    <td>
                      <input type="checkbox" className="accent-brand" onClick={(event) => event.stopPropagation()} />
                    </td>
                    <td>
                      {(currentPage - 1) * PAGE_SIZE + i + 1}
                    </td>
                    <td className="font-semibold text-ink">{row.orderNumber}</td>
                    <td>
                      <div className="flex items-center gap-2 text-ink">
                        {firstItem?.productImage ? (
                          <img
                            src={firstItem.productImage}
                            alt={firstItem.productName}
                            className="h-9 w-9 rounded-lg bg-canvas object-cover"
                          />
                        ) : (
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-canvas text-faint">
                            <i className="bi bi-box-seam"></i>
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className="truncate font-semibold">{firstItem?.productName ?? "—"}</p>
                          {extraCount > 0 && (
                            <p className="text-xs text-faint">+{extraCount} more</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>{formatDate(row.createdAt)}</td>
                    <td className="font-semibold text-ink">{formatMoney(row.total)}</td>
                    <td>
                      <span className={`badge ${paid ? "badge-success" : "badge-danger"}`}>
                        <span className="dot" />
                        {prettyLabel(row.paymentStatus)}
                      </span>
                    </td>
                    <td>
                      <span className={statusBadge(row.status)}>
                        <i className={`bi ${statusIcon(row.status)}`}></i>
                        {prettyLabel(row.status)}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
          <button
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="inline-flex items-center gap-2 font-semibold hover:text-brand disabled:opacity-40 disabled:hover:text-inherit"
          >
            <i className="bi bi-arrow-left"></i> Previous
          </button>
          <div className="flex items-center gap-2">
            {pages.map((n, idx) => {
              const prev = pages[idx - 1]
              return (
                <span key={n} className="contents">
                  {prev && n - prev > 1 && <span className="px-1">—</span>}
                  <button
                    onClick={() => setPage(n)}
                    className={`h-8 w-8 rounded-full text-sm font-semibold ${n === currentPage
                      ? "bg-brand text-white"
                      : "hover:bg-brand-soft"
                      }`}
                  >
                    {n}
                  </button>
                </span>
              )
            })}
          </div>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="inline-flex items-center gap-2 font-semibold hover:text-brand disabled:opacity-40 disabled:hover:text-inherit"
          >
            Next <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
