import { Route, Routes } from "react-router-dom"
import Login from "../features/auth/pages/Login"
import Dashboard from "../features/dashboard/components/Dashboard"
import OrderManagment from "../features/order/components/OrderManagment"
import Customer from "../features/customers/components/Customer"
import Categori from "../features/categories/components/Categori"
import Profile from "../features/profile/components/Profile"
import NotFound from "../features/notFound/pages/NotFound"
import ProtectedRoute from "./ProtectedRoute"
import CategoriesDetail from "../features/categories/pages/CategoriesDetail"
import Product from "../features/products/components/Product"
import Brand from "../features/brands/components/Brand"
import ProductDetails from "../features/products/pages/ProductDetails"
import Banners from "../features/banners/components/Banners"

export default function IndexRoute() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orderManagment" element={<OrderManagment />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/banners" element={<Banners />} />
        <Route path="/categori" element={<Categori />} />
        <Route path="/categori/:id" element={<CategoriesDetail />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bprofile" element={<Profile />} />
        <Route path="/brand" element={<Brand />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}