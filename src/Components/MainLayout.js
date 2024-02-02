import React, { useState } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import {RiCouponLine} from "react-icons/ri"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useNavigate, Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import { SiBrandfolder } from "react-icons/si";
import { IoIosNotifications } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { Layout, Menu, theme } from "antd";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { Link } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
      // onContextMenu={(e)=>e.preventDefault()}
    >
      <Sider collapsible collapsed={collapsed} trigger={null}>
        <div className="logo d-flex justify-content-center align-items-center">
          <h2 className="text-white fs-5 mb-0">
            <span className="sm-logo">D</span>
            <span className="lg-logo">Developers</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          mode="inline"
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category",
                },
                {
                  key: "category-list",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand",
                },
                {
                  key: "brand-list",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand List",
                },
                {
                  key: "color",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Color",
                },
                {
                  key: "color-list",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Color List",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders",
            },
            {
              key: "marketing",
              icon: <RiCouponLine className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Coupon",
                },
                {
                  key: "coupon-list",
                  icon: <RiCouponLine className="fs-4" />,
                  label: "Coupon List",
                },
              ],
            },
            {
              key: "blogs",
              icon: <FaBloggerB className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <FaClipboardList className="fs-4" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog Cagegory",
                },
                {
                  key: "blog-category-list",
                  icon: <FaClipboardList className="fs-4" />,
                  label: "Blog Cagegory List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <FaClipboardList className="fs-4" />,
              label: "Enquiries",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-1 pe-4"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-3" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute ">
                3
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center dropdown">
              <div className="d-flex" style={{ height: "40px", width: "40px" }}>
                <img
                  className="img-fluid"
                  style={{ height: "40px", width: "40px" }}
                  src="\p.jpg"
                  alt=""
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Priyanshu Soni</h5>
                <p className="mb-0">priyanshus20k4@gmail.com</p>
              </div>
              <div
                className="dropdown-menu "
                aria-labelledby="dropdownMenuLink"
              >
                <li style={{ listStyle: "none" }}>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li style={{ listStyle: "none" }}>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    SignOut
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 200,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
            padding: "0px",
          }}
        ></Footer>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
