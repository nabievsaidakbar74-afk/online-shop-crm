import { useState } from "react"

const stats = [
  { title: "Total Orders", value: "1,240", change: "+14.4%", up: true },
  { title: "New Orders", value: "240", change: "+20%", up: true },
  { title: "Completed Orders", value: "960", change: "85%", up: true },
  { title: "Canceled Orders", value: "87", change: "-5%", up: false },
]

const tabs = ["All order (240)", "Completed", "Pending", "Canceled"]

const orders = [
  { id: "#ORD0001", product: "Wireless Bluetooth Headphones", icon: "bi-headphones", price: "$49.99", payment: "Paid", status: "Delivered" },
  { id: "#ORD0001", product: "Men's T-Shirt", icon: "bi-tshirt", price: "$14.99", payment: "Unpaid", status: "Pending" },
  { id: "#ORD0001", product: "Men's Leather Wallet", icon: "bi-wallet2", price: "$49.99", payment: "Paid", status: "Delivered" },
  { id: "#ORD0001", product: "Memory Foam Pillow", icon: "bi-moon", price: "$39.99", payment: "Paid", status: "Shipped" },
  { id: "#ORD0001", product: "Adjustable Dumbbells", icon: "bi-trophy", price: "$14.99", payment: "Unpaid", status: "Pending" },
  { id: "#ORD0001", product: "Coffee Maker", icon: "bi-cup-hot", price: "$79.99", payment: "Unpaid", status: "Cancelled" },
  { id: "#ORD0001", product: "Casual Baseball Cap", icon: "bi-circle", price: "$49.99", payment: "Paid", status: "Delivered" },
  { id: "#ORD0001", product: "Full HD Webcam", icon: "bi-camera-video", price: "$39.99", payment: "Paid", status: "Delivered" },
  { id: "#ORD0001", product: "Smart LED Color Bulb", icon: "bi-lightbulb", price: "$79.99", payment: "Unpaid", status: "Delivered" },
  { id: "#ORD0001", product: "Men's T-Shirt", icon: "bi-tshirt", price: "$14.99", payment: "Unpaid", status: "Delivered" },
]

const pages = [1, 2, 3, 4, 5]

function statusColor(status: string) {
  if (status === "Delivered") return "text-[#21C45D]"
  if (status === "Pending") return "text-amber-500"
  if (status === "Shipped") return "text-gray-500 dark:text-gray-400"
  if (status === "Cancelled") return "text-red-400"
  return "text-gray-500"
}

function statusIcon(status: string) {
  if (status === "Delivered") return "bi-truck"
  if (status === "Pending") return "bi-clock-history"
  if (status === "Shipped") return "bi-box-seam"
  if (status === "Cancelled") return "bi-x-circle"
  return "bi-circle"
}

export default function OrderManagment() {
  const [activeTab, setActiveTab] = useState("All order (240)")

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
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-1 border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-[#4EA674] text-gray-900 dark:text-white font-medium"
                    : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-slate-600 px-3 py-1.5">
              <input
                type="text"
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
          <table className="w-full text-sm min-w-[800px]">
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
            <tbody>
              {orders.map((row, i) => (
                <tr key={`${row.product}-${i}`} className="border-b border-gray-50 dark:border-slate-700/60">
                  <td className="p-3">
                    <input type="checkbox" className="accent-[#4EA674]" />
                  </td>
                  <td className="p-3 text-gray-500 dark:text-gray-400">{i + 1}</td>
                  <td className="p-3 text-gray-700 dark:text-gray-200">{row.id}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
                      <span className="w-8 h-8 rounded-md bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500">
                        <i className={`bi ${row.icon}`}></i>
                      </span>
                      {row.product}
                    </div>
                  </td>
                  <td className="p-3 text-gray-500 dark:text-gray-400">01-01-2025</td>
                  <td className="p-3 text-gray-700 dark:text-gray-200">{row.price}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <span className={`w-2 h-2 rounded-full ${row.payment === "Paid" ? "bg-[#21C45D]" : "bg-red-400"}`}></span>
                      {row.payment}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-2 ${statusColor(row.status)}`}>
                      <i className={`bi ${statusIcon(row.status)}`}></i>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-5 text-sm text-gray-500 dark:text-gray-400">
          <button className="inline-flex items-center gap-2 hover:text-[#4EA674]">
            <i className="bi bi-arrow-left"></i> Previous
          </button>
          <div className="flex items-center gap-2">
            {pages.map((n) => (
              <button
                key={n}
                className={`w-8 h-8 rounded-full ${
                  n === 1
                    ? "bg-[#4EA674] text-white"
                    : "hover:bg-gray-100 dark:hover:bg-slate-700"
                }`}
              >
                {n}
              </button>
            ))}
            <span className="px-1">—</span>
            <button className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">24</button>
          </div>
          <button className="inline-flex items-center gap-2 hover:text-[#4EA674]">
            Next <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
