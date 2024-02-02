import {React,useEffect, useState} from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {  deletePcategory, getCategories, resetState } from "../features/pcategory/pcategorySlice";
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

const CategoryList = () => {
  const [open,setOpen]=useState(false);
  const [categoryId,setCategoryId]=useState("");
  const showModel=(e)=>{
    setOpen(true);
    setCategoryId(e);
  }
  const hideModel=()=>{
    setOpen(false);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);
  // state.pcategory.pcategories = state go to store to get reducer to go to slice.
  const pCategoryState=useSelector((state)=>state.pcategory.pcategories)
  const data1 = [];
  for (let i = 0; i < pCategoryState.length; i++) {
    data1.push({
      key: i+1,
      name: pCategoryState[i].title,
      action: (
        <>
          <Link to={`/admin/category/${pCategoryState[i]._id}`}>
            <BiEdit className="fs-4 " />
          </Link>
          <button className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={()=>{showModel(pCategoryState[i]._id)}}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteCategory=(e)=>{
    dispatch(deletePcategory(e));
    setOpen(false);
    setTimeout(()=>{
      dispatch(getCategories())
    },100)
  }
  return (
    <div>
      <h3 className="mb-4 title">Category List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel 
      hideModel={hideModel} 
      open={open}
      performAction={()=>{deleteCategory(categoryId)}} 
      title="Are You sure you want to delete this Product category?"  

      />
    </div>
  );
};

export default CategoryList;
