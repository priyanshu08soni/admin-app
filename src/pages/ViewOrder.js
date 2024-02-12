import { React, useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {Link, useLocation} from "react-router-dom";
import { getOrderByUser, getOrders } from "../features/auth/authSlice";
import { getProducts } from "../features/product/productSlice";
const columns = [
  {
    title: "S.No.",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const dispatch = useDispatch();
  const location=useLocation();
  const userId=location.pathname.split("/")[3]

  useEffect(() => {
    dispatch(getOrderByUser(userId));
    dispatch(getProducts());
  }, []);
  const orderState = useSelector((state) => state.auth.orderbyuser.products);
 
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i+1,
      name: orderState[i].product.title,
      brand:orderState[i].product.brand,
      count:orderState[i].count,
      color:orderState[i].color,
      mobile: orderState[i].mobile,
      status: (
        <>
          <select className="form-container form-select" name="" id="">
            <option value="">Set Status</option>
          </select>
        </>
      ),
      amount:orderState[i].product.price,
      date:orderState[i].product.createdAt,
      action: (
        <>
          <Link to="/">
            <AiFillDelete className="ms-3 fs-4 text-danger" />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div><Table columns={columns} dataSource={data1} /></div>
    </div>
  )
}

export default ViewOrder;
