import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

export default function Main() {
    const isDark = useSelector((state) => state.theme.isDark)
    const [open, setOpen] = useState(true)
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDark])
    return (
        <div className="flex min-h-screen w-full overflow-x-hidden bg-white text-gray-900 dark:bg-slate-900 dark:text-white">
            <Sidebar open={open} setOpen={setOpen} />
            <div className='flex-1 flex flex-col min-w-0'>
                <Header />
                <main className='flex-1'>
                    <Outlet></Outlet>
                </main>
            </div>
        </div>
    )
}
