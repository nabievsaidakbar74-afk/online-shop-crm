
import { useNavigate } from "react-router-dom"
import OrderNotesUpdate from "./OrderNotesUpdate"

const pageWrap = "page-shell space-y-5"
const card = "surface"

const order = {
  id: "0d7ea43d-235c-403d-9c74-2aaa2d4552f5",
  orderNumber: "ORD-DASH-0010",
  userId: "03641bea-d1df-439a-8141-a6da05e40f10",
  status: "DELIVERED",
  paymentMethod: "CASH_ON_DELIVERY",
  paymentStatus: "UNPAID",
  subtotal: 87996000,
  discount: 0,
  deliveryFee: 25000,
  total: 88021000,
  couponId: null,
  addressSnapshot: {
    city: "Andijon",
    house: "12",
    title: "Home",
    region: "Andijon",
    street: "Mustaqillik",
    district: "Bogishamol",
  },
  customerSnapshot: {
    email: "nilufar@example.com",
    phone: "+998901112266",
    lastName: "Usmonova",
    firstName: "Nilufar",
  },
  notes: null as string | null,
  createdAt: "2026-09-22T10:15:00.000Z",
  updatedAt: "2026-09-22T11:24:00.293Z",
  items: [
    {
      id: "42cd1813-5423-4fb0-94bc-9d5dad907fa9",
      orderId: "0d7ea43d-235c-403d-9c74-2aaa2d4552f5",
      productId: "782c6ed7-2387-42e7-9c50-af3f5de3d626",
      variantId: null,
      productName: "ASUS ROG Zephyrus G14",
      productSku: "ROG-G14",
      productImage: "https://placehold.co/800x800?text=ASUS%20ROG%20Zephyrus%20G14",
      attributes: null,
      price: 21999000,
      quantity: 4,
      total: 87996000,
    },
  ],
  statusHistory: [
    {
      id: "19772a7e-f30a-4adb-90b1-986cf6b70a31",
      orderId: "0d7ea43d-235c-403d-9c74-2aaa2d4552f5",
      status: "DELIVERED",
      comment: "Dashboard demo order",
      changedBy: "SYSTEM",
      adminId: null,
      createdAt: "2026-09-22T11:24:00.293Z",
    },
  ],
  user: {
    id: "03641bea-d1df-439a-8141-a6da05e40f10",
    firstName: "Nilufar",
    lastName: "Usmonova",
    email: "nilufar@example.com",
    phone: "+998901112266",
  },
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
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function SectionTitle({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-9 h-9 shrink-0 rounded-xl bg-[#2E9A62]/10 text-[#2E9A62] flex items-center justify-center">
        <i className={`bi ${icon}`} />
      </span>
      <div>
        <h3 className="font-semibold text-sm text-gray-800 dark:text-white">{title}</h3>
        {subtitle && <p className="text-xs text-gray-400 dark:text-slate-400">{subtitle}</p>}
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-gray-50 last:border-0 dark:border-slate-700/40">
      <span className="text-xs text-gray-400 dark:text-slate-400">{label}</span>
      <span className="text-xs font-medium text-gray-700 dark:text-slate-200 text-right">
        {value === null || value === undefined || value === "" ? "—" : value}
      </span>
    </div>
  )
}

function Stat({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-white/15 px-4 py-2.5 backdrop-blur-sm">
      <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-white/70">
        <i className={`bi ${icon}`} />
        {label}
      </p>
      <p className="text-base font-semibold text-white">{value}</p>
    </div>
  )
}

function statusTone(status: string) {
  const key = status?.toUpperCase()
  if (key === "DELIVERED" || key === "COMPLETED") return "bg-white text-[#1B6B42]"
  if (key === "CANCELLED" || key === "CANCELED") return "bg-rose-100 text-rose-600"
  if (key === "PENDING") return "bg-amber-100 text-amber-700"
  return "bg-white/20 text-white"
}

export default function OrderDetail() {

  const navigate = useNavigate();


  const paid = order.paymentStatus === "PAID"
  const address = [
    order.addressSnapshot.title,
    order.addressSnapshot.street,
    order.addressSnapshot.house,
    order.addressSnapshot.district,
    order.addressSnapshot.city,
    order.addressSnapshot.region,
  ]
    .filter(Boolean)
    .join(", ")

  return (
    <div className={pageWrap}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/orderManagment")}
            className="w-10 h-10 rounded-xl border border-gray-200 bg-white text-gray-600 hover:text-[#2E9A62] hover:border-[#2E9A62]/40 transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
          >
            <i className="bi bi-arrow-left text-lg" />
          </button>
          <div className="text-sm">
            <button
              type="button"
              onClick={() => navigate("/orderManagment")}
              className="text-gray-400 hover:text-[#2E9A62] transition-colors dark:text-slate-400"
            >
              Orders
            </button>
            <span className="text-gray-300 dark:text-slate-600 mx-2">/</span>
            <span className="font-medium text-gray-800 dark:text-white">{order.orderNumber}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-mono text-gray-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
          <i className="bi bi-hash" />
          <span className="truncate max-w-45">{order.id}</span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#2E9A62] to-[#1B6B42] p-6">
        <div className="relative flex flex-wrap items-center justify-between gap-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-white">{order.orderNumber}</h1>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusTone(order.status)}`}>
                <i className="bi bi-truck" />
                {prettyLabel(order.status)}
              </span>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${paid ? "bg-white text-[#1B6B42]" : "bg-rose-100 text-rose-600"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${paid ? "bg-[#2E9A62]" : "bg-rose-500"}`} />
                {prettyLabel(order.paymentStatus)}
              </span>
            </div>
            <p className="mt-2 text-sm text-white/80">
              {prettyLabel(order.paymentMethod)} · {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Stat icon="bi-cash-coin" label="Total" value={formatMoney(order.total)} />
            <Stat icon="bi-box-seam" label="Items" value={order.items.length} />
            <Stat icon="bi-truck" label="Delivery" value={formatMoney(order.deliveryFee)} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        <div className="lg:col-span-2 space-y-5">
          <div className={`${card} p-6`}>
            <div className="pb-4 mb-4 border-b border-gray-100 dark:border-slate-700/60">
              <SectionTitle icon="bi-bag" title="Order items" subtitle={`${order.items.length} ta mahsulot`} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-140">
                <thead>
                  <tr className="text-left text-gray-400">
                    <th className="font-normal pb-3">Product</th>
                    <th className="font-normal pb-3">Price</th>
                    <th className="font-normal pb-3">Qty</th>
                    <th className="font-normal pb-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id} className="border-t border-gray-50 dark:border-slate-700/60">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-12 h-12 rounded-xl object-cover bg-gray-50 dark:bg-slate-700"
                          />
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white">{item.productName}</p>
                            <p className="text-xs text-gray-400">SKU: {item.productSku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-gray-500 dark:text-gray-400">{formatMoney(item.price)}</td>
                      <td className="text-gray-500 dark:text-gray-400">{item.quantity}</td>
                      <td className="text-right font-medium text-gray-800 dark:text-white">{formatMoney(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={`${card} p-6`}>
            <div className="pb-4 mb-4 border-b border-gray-100 dark:border-slate-700/60">
              <SectionTitle icon="bi-clock-history" title="Status history" />
            </div>
            <div className="space-y-4">
              {order.statusHistory.map((item, index) => (
                <div key={item.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2E9A62] mt-1.5" />
                    {index !== order.statusHistory.length - 1 && <span className="w-px flex-1 bg-gray-200 dark:bg-slate-600 mt-1" />}
                  </div>
                  <div className="pb-2">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{prettyLabel(item.status)}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.comment || "—"}</p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      {prettyLabel(item.changedBy)} · {formatDate(item.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className={`${card} p-5`}>
            <SectionTitle icon="bi-person" title="Customer" />
            <div className="mt-4">
              <InfoRow label="Name" value={`${order.customerSnapshot.firstName} ${order.customerSnapshot.lastName}`} />
              <InfoRow label="Email" value={order.customerSnapshot.email} />
              <InfoRow label="Phone" value={order.customerSnapshot.phone} />
            </div>
          </div>

          <div className={`${card} p-5`}>
            <SectionTitle icon="bi-geo-alt" title="Delivery address" subtitle={order.addressSnapshot.title} />
            <p className="mt-4 text-sm text-gray-700 dark:text-slate-200 leading-6">{address}</p>
          </div>

          <div className={`${card} p-5`}>
            <SectionTitle icon="bi-receipt" title="Payment" />
            <div className="mt-4">
              <InfoRow label="Method" value={prettyLabel(order.paymentMethod)} />
              <InfoRow label="Status" value={prettyLabel(order.paymentStatus)} />
              <InfoRow label="Subtotal" value={formatMoney(order.subtotal)} />
              <InfoRow label="Discount" value={formatMoney(order.discount)} />
              <InfoRow label="Delivery" value={formatMoney(order.deliveryFee)} />
              <InfoRow label="Coupon" value={order.couponId} />
              <div className="flex items-center justify-between gap-3 pt-3">
                <span className="text-sm font-medium text-gray-800 dark:text-white">Total</span>
                <span className="text-sm font-semibold text-[#2E9A62]">{formatMoney(order.total)}</span>
              </div>
            </div>
          </div>

          {/* <div className={`${card} p-5`}>
            <SectionTitle icon="bi-chat-left-text" title="Notes" />
            <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">{order.notes || "Izoh yo'q"}</p>
          </div> */}

          <OrderNotesUpdate SectionTitle={SectionTitle} />

        </div>
      </div>
    </div>
  )
}
