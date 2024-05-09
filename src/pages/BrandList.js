import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteABrand, getBrands, resetState } from "../features/brand/brandSlice";
import { Link } from "react-router-dom";
import CustomModel from "../Components/CustomModel";
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
    title: "Action",
    dataIndex: "action",
  },
];

const BrandList = () => {
  const [open,setOpen]=useState();
  const [brandId,setBrandId]=useState("");
  const showModel=(e)=>{
    setOpen(true);
    setBrandId(e);
  };
  const hideModel=()=>{
    setOpen(false);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // state.pcategory.pcategories = state go to store to get reducer to go to slice.

  const brandState = useSelector((state) => state.brand.brands);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      name: brandState[i].title,
      action: (
        <>
          <Link className="fs-4 " to={`/admin/brand/${brandState[i]._id}`}>
            <BiEdit  />
          </Link>
          <button className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={()=>{showModel(brandState[i]._id)}}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteBrand=(e)=>{
    dispatch(deleteABrand(e));
    setOpen(false);
    setTimeout(()=>{
      dispatch(getBrands())
    },100)
  }
  return (
    <div>
      <h3 className="mb-4 title">Brand List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel 
      hideModel={hideModel} 
      open={open}
      performAction={()=>{deleteBrand(brandId)}} 
      title="Are You sure you want to delete this brand?"  

      />
    </div>
  );
};

export default BrandList;
