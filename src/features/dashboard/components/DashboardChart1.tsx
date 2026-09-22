// import { Card } from "antd";
import { useSelector } from "react-redux";
import { CartesianGrid, Line, LineChart, ReferenceDot, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useChart1Dashboard from "../hooks/useChart1Dashboard";
import { useState } from "react";








function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            {children}
        </div>
    )
}
export default function DashboardChart1() {
    const formatShort = (v: number) =>
        v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M`
            : v >= 1_000 ? `${(v / 1_000).toFixed(1)}k`
                : `${v}`


    const [week, setWeek] = useState<"this" | "last">("this")
    const { data } = useChart1Dashboard(week)
    console.log(data)

    const chartData = data?.chart?.active ?? []
    const stats = data?.stats

    const weekStats = [
        { value: stats?.customers ?? 0, label: "Customers", bar: "bg-[#4EA674]" },
        { value: stats?.totalProducts ?? 0, label: "Total Products", bar: "bg-gray-200 dark:bg-slate-600" },
        { value: stats?.stockProducts ?? 0, label: "Stock Products", bar: "bg-gray-200 dark:bg-slate-600" },
        { value: stats?.outOfStock ?? 0, label: "Out of Stock", bar: "bg-gray-200 dark:bg-slate-600" },
        { value: formatShort(stats?.revenue ?? 0), label: "Revenue", bar: "bg-gray-200 dark:bg-slate-600" },
    ]
    const peak = chartData.reduce(
        (best: any, cur: any) => (cur.value > best.value ? cur : best),
        chartData[0] ?? { day: "", value: 0 }
    )


    const isDark = useSelector((state) => state.theme.isDark)
    const axis = isDark ? "#94a3b8" : "#9ca3af"
    const grid = isDark ? "#334155" : "#f3f4f6"

    return (
        <Card>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <p className="font-medium text-gray-900 dark:text-white">
                    Report for {week === "this" ? "this" : "last"} week
                </p>                <div className="flex rounded-full bg-gray-100 dark:bg-slate-700 p-1 text-xs">
                    <button onClick={() => setWeek("this")}
                        className={`cursor-pointer px-3 py-1 rounded-full ${week === "this" ? "bg-white dark:bg-slate-600 text-gray-800 dark:text-white shadow-sm" : "text-gray-400"}`}>
                        This week
                    </button>
                    <button onClick={() => setWeek("last")}
                        className={`cursor-pointer px-3 py-1 rounded-full ${week === "last" ? "bg-white dark:bg-slate-600 text-gray-800 dark:text-white shadow-sm" : "text-gray-400"}`}>
                        last week
                    </button>
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
                    <LineChart data={chartData} margin={{ top: 24, right: 12, left: -16, bottom: 0 }}>
                        <CartesianGrid stroke={grid} vertical={false} />
                        <XAxis dataKey="day" tick={{ fill: axis, fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis
                            domain={[0, "auto"]}
                            tickFormatter={formatShort}
                            tick={{ fill: axis, fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            formatter={(value) => [formatShort(Number(value)), "Revenue"]}
                            contentStyle={{
                                background: isDark ? "#1e293b" : "#fff",
                                border: `1px solid ${isDark ? "#334155" : "#e5e7eb"}`,
                                borderRadius: 8,
                                color: isDark ? "#fff" : "#111",
                            }}
                        />
                        <Line type="monotone" dataKey="value" stroke="#86EFAC" strokeWidth={3} dot={false} />

                        {peak.value > 0 && (
                            <>
                                <ReferenceLine x={peak.day} stroke="#4EA674" strokeDasharray="4 4" />
                                <ReferenceDot x={peak.day} y={peak.value} r={5} fill="#4EA674" stroke="#fff"
                                    label={{ value: `${peak.day} ${formatShort(peak.value)}`, position: "top", fill: "#4EA674", fontSize: 11 }}
                                />
                            </>
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
}
