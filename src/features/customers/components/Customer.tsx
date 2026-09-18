import { useSelector } from "react-redux"
import {
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

import CustomerTable from "./CustomerTable"
import useCustomer from "../hooks/useCustomer"




const sideStats = [
  { title: "Total Customers", value: "11,040", change: "+14.4%", up: true },
  { title: "New Customers", value: "2,370", change: "+20%", up: true },
  { title: "Visitor", value: "250k", change: "+20%", up: true },
]

const overviewStats = [
  { value: "25k", label: "Active Customers", bar: "bg-[#4EA674]" },
  { value: "5.6k", label: "Repeat Customer", bar: "bg-gray-200 dark:bg-slate-600" },
  { value: "250k", label: "Shop Visitor", bar: "bg-gray-200 dark:bg-slate-600" },
  { value: "5.5%", label: "Conversion Rate", bar: "bg-gray-200 dark:bg-slate-600" },
]

const weekData = [
  { day: "Sun", value: 26 },
  { day: "Mon", value: 26 },
  { day: "Tue", value: 26 },
  { day: "Wed", value: 28 },
  { day: "Thu", value: 40 },
  { day: "Fri", value: 42 },
  { day: "Sat", value: 42 },
]

// const customers = [
//   { id: "#CUST0001", name: "John Doe", phone: "+1234567890", orders: 25, spent: "$3,450.00", status: "Active" },
//   { id: "#CUST0001", name: "John Doe", phone: "+1234567890", orders: 25, spent: "$3,450.00", status: "Active" },
//   { id: "#CUST0001", name: "John Doe", phone: "+1234567890", orders: 25, spent: "$3,450.00", status: "Active" },
//   { id: "#CUST0001", name: "John Doe", phone: "+1234567890", orders: 25, spent: "$3,450.00", status: "Active" },
//   { id: "#CUST0001", name: "Jane Smith", phone: "+1234567890", orders: 5, spent: "$250.00", status: "Inactive" },
//   { id: "#CUST0001", name: "Emily Davis", phone: "+1234567890", orders: 30, spent: "$4,600.00", status: "VIP" },
//   { id: "#CUST0001", name: "Jane Smith", phone: "+1234567890", orders: 5, spent: "$250.00", status: "Inactive" },
//   { id: "#CUST0001", name: "John Doe", phone: "+1234567890", orders: 25, spent: "$3,450.00", status: "Active" },
//   { id: "#CUST0001", name: "Emily Davis", phone: "+1234567890", orders: 30, spent: "$4,600.00", status: "VIP" },
//   { id: "#CUST0001", name: "Jane Smith", phone: "+1234567890", orders: 5, spent: "$250.00", status: "Inactive" },
// ]

// const pages = [1, 2, 3, 4, 5]

// function statusDot(status: string) {
//   if (status === "Active") return "bg-[#21C45D]"
//   if (status === "Inactive") return "bg-red-400"
//   return "bg-amber-400"
// }

// function statusText(status: string) {
//   if (status === "Active") return "text-[#21C45D]"
//   if (status === "Inactive") return "text-red-400"
//   return "text-amber-500"
// }

export default function Customer() {

  const { data, isLoading } = useCustomer()
console.log(data, isLoading)

  const isDark = useSelector((state) => state.theme.isDark)
  const axis = isDark ? "#94a3b8" : "#9ca3af"
  const grid = isDark ? "#334155" : "#f3f4f6"

  return (
    <div className="p-5 space-y-4 bg-[#F3F4F6] dark:bg-slate-900 overflow-y-auto h-[calc(100vh-6rem)] ">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        <div className="space-y-4">
          {sideStats.map((s) => (
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

        <div className="xl:col-span-3 bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <p className="font-medium text-gray-900 dark:text-white">Customer Overview</p>
            <div className="flex items-center gap-2">
              <div className="flex rounded-full bg-gray-100 dark:bg-slate-700 p-1 text-xs">
                <button className="px-3 py-1 rounded-full bg-white dark:bg-slate-600 text-gray-800 dark:text-white shadow-sm">This week</button>
                <button className="px-3 py-1 rounded-full text-gray-400">Last week</button>
              </div>
              <i className="bi bi-three-dots-vertical text-gray-400 cursor-pointer"></i>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {overviewStats.map((item) => (
              <div key={item.label}>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{item.value}</p>
                <p className="text-xs text-gray-400 mb-2">{item.label}</p>
                <div className={`h-1 rounded-full ${item.bar}`}></div>
              </div>
            ))}
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weekData} margin={{ top: 24, right: 12, left: -16, bottom: 0 }}>
                <CartesianGrid stroke={grid} vertical={false} />
                <XAxis dataKey="day" tick={{ fill: axis, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis
                  domain={[0, 50]}
                  ticks={[0, 10, 20, 30, 40, 50]}
                  tickFormatter={(v) => `${v}k`}
                  tick={{ fill: axis, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value) => [`${value}k`, "Customers"]}
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
                  y={40}
                  r={5}
                  fill="#4EA674"
                  stroke="#fff"
                  label={{
                    value: "Thursday 25,409",
                    position: "top",
                    fill: "#4EA674",
                    fontSize: 11,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="text-left text-gray-400 bg-[#F6FBF8] dark:bg-slate-700/50">
                <th className="font-normal p-3">Customer Id</th>
                <th className="font-normal p-3">Name</th>
                <th className="font-normal p-3">Phone</th>
                <th className="font-normal p-3">Order count</th>
                <th className="font-normal p-3">Total Spend</th>
                <th className="font-normal p-3">Status</th>
                <th className="font-normal p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((row, i) => (
                <tr key={`${row.name}-${i}`} className="border-b border-gray-50 dark:border-slate-700/60">
                  <td className="p-3 text-gray-700 dark:text-gray-200">{row.id}</td>
                  <td className="p-3 text-gray-800 dark:text-gray-100">{row.name}</td>
                  <td className="p-3 text-gray-500 dark:text-gray-400">{row.phone}</td>
                  <td className="p-3 text-gray-500 dark:text-gray-400">{row.orders}</td>
                  <td className="p-3 text-gray-700 dark:text-gray-200">{row.spent}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-2 ${statusText(row.status)}`}>
                      <span className={`w-2 h-2 rounded-full ${statusDot(row.status)}`}></span>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3 text-gray-400">
                      <button className="hover:text-[#4EA674]"><i className="bi bi-chat-dots"></i></button>
                      <button className="hover:text-red-400"><i className="bi bi-trash"></i></button>
                    </div>
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
      </div> */}

      <CustomerTable data={data} isLoading={isLoading}/>
    </div>
  )
}
