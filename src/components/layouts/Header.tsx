import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import UserImg from "../../assets/svg/userImage.png"
import { actionTheme } from "../../store"
import { useLocation } from "react-router-dom"
import { useUser } from "../../features/auth/user"
import CommandPalette from "./CommandPalette"

const titles: Record<string, string> = {
    "/": "Dashboard",
    "/dashboard": "Dashboard",
    "/orderManagment": "Order Management",
    "/customer": "Customers",
    "/categori": "Categories",
    "/product": "Products",
    "/profile": "Profile",
    "/bprofile": "Profile",
    "/brand": "Brands",
    "/banners": "Banners",
}

function resolveTitle(pathname: string) {
    if (titles[pathname]) return titles[pathname]
    if (pathname.startsWith("/orderManagment/")) return "Order"
    if (pathname.startsWith("/product/")) return "Product"
    if (pathname.startsWith("/categori/")) return "Category"
    return "Dashboard"
}

export default function Header({ onMenu }: { onMenu: () => void }) {
    const { user } = useUser()
    const { pathname } = useLocation()
    const title = resolveTitle(pathname)
    const isDark = useSelector((state: { theme: { isDark: boolean } }) => state.theme.isDark)
    const dispatch = useDispatch()
    const [paletteOpen, setPaletteOpen] = useState(false)

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
                event.preventDefault()
                setPaletteOpen((open) => !open)
            }
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])

    return (
        <>
        <header className="bar-h flex shrink-0 items-center justify-between gap-2 border-b border-line bg-surface px-3 sm:gap-3 sm:px-4 md:px-6">
            <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2">
                <button type="button" onClick={onMenu} className="icon-btn shrink-0 lg:hidden" aria-label="Open menu">
                    <i className="bi bi-list text-lg" />
                </button>
                <h1 className="truncate text-[15px] font-bold tracking-[-0.03em] text-ink sm:text-[17px]">{title}</h1>
            </div>

            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                <button
                    type="button"
                    onClick={() => setPaletteOpen(true)}
                    className="search-field hidden w-[220px] text-left lg:flex xl:w-[260px]"
                >
                    <i className="bi bi-search text-sm text-faint" />
                    <span className="flex-1 text-[13px] text-faint">Search</span>
                    <kbd className="kbd hidden xl:inline-flex">Ctrl K</kbd>
                </button>
                <button
                    type="button"
                    onClick={() => setPaletteOpen(true)}
                    className="icon-btn shrink-0 lg:hidden"
                    aria-label="Search"
                >
                    <i className="bi bi-search" />
                </button>
                <button type="button" className="icon-btn hidden shrink-0 sm:inline-flex" aria-label="Notifications">
                    <i className="bi bi-bell" />
                </button>
                <button
                    type="button"
                    onClick={() => dispatch(actionTheme.toggleTheme())}
                    className={`relative flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition-colors duration-200 ${isDark ? "bg-[#243042]" : "bg-brand-soft"}`}
                    aria-label="Toggle theme"
                >
                    <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200 ${isDark ? "translate-x-6" : "translate-x-0"}`}
                    >
                        <i className={`bi text-xs ${isDark ? "bi-moon-stars-fill text-slate-700" : "bi-sun-fill text-amber-500"}`} />
                    </span>
                </button>
                <img
                    src={user?.avatar || UserImg}
                    alt=""
                    className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-line sm:h-9 sm:w-9"
                />
            </div>
        </header>
        {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} />}
        </>
    )
}
