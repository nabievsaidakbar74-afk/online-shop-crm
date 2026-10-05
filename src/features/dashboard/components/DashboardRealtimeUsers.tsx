import { Card } from "antd";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import useRealtimeUsers from "../hooks/useRealTimeUsers";
import useSalesByCountry from "../hooks/useSalesByCountry";


export default function DashboardRealtimeUsers() {
    const { countryData } = useSalesByCountry()
    const { data, isLoading } = useRealtimeUsers()

    const dashPerMinute = data?.data?.perMinute || []

    const totalUsers = dashPerMinute.reduce((acc: number, curr: { users?: number }) => acc + (curr.users || 0), 0);
    return (

        <Card loading={isLoading}>
            <div className="mb-4 flex items-start justify-between">
                <p className="text-sm font-semibold text-ink">Users in last 30 minutes</p>
                <i className="bi bi-three-dots-vertical cursor-pointer text-faint"></i>
            </div>
            <p className="text-[32px] font-bold leading-none tracking-[-0.04em] text-ink">
            {
                totalUsers > 0 ? totalUsers : "0"
            }
                </p>
            <p className="mb-4 mt-1 text-xs text-faint">Users per minute</p>
            <div className="h-16 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashPerMinute} barCategoryGap={2}>
                        <Tooltip
                            labelFormatter={(value) => {
                                const index = typeof value === "number" ? value : Number(value)
                                const item = dashPerMinute[index];
                                return item?.time ? new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
                            }}
                        />
                        <Bar dataKey="users" fill="#2E9A62" radius={[3, 3, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mb-3 flex justify-between text-xs font-semibold uppercase tracking-[0.06em] text-faint">
                <span>Sales by Country</span>
                <span>Sales</span>
            </div>
           <div className="space-y-4">
    {countryData?.map((item: {
        code?: string
        name?: string
        sales?: number
        changePercent?: number
        share?: number
    }) => {
        // Savdo summasini chiroyli formatlash (masalan: 274,057,000 so'm yoki $274,057,000)
        const formattedSales = item.sales?.toLocaleString();

        // O'sish yoki kamayish foizining belgisi (+100% yoki -100%)
        const change = item.changePercent ?? 0
        const isPositive = change >= 0;
        const formattedPercent = `${isPositive ? '+' : ''}${change}%`;

        return (
            <div key={item.code || item.name} className="flex items-center gap-3">
                {/* Viloyat kodi (masalan: AN, TAS) */}
                <span className="w-8 text-xs font-bold text-muted">
                    {item.code}
                </span>

                <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                        {/* Viloyat nomi */}
                        <span className="font-medium text-ink">
                            {item.name}
                        </span>

                        {/* Savdo summasi va O'sish/Kamayish foizi */}
                        <span className="text-faint">
                            {formattedSales}{" "}
                            <span className={isPositive ? "text-emerald-500" : "text-rose-500"}>
                                {formattedPercent}
                            </span>
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 rounded-full bg-line">
                        <div
                            className="h-full rounded-full bg-brand transition-all duration-300"
                            style={{ width: `${item.share}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        );
    })}
</div>
            <button type="button" className="btn-quiet mt-6 w-full">
                View Insight
            </button>
        </Card>
    )
}
