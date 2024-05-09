import { React, useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogCategory, getBlogCategories, resetState } from "../features/bcategory/bcategorySlice";
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
    title:"Action",
    dataIndex:"action",
  },
];

const BlogCategoryList = () => {
  const dispatch = useDispatch();
  const [open,setOpen]=useState();
  const [bCatId,setBCatId]=useState("");
  const showModel=(e)=>{
    setOpen(true);
    setBCatId(e);
  };
  const hideModel=()=>{
    setOpen(false);
  }
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const blogCategoryState=useSelector((state)=>state.bcategory.bcategories);
  const data1 = [];
  for (let i = 0; i <blogCategoryState.length; i++) {
    data1.push({
      key: i+1,
      name:blogCategoryState[i].title,
      action: (
        <>
          <Link to={`/admin/blog-category/${blogCategoryState[i]._id}`}>
            <BiEdit className="fs-4 " />
          </Link>
          <button className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={()=>{showModel(blogCategoryState[i]._id)}}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteABlogCategory=(e)=>{
    dispatch(deleteBlogCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogCategories());
    }, 100);
  }
  return (
    <div>
      <h3 className="mb-4 title">Blog Category List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel 
      hideModel={hideModel} 
      open={open}
      performAction={()=>{deleteABlogCategory(bCatId)}} 
      title="Are You sure you want to delete this Blog Category?"  

      />
    </div>
  );
};

export default BlogCategoryList;
