import { Card } from 'antd'
import useDashboardKpis from '../hooks/useDashboardKpis'

export default function DashboardKpis({ DetailsBtn }) {
    const { data, isLoading } = useDashboardKpis()

    // Ma'lumotlarni osonroq ishlatish uchun ajratib olamiz
    const kpiData = data?.data || data

    const totalSales = kpiData?.totalSales
    const totalOrders = kpiData?.totalOrders
    const pending = kpiData?.pending
    const cancelled = kpiData?.cancelled

    // Raqamlarni chiroyli formatlash uchun yordamchi funksiya (masalan: 14999000 -> 15M, $15M yoki 14.99M)
    const formatNumber = (num) => {
        if (!num && num !== 0) return '0'
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
        if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
        return num.toLocaleString()
    }

    if (isLoading) {
        return <div className="p-4 text-center">Yuklanmoqda...</div>
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* 1. TOTAL SALES CARD */}
            <Card>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">Total Sales</p>
                        <p className="text-sm text-gray-400 mt-1">Last 7 days</p>
                    </div>
                    <i className="bi bi-three-dots-vertical text-gray-400 cursor-pointer"></i>
                </div>
                <div className="flex items-end gap-3 mt-4">
                    <p className="text-[32px] leading-none font-semibold text-gray-900 dark:text-white">
                        ${formatNumber(totalSales?.value)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        sales{' '}
                        <span className={totalSales?.changePercent >= 0 ? "text-[#21C45D]" : "text-red-500"}>
                            <i className={`bi bi-arrow-${totalSales?.changePercent >= 0 ? 'up' : 'down'}`}></i>{' '}
                            {totalSales?.changePercent ?? 0}%
                        </span>
                    </p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Previous 7 days <span className="text-[#6467F2]">(${formatNumber(totalSales?.previousValue)})</span>
                </p>
                <div className="flex justify-end mt-5">
                    {DetailsBtn && <DetailsBtn />}
                </div>
            </Card>

            {/* 2. TOTAL ORDERS CARD */}
            <Card>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">Total Orders</p>
                        <p className="text-sm text-gray-400 mt-1">Last 7 days</p>
                    </div>
                    <i className="bi bi-three-dots-vertical text-gray-400 cursor-pointer"></i>
                </div>
                <div className="flex items-end gap-3 mt-4">
                    <p className="text-[32px] leading-none font-semibold text-gray-900 dark:text-white">
                        {formatNumber(totalOrders?.value)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        order{' '}
                        <span className={totalOrders?.changePercent >= 0 ? "text-[#21C45D]" : "text-red-500"}>
                            <i className={`bi bi-arrow-${totalOrders?.changePercent >= 0 ? 'up' : 'down'}`}></i>{' '}
                            {totalOrders?.changePercent ?? 0}%
                        </span>
                    </p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Previous 7 days <span className="text-[#6467F2]">({formatNumber(totalOrders?.previousValue)})</span>
                </p>
                <div className="flex justify-end mt-5">
                    {DetailsBtn && <DetailsBtn />}
                </div>
            </Card>

            {/* 3. PENDING & CANCELED CARD */}
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
                            {pending?.orders ?? 0} <span className="text-sm font-normal text-[#4EA674]">user {pending?.users ?? 0}</span>
                        </p>
                    </div>
                    <div className="w-px h-10 bg-gray-200 dark:bg-slate-600"></div>
                    <div>
                        <p className="text-sm text-gray-400 mb-1">Canceled</p>
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