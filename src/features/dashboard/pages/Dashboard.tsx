import { useSelector } from "react-redux"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const weekData = [
  { day: "Sun", value: 16 },
  { day: "Mon", value: 4 },
  { day: "Tue", value: 16 },
  { day: "Wed", value: 20 },
  { day: "Thu", value: 10 },
  { day: "Fri", value: 30 },
  { day: "Sat", value: 40 },
]

const userMinuteData = [
  18, 28, 22, 35, 42, 30, 25, 38, 48, 32, 20, 36, 44, 26, 18, 30, 40, 22, 16,
].map((value, i) => ({ i, value }))

const bestSelling = [
  { name: "Apple iPhone 13", orders: 104, status: "Stock", price: "$999.00", color: "bg-neutral-900" },
  { name: "Nike Air Jordan", orders: 56, status: "Stock out", price: "$999.00", color: "bg-neutral-800" },
  { name: "T-shirt", orders: 266, status: "Stock", price: "$999.00", color: "bg-zinc-200" },
  { name: "Crossbag", orders: 506, status: "Stock", price: "$999.00", color: "bg-amber-800" },
]

const topProducts = [
  { name: "Apple iPhone 13", sku: "FXZ-456787", price: "$999.00", color: "bg-neutral-900" },
  { name: "Nike Air Jordan", sku: "FXZ-456787", price: "$72.40", color: "bg-neutral-800" },
  { name: "T-shirt", sku: "FXZ-456787", price: "$35.40", color: "bg-zinc-200" },
  { name: "Assorted Cross Bag", sku: "FXZ-456787", price: "$80.00", color: "bg-amber-800" },
]

const countries = [
  { name: "US", flag: "🇺🇸", value: "30K", pct: "-29.8%", width: "72%" },
  { name: "Brazil", flag: "🇧🇷", value: "30K", pct: "-15.8%", width: "58%" },
  { name: "Australia", flag: "🇦🇺", value: "25K", pct: "-35.9%", width: "48%" },
]

const weekStats = [
  { value: "52k", label: "Customers", bar: "bg-[#4EA674]" },
  { value: "3.5k", label: "Total Products", bar: "bg-gray-200 dark:bg-slate-600" },
  { value: "2.5k", label: "Stock Products", bar: "bg-gray-200 dark:bg-slate-600" },
  { value: "0.5k", label: "Out of Stock", bar: "bg-gray-200 dark:bg-slate-600" },
  { value: "250k", label: "Revenue", bar: "bg-gray-200 dark:bg-slate-600" },
]

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      {children}
    </div>
  )
}

function DetailsBtn() {
  return (
    <button className="ml-auto block rounded-full border border-gray-200 dark:border-slate-600 px-5 py-1 text-sm text-gray-500 dark:text-gray-300 hover:border-[#4EA674] hover:text-[#4EA674] transition-colors">
      Details
    </button>
  )
}

export default function Dashboard() {
  const isDark = useSelector((state) => state.theme.isDark)
  const axis = isDark ? "#94a3b8" : "#9ca3af"
  const grid = isDark ? "#334155" : "#f3f4f6"

  return (
    <div className="p-5 space-y-4 bg-[#F3F4F6] dark:bg-slate-900 overflow-y-auto h-[calc(100vh-6rem)] ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Total Sales</p>
              <p className="text-sm text-gray-400 mt-1">Last 7 days</p>
            </div>
            <i className="bi bi-three-dots-vertical text-gray-400 cursor-pointer"></i>
          </div>
          <div className="flex items-end gap-3 mt-4">
            <p className="text-[32px] leading-none font-semibold text-gray-900 dark:text-white">$350K</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              sales <span className="text-[#21C45D]"><i className="bi bi-arrow-up"></i> 10.4%</span>
            </p>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Previous 7 days <span className="text-[#6467F2]">($235)</span>
          </p>
          <div className="flex justify-end mt-5">
            <DetailsBtn />
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Total Orders</p>
              <p className="text-sm text-gray-400 mt-1">Last 7 days</p>
            </div>
            <i className="bi bi-three-dots-vertical text-gray-400 cursor-pointer"></i>
          </div>
          <div className="flex items-end gap-3 mt-4">
            <p className="text-[32px] leading-none font-semibold text-gray-900 dark:text-white">10.7K</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              order <span className="text-[#21C45D]"><i className="bi bi-arrow-up"></i> 14.4%</span>
            </p>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Previous 7 days <span className="text-[#6467F2]">(7.6K)</span>
          </p>
          <div className="flex justify-end mt-5">
            <DetailsBtn />
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Pending & Canceled</p>
              <p className="text-sm text-gray-400 mt-1">Last 7 days</p>
            </div>
            <i className="bi bi-three-dots-vertical text-gray-400 cursor-pointer"></i>
          </div>
          <div className="flex items-center justify-between mt-5 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">pending</p>
              <p className="text-[22px] font-semibold text-gray-900 dark:text-white">
                509 <span className="text-sm font-normal text-[#4EA674]">user 204</span>
              </p>
            </div>
            <div className="w-px h-10 bg-gray-200 dark:bg-slate-600"></div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Canceled</p>
              <p className="text-[22px] font-semibold text-red-400">
                94 <span className="text-sm font-normal"><i className="bi bi-arrow-down"></i> 14.4%</span>
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <DetailsBtn />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <p className="font-medium text-gray-900 dark:text-white">Report for this week</p>
              <div className="flex rounded-full bg-gray-100 dark:bg-slate-700 p-1 text-xs">
                <button className="px-3 py-1 rounded-full bg-white dark:bg-slate-600 text-gray-800 dark:text-white shadow-sm">This week</button>
                <button className="px-3 py-1 rounded-full text-gray-400">Last week</button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
              {weekStats.map((item) => (
                <div key={item.label}>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{item.value}</p>
                  <p className="text-xs text-gray-400 mb-2">{item.label}</p>
                  <div className={`h-1 rounded-full ${item.bar}`}></div>
                </div>
              ))}
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weekData} margin={{ top: 24, right: 12, left: -16, bottom: 0 }}>
                  <CartesianGrid stroke={grid} vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: axis, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis
                    domain={[0, 10]}
                    ticks={[0, 10, 20, 30, 40, 50]}
                    tickFormatter={(v) => `${v}k`}
                    tick={{ fill: axis, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value) => [`${value}k`, "Revenue"]}
                    contentStyle={{
                      background: isDark ? "#1e293b" : "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      color: isDark ? "#fff" : "#111",
                    }}
                  />
                  <ReferenceLine x="Thu" stroke="#4EA674" strokeDasharray="4 4" />
                  <Line type="monotone" dataKey="value" stroke="#86EFAC" strokeWidth={3} dot={false} />
                  <ReferenceDot
                    x="Thu"
                    y={38}
                    r={5}
                    fill="#4EA674"
                    stroke="#fff"
                    label={{
                      value: "Thursday 14k",
                      position: "top",
                      fill: "#4EA674",
                      fontSize: 11,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card>
          <div className="flex justify-between items-start mb-4">
            <p className="font-medium text-gray-900 dark:text-white">Users in last 30 minutes</p>
            <i className="bi bi-three-dots-vertical text-gray-400 cursor-pointer"></i>
          </div>
          <p className="text-[32px] font-semibold text-gray-900 dark:text-white leading-none">21.5K</p>
          <p className="text-xs text-gray-400 mt-1 mb-4">Users per minute</p>
          <div className="h-16 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userMinuteData} barCategoryGap={2}>
                <Bar dataKey="value" fill="#4EA674" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span>Sales by Country</span>
            <span>Sales</span>
          </div>
          <div className="space-y-4">
            {countries.map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <span className="text-lg w-6">{c.flag}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-700 dark:text-gray-200">{c.name}</span>
                    <span className="text-gray-400">{c.value} <span className="text-blue-400">{c.pct}</span></span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 dark:bg-slate-700">
                    <div className="h-full rounded-full bg-blue-400" style={{ width: c.width }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full rounded-full border border-gray-200 dark:border-slate-600 py-1.5 text-sm text-gray-500 dark:text-gray-300 hover:border-[#4EA674] hover:text-[#4EA674] transition-colors">
            View Insight
          </button>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <p className="font-medium text-gray-900 dark:text-white">Best selling product</p>
              <button className="flex items-center gap-2 rounded-full bg-[#E8F8EE] dark:bg-[#1e422f] text-[#4EA674] dark:text-green-300 text-sm px-3 py-1">
                Filter <i className="bi bi-funnel"></i>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-100 dark:border-slate-700">
                    <th className="font-normal pb-3">PRODUCT</th>
                    <th className="font-normal pb-3">TOTAL ORDER</th>
                    <th className="font-normal pb-3">STATUS</th>
                    <th className="font-normal pb-3">PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  {bestSelling.map((row) => (
                    <tr key={row.name} className="border-b border-gray-50 dark:border-slate-700/60">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-md ${row.color}`}></span>
                          <span className="text-gray-800 dark:text-gray-100">{row.name}</span>
                        </div>
                      </td>
                      <td className="text-gray-500 dark:text-gray-400">{row.orders}</td>
                      <td>
                        <span className="inline-flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${row.status === "Stock" ? "bg-[#21C45D]" : "bg-red-400"}`}></span>
                          <span className="text-gray-500 dark:text-gray-400">{row.status}</span>
                        </span>
                      </td>
                      <td className="text-gray-500 dark:text-gray-400">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <DetailsBtn />
            </div>
          </Card>
        </div>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <p className="font-medium text-gray-900 dark:text-white">Top Products</p>
            <button className="text-sm text-gray-400 flex items-center gap-1">
              All products <i className="bi bi-chevron-down text-xs"></i>
            </button>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-slate-600 px-3 py-1.5 mb-4">
            <i className="bi bi-search text-gray-400 text-sm"></i>
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent outline-none text-sm text-gray-700 dark:text-white placeholder-gray-400"
            />
          </div>
          <div className="space-y-4">
            {topProducts.map((p) => (
              <div key={p.name} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`w-9 h-9 rounded-md shrink-0 ${p.color}`}></span>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-800 dark:text-gray-100 truncate">{p.name}</p>
                    <p className="text-xs text-gray-400">Item: #{p.sku}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300 shrink-0">{p.price}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
