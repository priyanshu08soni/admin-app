import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/Resetpassword";
import ForgotPassword from "./pages/Forgotpassword";
import Login from "./pages/Login";
import MainLayout from "./Components/MainLayout";
import Enquiries from "./pages/Enquiries";
import BlogList from "./pages/BlogList";
import BlogCategoryList from "./pages/BlogCategoryList";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import ColorList from "./pages/ColorList";
import CategoryList from "./pages/CategoryList";
import ProductList from "./pages/ProductList";
import BrandList from "./pages/BrandList";
import AddBlog from "./pages/AddBlog";
import AddBlogCat from "./pages/AddBlogCat";
import AddColor from "./pages/AddColor";
import AddCat from "./pages/AddCat";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";
import CouponList from "./pages/CouponList";
import AddCoupon from "./pages/AddCoupon";
import ViewEnq from "./pages/ViewEnq";
import ViewOrder from "./pages/ViewOrder";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="enquiries" element={<Enquiries />}></Route>
          <Route path="enquiries/:id" element={<ViewEnq />}></Route>
          <Route path="customers" element={<Customers />}></Route>
          <Route path="orders" element={<Orders />}></Route>
          <Route path="orders/:id" element={<ViewOrder />}></Route>
          <Route path="blog" element={<AddBlog />}></Route>
          <Route path="blog/:id" element={<AddBlog />}></Route>
          <Route path="coupon-list" element={<CouponList />}></Route>
          <Route path="coupon" element={<AddCoupon />}></Route>
          <Route path="coupon/:id" element={<AddCoupon />}></Route>
          <Route path="blog-category" element={<AddBlogCat />}></Route>
          <Route path="blog-category/:id" element={<AddBlogCat />}></Route>
          <Route path="blog-list" element={<BlogList />}></Route>
          <Route path="blog-category-list" element={<BlogCategoryList />}></Route>
          <Route path="color" element={<AddColor />}></Route>
          <Route path="color/:id" element={<AddColor />}></Route>
          <Route path="color-list" element={<ColorList />}></Route>
          <Route path="category" element={<AddCat />}></Route>
          <Route path="category/:id" element={<AddCat />}></Route>
          <Route path="category-list" element={<CategoryList />}></Route>
          <Route path="product-list" element={<ProductList />}></Route>
          <Route path="product" element={<AddProduct />}></Route>
          <Route path="brand" element={<AddBrand />}></Route>
          <Route path="brand/:id" element={<AddBrand />}></Route>
          <Route path="brand-list" element={<BrandList />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
