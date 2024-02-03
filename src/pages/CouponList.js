import {React,useEffect, useState} from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { deleteCoupon, getCoupons, resetState } from "../features/coupon/couponSlice";
import CustomModel from "../Components/CustomModel";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "S.No.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter:(a,b)=>a.name.length-b.name.length,
},
{
    title: "Discount",
    dataIndex: "discount",
    sorter:(a,b)=>a.discount-b.discount
},
{
    title: "Expiry Date",
    dataIndex: "expiry",
},
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CouponList = () => {
  const [open,setOpen]=useState();
  const [couponId,setCouponId]=useState("");
  
  const showModel=(e)=>{
    setOpen(true);
    setCouponId(e);
  };
  const hideModel=()=>{
    setOpen(false);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
  }, []);
  const couponState=useSelector((state)=>state.coupon.coupons);
  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i+1,
      name: couponState[i].name,
      discount: couponState[i].discount,
      expiry: new Date(couponState[i].expiry).toLocaleString(),
      action: (
        <>
          <Link to={`/admin/coupon/${couponState[i]._id}`}>
            <BiEdit className="fs-4 " />
          </Link>
          <button className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={()=>{showModel(couponState[i]._id)}}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteACoupon=(e)=>{
    dispatch(deleteCoupon(e));
    setOpen(false);
    setTimeout(()=>{
      dispatch(getCoupons());
    },100);
  }
  return (
    <div>
      <h3 className="mb-4 title">Coupon List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel 
      hideModel={hideModel} 
      open={open}
      performAction={()=>{deleteACoupon(couponId)}} 
      title="Are You sure you want to delete this coupon?"  

      />
    </div>
  );
};

export default CouponList;
