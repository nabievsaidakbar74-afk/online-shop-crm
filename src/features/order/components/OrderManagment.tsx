import { useEffect, useState } from "react"
import useOrder from "../hooks/useOrder"

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

function statusColor(status: string) {
  const key = status?.toUpperCase()
  if (key === "DELIVERED" || key === "COMPLETED") return "text-[#21C45D]"
  if (key === "PENDING") return "text-amber-500"
  if (key === "SHIPPED" || key === "PROCESSING" || key === "CONFIRMED") return "text-gray-500 dark:text-gray-400"
  if (key === "CANCELLED" || key === "CANCELED") return "text-red-400"
  return "text-gray-500"
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
    <div className="p-5 space-y-4 bg-[#F3F4F6] dark:bg-slate-900 overflow-y-auto h-[calc(100vh-6rem)] ">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Order List</h1>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-full bg-[#4EA674] text-white text-sm px-4 py-2 hover:bg-[#3d8b5f] transition-colors">
            <i className="bi bi-plus-lg"></i> Add Order
          </button>
          <button className="text-sm text-gray-500 dark:text-gray-300 hover:text-[#4EA674] transition-colors">
            More Action
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.title} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex justify-between items-start">
              <p className="text-sm text-gray-500 dark:text-gray-400">{s.title}</p>
              <i className="bi bi-three-dots-vertical text-gray-400 cursor-pointer"></i>
            </div>
            <div className="flex items-end gap-2 mt-3">
              <p className="text-[28px] leading-none font-semibold text-gray-900 dark:text-white">{s.value}</p>
              <span className={`text-sm mb-0.5 ${s.up ? "text-[#21C45D]" : "text-red-400"}`}>
                <i className={`bi ${s.up ? "bi-arrow-up" : "bi-arrow-down"}`}></i> {s.change}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Last 7 days</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
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
                  className={`pb-1 border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? "border-[#4EA674] text-gray-900 dark:text-white font-medium"
                      : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  }`}
                >
                  {tab.label}{count}
                </button>
              )
            })}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-slate-600 px-3 py-1.5">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search order report"
                className="bg-transparent outline-none text-sm text-gray-700 dark:text-white placeholder-gray-400 w-40"
              />
              <i className="bi bi-search text-gray-400 text-sm"></i>
            </div>
            <button className="w-9 h-9 rounded-full border border-gray-200 dark:border-slate-600 text-gray-400 hover:text-[#4EA674]">
              <i className="bi bi-funnel"></i>
            </button>
            <button className="w-9 h-9 rounded-full border border-gray-200 dark:border-slate-600 text-gray-400 hover:text-[#4EA674]">
              <i className="bi bi-arrow-left-right"></i>
            </button>
            <button className="w-9 h-9 rounded-full border border-gray-200 dark:border-slate-600 text-gray-400">
              <i className="bi bi-three-dots"></i>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-200">
            <thead>
              <tr className="text-left text-gray-400 bg-[#F6FBF8] dark:bg-slate-700/50">
                <th className="font-normal p-3 w-10">
                  <input type="checkbox" className="accent-[#4EA674]" />
                </th>
                <th className="font-normal p-3">No.</th>
                <th className="font-normal p-3">Order Id</th>
                <th className="font-normal p-3">Product</th>
                <th className="font-normal p-3">Date</th>
                <th className="font-normal p-3">Price</th>
                <th className="font-normal p-3">Payment</th>
                <th className="font-normal p-3">Status</th>
              </tr>
            </thead>
            <tbody className={isFetching ? "opacity-60" : ""}>
              {isLoading && orders.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-400">
                    Loading orders...
                  </td>
                </tr>
              )}
              {!isLoading && orders.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-400">
                    No orders found
                  </td>
                </tr>
              )}
              {orders.map((row, i) => {
                const firstItem = row.items?.[0]
                const extraCount = (row.items?.length ?? 0) - 1
                const paid = row.paymentStatus?.toUpperCase() === "PAID"

                return (
                  <tr key={row.id} className="border-b border-gray-50 dark:border-slate-700/60">
                    <td className="p-3">
                      <input type="checkbox" className="accent-[#4EA674]" />
                    </td>
                    <td className="p-3 text-gray-500 dark:text-gray-400">
                      {(currentPage - 1) * PAGE_SIZE + i + 1}
                    </td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{row.orderNumber}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
                        {firstItem?.productImage ? (
                          <img
                            src={firstItem.productImage}
                            alt={firstItem.productName}
                            className="w-8 h-8 rounded-md object-cover bg-gray-100 dark:bg-slate-700"
                          />
                        ) : (
                          <span className="w-8 h-8 rounded-md bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500">
                            <i className="bi bi-box-seam"></i>
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className="truncate">{firstItem?.productName ?? "—"}</p>
                          {extraCount > 0 && (
                            <p className="text-xs text-gray-400">+{extraCount} more</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-gray-500 dark:text-gray-400">{formatDate(row.createdAt)}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{formatMoney(row.total)}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <span className={`w-2 h-2 rounded-full ${paid ? "bg-[#21C45D]" : "bg-red-400"}`}></span>
                        {prettyLabel(row.paymentStatus)}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`inline-flex items-center gap-2 ${statusColor(row.status)}`}>
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

        <div className="flex flex-wrap items-center justify-between gap-3 mt-5 text-sm text-gray-500 dark:text-gray-400">
          <button
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="inline-flex items-center gap-2 hover:text-[#4EA674] disabled:opacity-40 disabled:hover:text-inherit"
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
                    className={`w-8 h-8 rounded-full ${
                      n === currentPage
                        ? "bg-[#4EA674] text-white"
                        : "hover:bg-gray-100 dark:hover:bg-slate-700"
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
            className="inline-flex items-center gap-2 hover:text-[#4EA674] disabled:opacity-40 disabled:hover:text-inherit"
          >
            Next <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
