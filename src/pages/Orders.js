import { React, useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { getOrders, updateOrder } from "../features/auth/authSlice";
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
    title: "Payment Intent",
    dataIndex: "payint",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const orderState = useSelector((state) => state.auth.orders);
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i+1,
      name: orderState[i].user.firstname,
      product:(
        <Link to={`/admin/orders/${orderState[i]._id}`} >
          View Orders
        </Link>
      ),
      mobile: orderState[i].mobile,
      status: (
        <>
          <select className="form-container form-select" name="" id="">
            <option value="">Set Status</option>
          </select>
        </>
      ),
      amount:orderState[i].totalPrice,
      payint:orderState[i].orderStatus,
      date:new Date(orderState[i].createdAt).toLocaleString(),
      action: (
        <>
          <select name="" defaultValue={orderState[i]?.orderStatus} className="form-control form-select" 
            onChange={(e)=>updatedorderstatus(orderState[i]._id, e.target.value)}
          id="">
            <option value="Processing">Processed</option>
            <option value="Cash on Delivery">Cash on Delivery</option>

            <option value="Dispatched">Shipped</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Delivered">Delivered</option>
          </select>
        </>
      ),
    });
  }
  const updatedorderstatus=(a,b)=>{
    dispatch(updateOrder({id:a,status:b}));
  }
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div><Table columns={columns} dataSource={data1} /></div>
    </div>
  )
}

export default Orders;
