import type { ComponentType } from "react"
import { Card } from 'antd'
import useDashboardKpis from '../hooks/useDashboardKpis'

export default function DashboardKpis({ DetailsBtn }: { DetailsBtn?: ComponentType }) {
    const { data, isLoading } = useDashboardKpis()
    // Ma'lumotlarni osonroq ishlatish uchun ajratib olamiz
    const kpiData = data?.data || data

    const totalSales = kpiData?.totalSales
    const totalOrders = kpiData?.totalOrders
    const pending = kpiData?.pending
    const cancelled = kpiData?.cancelled

    // Raqamlarni chiroyli formatlash uchun yordamchi funksiya (masalan: 14999000 -> 15M, $15M yoki 14.99M)
    const formatNumber = (num?: number | null) => {
        if (!num && num !== 0) return '0'
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
        if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
        return num.toLocaleString()
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {[0, 1, 2].map((item) => (
                    <div key={item} className="skeleton h-44" />
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* 1. TOTAL SALES CARD */}
            <Card>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-semibold text-ink">Total Sales</p>
                        <p className="mt-0.5 text-xs text-faint">Last 7 days</p>
                    </div>
                    <i className="bi bi-three-dots-vertical text-gray-400 cursor-pointer"></i>
                </div>
                <div className="flex items-end gap-3 mt-4">
                    <p className="text-[32px] leading-none font-bold tracking-[-0.04em] text-ink">
                        ${formatNumber(totalSales?.value)}
                    </p>
                    <p className="mb-1 text-sm text-muted">
                        sales{' '}
                        <span className={totalSales?.changePercent >= 0 ? "text-brand" : "text-red-500"}>
                            <i className={`bi bi-arrow-${totalSales?.changePercent >= 0 ? 'up' : 'down'}`}></i>{' '}
                            {totalSales?.changePercent ?? 0}%
                        </span>
                    </p>
                </div>
                <p className="mt-4 text-sm text-muted">
                    Previous 7 days <span className="font-semibold text-brand">(${formatNumber(totalSales?.previousValue)})</span>
                </p>
                <div className="flex justify-end mt-5">
                    {DetailsBtn && <DetailsBtn />}
                </div>
            </Card>

            {/* 2. TOTAL ORDERS CARD */}
            <Card>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-semibold text-ink">Total Orders</p>
                        <p className="mt-0.5 text-xs text-faint">Last 7 days</p>
                    </div>
                    <i className="bi bi-three-dots-vertical text-gray-400 cursor-pointer"></i>
                </div>
                <div className="flex items-end gap-3 mt-4">
                    <p className="text-[32px] leading-none font-bold tracking-[-0.04em] text-ink">
                        {formatNumber(totalOrders?.value)}
                    </p>
                    <p className="mb-1 text-sm text-muted">
                        order{' '}
                        <span className={totalOrders?.changePercent >= 0 ? "text-brand" : "text-red-500"}>
                            <i className={`bi bi-arrow-${totalOrders?.changePercent >= 0 ? 'up' : 'down'}`}></i>{' '}
                            {totalOrders?.changePercent ?? 0}%
                        </span>
                    </p>
                </div>
                <p className="mt-4 text-sm text-muted">
                    Previous 7 days <span className="font-semibold text-brand">({formatNumber(totalOrders?.previousValue)})</span>
                </p>
                <div className="flex justify-end mt-5">
                    {DetailsBtn && <DetailsBtn />}
                </div>
            </Card>

            {/* 3. PENDING & CANCELED CARD */}
            <Card>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-semibold text-ink">Pending & Canceled</p>
                        <p className="mt-0.5 text-xs text-faint">Last 7 days</p>
                    </div>
                    <i className="bi bi-three-dots-vertical text-gray-400 cursor-pointer"></i>
                </div>
                <div className="flex items-center justify-between mt-5 gap-4">
                    <div>
                        <p className="mb-1 text-xs uppercase tracking-[0.06em] text-faint">pending</p>
                        <p className="text-[22px] font-bold tracking-[-0.03em] text-ink">
                            {pending?.orders ?? 0} <span className="text-sm font-semibold text-brand">user {pending?.users ?? 0}</span>
                        </p>
                    </div>
                    <div className="w-px h-10 bg-gray-200 dark:bg-slate-600"></div>
                    <div>
                        <p className="mb-1 text-xs uppercase tracking-[0.06em] text-faint">Canceled</p>
                        <p className="text-[22px] font-semibold text-red-400">
                            {cancelled?.value ?? 0}{' '}
                            <span className="text-sm font-normal">
                                <i className={`bi bi-arrow-${cancelled?.changePercent >= 0 ? 'up' : 'down'}`}></i>{' '}
                                {cancelled?.changePercent ?? 0}%
                            </span>
                        </p>
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    {DetailsBtn && <DetailsBtn />}
                </div>
            </Card>
        </div>
    )
}