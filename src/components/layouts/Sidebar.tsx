import type { Dispatch, SetStateAction } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import LOGO from "../../assets/svg/DealPort.svg"
import MARK from "../../assets/svg/DealPortMark.svg"
import UserImg from "../../assets/svg/userImage.png"
import { useUser } from "../../features/auth/user"

const links = [
    { to: "/dashboard", icon: "bi-house-door-fill", label: "Dashboard" },
    { to: "/orderManagment", icon: "bi-cart3", label: "Order Management" },
    { to: "/customer", icon: "bi-people", label: "Customers" },
    { to: "/categori", icon: "bi-intersect", label: "Categories" },
    { to: "/product", icon: "bi-box-seam-fill", label: "Products" },
    { to: "/banners", icon: "bi-card-image", label: "Banner" },
    { to: "/brand", icon: "bi-bookmark-check", label: "Brands" },
    { to: "/profile", icon: "bi-person-fill", label: "Profile" },
]

type SidebarProps = {
    expanded: boolean
    setExpanded: Dispatch<SetStateAction<boolean>>
    mobileOpen: boolean
    onNavigate: () => void
}

export default function Sidebar({ expanded, setExpanded, mobileOpen, onNavigate }: SidebarProps) {
    const { user } = useUser()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const showLabels = expanded || mobileOpen

    const handleLogout = () => {
        localStorage.removeItem("crmAccessToken")
        localStorage.removeItem("crmRefreshToken")
        queryClient.clear()
        navigate("/login", { replace: true })
    }

    return (
        <aside
            className={`
                fixed inset-y-0 left-0 z-40 flex h-dvh w-[248px] flex-col
                border-r border-line bg-surface
                transition-transform duration-200 ease-out
                ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
                lg:static lg:z-auto lg:translate-x-0 lg:shrink-0
                ${expanded ? "lg:w-[248px]" : "lg:w-[76px] sidebar-collapsed"}
            `}
        >
            <div className={`flex items-center px-3 ${showLabels ? "bar-h justify-between" : "flex-col justify-center gap-2 py-4"}`}>
                {showLabels ? (
                    <img src={LOGO} alt="Dealport" className="h-6 w-auto" />
                ) : (
                    <img src={MARK} alt="Dealport" className="h-7 w-7" />
                )}
                <button
                    type="button"
                    onClick={() => {
                        if (window.innerWidth < 1024) onNavigate()
                        else setExpanded((state) => !state)
                    }}
                    className="sidebar-toggle"
                    aria-label={showLabels ? "Collapse sidebar" : "Expand sidebar"}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <rect x="2.2" y="3.2" width="13.6" height="11.6" rx="2.4" stroke="currentColor" strokeWidth="1.4" />
                        <path d="M7 3.6v10.8" stroke="currentColor" strokeWidth="1.4" />
                        <path
                            d={showLabels ? "M12.2 7.1 9.8 9l2.4 1.9" : "M9.8 7.1 12.2 9 9.8 10.9"}
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>

            <p className={`px-5 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-faint ${showLabels ? "" : "text-center px-0"}`}>
                {showLabels ? "Main menu" : "Menu"}
            </p>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-3">
                {links.map((item) => {
                    const active = pathname === item.to
                        || (item.to === "/dashboard" && pathname === "/")
                        || (item.to === "/profile" && (pathname === "/bprofile" || pathname.startsWith("/profile")))
                        || (item.to !== "/dashboard" && item.to !== "/profile" && pathname.startsWith(`${item.to}/`))
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            title={item.label}
                            onClick={onNavigate}
                            className={`navbar-link ${active ? "active" : ""}`}
                        >
                            <div className="nav-pill">
                                <i className={`bi ${item.icon} nav-icon`} />
                                {showLabels && <span className="truncate">{item.label}</span>}
                            </div>
                        </NavLink>
                    )
                })}
            </nav>

            <div className="mt-auto space-y-2 px-3 pb-4">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="nav-pill nav-pill-danger w-full"
                >
                    <i className="bi bi-box-arrow-left nav-icon" />
                    {showLabels && <span>Log out</span>}
                </button>
               
                    <div className="profile-card">
                        <img
                            src={user?.avatar || UserImg}
                            alt=""
                            className="h-9 w-9 shrink-0 rounded-full object-cover"
                        />
                        {showLabels && (
                            <div className="min-w-0 flex-1">
                                <p className="profile-name truncate text-sm font-semibold text-ink">
                                    {user?.firstName} {user?.lastName}
                                </p>
                                <p className="profile-email truncate text-xs text-faint">{user?.email}</p>
                            </div>
                        )}
                    </div>
                
            </div>
        </aside>
    )
}
