import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import OAuthSuccessPage from "../pages/auth/OAuthSuccessPage";
import AdminDashboard from "../pages/admin/Dashboard";
import UserListPage from "../pages/admin/UserListPage";
import AdminVoucherList from "../pages/admin/AdminVoucherList";

import HomePage from "../pages/Home/HomePage";

// import ProductListPage from "../pages/ProductList/ProductListPage";
// import CartPage from "../pages/Cart/CartPage";
// import LoginPage from "../pages/Auth/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/oauth-success" element={<OAuthSuccessPage />} />
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} /> */}
      </Route>

      {/* Route admin riêng biệt */}
      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="users" element={<UserListPage />} />
        <Route path="vouchers" element={<AdminVoucherList />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
