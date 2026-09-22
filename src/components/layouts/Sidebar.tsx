import { NavLink, useNavigate } from "react-router-dom"
import LOGO from "../../assets/svg/DealPort.svg"
import UserImg from "../../assets/svg/userImage.png"
import { useUser } from "../../features/auth/contexts/UserContext"

export default function Sidebar({ open, setOpen }) {
    const { user }: any = useUser()

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("crmAccessToken")
        localStorage.removeItem("crmRefreshToken")
        navigate("/login")
    }




    return (
        <div className={`
            ${open ? "w-3xs" : "w-18"}
            bg-white dark:bg-slate-800 h-screen
            shadow-[0px_0px_13px_#ccc] z-10 dark:shadow-none
            p-5 transition-all duration-280
            flex flex-col
          `}>

            <div className={`flex justify-between ${!open && "justify-center items-center"}`}>
                {

                    open && <img src={LOGO} alt="" />
                }
                {
                    open ? <i onClick={() => setOpen(state => !state)} className="bi bi-caret-left-square cursor-pointer"></i>
                        : <i onClick={() => setOpen(state => !state)} className="bi bi-caret-right-square cursor-pointer"></i>
                }
            </div>
            {
                open ? <p className="m-[10px_0px] text-[rgba(106,113,127,1)]">Main menu</p> : <p className={`m-[10px_0px] text-[rgba(106,113,127,1)] ${!open && "m-[0px_auto]"}`}>Main</p>
            }
            <div>
                <NavLink className="navbar-link" to="/dashboard">
                    <div className={` text-[rgba(106,113,127,1)] ${!open && "justify-center items-center"}text-[rgba(106,113,127,1)] w-full flex gap-3 p-[9px_16px] rounded-md border-0 transition-all duration-200 hover:bg-[#daffeb] dark:hover:bg-[#1e422f] `}>
                        <i className="bi bi-house-door-fill"></i>
                        {
                            open && <p>Dashboard</p>
                        }
                    </div>
                </NavLink>
                <NavLink className="navbar-link" to="/orderManagment">
                    <div className={` text-[rgba(106,113,127,1)] ${!open && "justify-center items-center"}text-[rgba(106,113,127,1)] w-full flex gap-3 p-[9px_16px] rounded-md border-0 transition-all duration-200 hover:bg-[#daffeb] dark:hover:bg-[#1e422f] `}>
                        <i className="bi bi-cart3"></i>
                        {
                            open && <p>Order Management</p>
                        }
                    </div>
                </NavLink>
                <NavLink className="navbar-link" to="/customer">
                    <div className={` text-[rgba(106,113,127,1)] ${!open && "justify-center items-center"}text-[rgba(106,113,127,1)] w-full flex gap-3 p-[9px_16px] rounded-md border-0 transition-all duration-200  hover:bg-[#daffeb] dark:hover:bg-[#1e422f] `}>
                        <i className="bi bi-people"></i>
                        {
                            open && <p>Customers</p>
                        }
                    </div>
                </NavLink>
                <NavLink className="navbar-link" to="/banners">
                    <div className={` text-[rgba(106,113,127,1)] ${!open && "justify-center items-center"}text-[rgba(106,113,127,1)] w-full flex gap-3 p-[9px_16px] rounded-md border-0 transition-all duration-200  hover:bg-[#daffeb] dark:hover:bg-[#1e422f] `}>
                        <i className="bi bi-card-image"></i>
                        {
                            open && <p>Banners</p>
                        }
                    </div>
                </NavLink>
                <NavLink className="navbar-link" to="/categori">
                    <div className={` text-[rgba(106,113,127,1)] ${!open && "justify-center items-center"}text-[rgba(106,113,127,1)] w-full flex gap-3 p-[9px_16px] rounded-md border-0 transition-all duration-200  hover:bg-[#daffeb] dark:hover:bg-[#1e422f] `}>
                        <i className="bi bi-intersect"></i>
                        {
                            open && <p>Categories</p>
                        }
                    </div>
                </NavLink>
                <NavLink className="navbar-link" to="/product">
                    <div className={` text-[rgba(106,113,127,1)] ${!open && "justify-center items-center"}text-[rgba(106,113,127,1)] w-full flex gap-3 p-[9px_16px] rounded-md border-0 transition-all duration-200  hover:bg-[#daffeb] dark:hover:bg-[#1e422f] `}>
                        <i className="bi bi-box-seam-fill"></i>
                        {
                            open && <p>Products</p>
                        }
                    </div>
                </NavLink>
                <NavLink className="navbar-link" to="/brand">
                    <div className={` text-[rgba(106,113,127,1)] ${!open && "justify-center items-center"}text-[rgba(106,113,127,1)] w-full flex gap-3 p-[9px_16px] rounded-md border-0 transition-all duration-200  hover:bg-[#daffeb] dark:hover:bg-[#1e422f] `}>
                        <i className="bi bi-bookmark-check"></i>
                        {
                            open && <p>Brands</p>
                        }
                    </div>
                </NavLink>
                <NavLink className="navbar-link" to="/profile">
                    <div className={` text-[rgba(106,113,127,1)] ${!open && "justify-center items-center"}text-[rgba(106,113,127,1)] w-full flex gap-3 p-[9px_16px] rounded-md border-0 transition-all duration-200  hover:bg-[#daffeb] dark:hover:bg-[#1e422f] `}>
                        <i className="bi bi-person-fill"></i>
                        {
                            open && <p>Profile</p>
                        }
                    </div>
                </NavLink>
            </div>
            <button
                type="button"
                onClick={handleLogout}
                className={`mt-auto w-full flex gap-3 p-[9px_16px] rounded-md border-0 cursor-pointer transition-all duration-200 text-[#dc2626] hover:bg-red-50 dark:hover:bg-red-950/40 ${!open && "justify-center items-center"}`}
            >
                <i className="bi bi-box-arrow-left"></i>
                {open && <p>Log out</p>}
            </button>
            <NavLink className="navbar-link" to="/bprofile">
                <div className={`w-full flex items-center gap-3 p-2 rounded-xl border border-gray-100 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/50 hover:bg-[#daffeb] dark:hover:bg-[#1e422f] transition-all duration-200 ${!open && "justify-center border-0 bg-transparent p-1"}`}>
                    <img src={user ? user?.avatar : UserImg} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                    {open && (
                        <div className="min-w-0 flex-1">
                            <p className="profile-name text-sm font-semibold text-gray-800 dark:text-white truncate">{user?.firstName} {user?.lastName}</p>
                            <p className="profile-email text-xs text-gray-400 truncate">{user?.email}</p>
                        </div>
                    )}
                </div>
            </NavLink>
        </div>
    )
}
