import { React, useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Link from "antd/es/typography/Link";
import { getOrders } from "../features/auth/authSlice";
const columns = [
  {
    title: "S.No.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
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

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders);
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i+1,
      name: orderState[i].orderby.firstname,
      product:orderState[i].products.map((i,j)=>{
        return (
            <ul key={j} >
              <li>{i.product.title}</li>
            </ul>
        );
      }),
      mobile: orderState[i].mobile,
      status: (
        <>
          <select className="form-container form-select" name="" id="">
            <option value="">Set Status</option>
          </select>
        </>
      ),
      amount:orderState[i].paymentIntent.amount,
      date:new Date(orderState[i].createdAt).toLocaleString(),
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
      <h3 className="mb-4 title">Orders</h3>
      <div><Table columns={columns} dataSource={data1} /></div>
    </div>
  )
}

export default Orders;
