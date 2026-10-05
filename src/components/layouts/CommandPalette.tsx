import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

type PaletteItem = {
  id: string
  label: string
  hint: string
  icon: string
  to: string
  group: "Pages" | "Create"
}

const items: PaletteItem[] = [
  { id: "dashboard", label: "Dashboard", hint: "Overview", icon: "bi-grid-1x2", to: "/dashboard", group: "Pages" },
  { id: "orders", label: "Order Management", hint: "Orders", icon: "bi-cart3", to: "/orderManagment", group: "Pages" },
  { id: "customers", label: "Customers", hint: "Users", icon: "bi-people", to: "/customer", group: "Pages" },
  { id: "categories", label: "Categories", hint: "Catalog", icon: "bi-intersect", to: "/categori", group: "Pages" },
  { id: "products", label: "Products", hint: "Catalog", icon: "bi-box-seam", to: "/product", group: "Pages" },
  { id: "banner", label: "Banner", hint: "Marketing", icon: "bi-card-image", to: "/banners", group: "Pages" },
  { id: "brands", label: "Brands", hint: "Catalog", icon: "bi-bookmark", to: "/brand", group: "Pages" },
  { id: "profile", label: "Profile", hint: "Account", icon: "bi-person", to: "/profile", group: "Pages" },
  { id: "add-product", label: "Add Product", hint: "Create", icon: "bi-plus-circle", to: "/product?create=1", group: "Create" },
  { id: "add-category", label: "Add Category", hint: "Create", icon: "bi-plus-circle", to: "/categori?create=1", group: "Create" },
  { id: "add-brand", label: "Add Brand", hint: "Create", icon: "bi-plus-circle", to: "/brand?create=1", group: "Create" },
  { id: "add-banner", label: "Add Banner", hint: "Create", icon: "bi-plus-circle", to: "/banners?create=1", group: "Create" },
]

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return items
    return items.filter((item) =>
      item.label.toLowerCase().includes(needle) || item.hint.toLowerCase().includes(needle)
    )
  }, [query])

  useEffect(() => {
    if (!open) return
    setQuery("")
    setActive(0)
    const frame = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(frame)
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === "ArrowDown") {
        event.preventDefault()
        setActive((index) => (results.length ? (index + 1) % results.length : 0))
      }
      if (event.key === "ArrowUp") {
        event.preventDefault()
        setActive((index) => (results.length ? (index - 1 + results.length) % results.length : 0))
      }
      if (event.key === "Enter" && results[active]) {
        event.preventDefault()
        navigate(results[active].to)
        onClose()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, results, active, navigate, onClose])

  if (!open) return null

  const groups: Array<"Pages" | "Create"> = ["Pages", "Create"]

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]">
      <button type="button" aria-label="Close search" className="absolute inset-0 bg-[#0c100e]/55" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="relative w-full max-w-[460px] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
      >
        <label className="flex items-center gap-3 border-b border-line px-4">
          <i className="bi bi-search text-faint" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Sahifa yoki create qidiring..."
            className="h-12 w-full border-0 bg-transparent text-sm text-ink outline-none placeholder:text-faint"
          />
          <kbd className="kbd">esc</kbd>
        </label>

        <div className="rail max-h-[380px] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-faint">Hech narsa topilmadi</p>
          ) : (
            groups.map((group) => {
              const groupItems = results.filter((item) => item.group === group)
              if (!groupItems.length) return null
              return (
                <div key={group} className="mb-1">
                  <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
                    {group}
                  </p>
                  {groupItems.map((item) => {
                    const index = results.indexOf(item)
                    const selected = index === active
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setActive(index)}
                        onClick={() => {
                          navigate(item.to)
                          onClose()
                        }}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                          selected ? "bg-brand text-white" : "text-ink hover:bg-brand-soft"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                            selected ? "bg-white/20 text-white" : "bg-brand-soft text-brand"
                          }`}
                        >
                          <i className={`bi ${item.icon}`} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold">{item.label}</span>
                          <span className={`block text-xs ${selected ? "text-white/75" : "text-faint"}`}>{item.hint}</span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
