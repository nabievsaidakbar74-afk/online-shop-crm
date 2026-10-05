import BestSellers from "./BestSellers.tsx"
import DashboardCatalog from "./DashboardCatalog.tsx"
import DashboardChart1 from "./DashboardChart1"
import DashboardKpis from "./DashboardKpis.tsx"
import DashboardRealtimeUsers from "./DashboardRealtimeUsers.tsx"
import TopProducts from "./TopProducts.tsx"

function DetailsBtn() {
  return (
    <button type="button" className="btn-quiet ml-auto">
      Details
    </button>
  )
}

export default function Dashboard() {
  return (
    <div className="page-shell space-y-4">
      <DashboardKpis DetailsBtn={DetailsBtn} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <DashboardChart1 />
        </div>
        <DashboardRealtimeUsers />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <BestSellers />
        </div>
        <TopProducts />
      </div>

      <DashboardCatalog />
    </div>
  )
}
