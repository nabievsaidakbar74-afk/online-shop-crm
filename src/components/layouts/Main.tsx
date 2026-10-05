import { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

export default function Main() {
    const isDark = useSelector((state: { theme: { isDark: boolean } }) => state.theme.isDark)
    const [expanded, setExpanded] = useState(true)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark)
    }, [isDark])

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 1024) setMobileOpen(false)
        }
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [])

    return (
        <div className="flex h-dvh overflow-hidden bg-canvas text-ink">
            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Close menu"
                    className="fixed inset-0 z-30 bg-[#0e141c]/45 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}
            <Sidebar
                expanded={expanded}
                setExpanded={setExpanded}
                mobileOpen={mobileOpen}
                onNavigate={() => setMobileOpen(false)}
            />
            <div className="flex min-w-0 flex-1 flex-col">
                <Header onMenu={() => setMobileOpen(true)} />
                <main className="min-h-0 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
