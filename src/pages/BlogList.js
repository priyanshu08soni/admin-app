import { React, useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs, resetState } from "../features/blogs/blogSlice";
import { Link } from "react-router-dom";
import CustomModel from "../Components/CustomModel";

const columns = [
  {
    title: "S.No.",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "name",
    sorter:(a,b)=>a.name.length-b.name.length,

  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogList = () => {
  const dispatch = useDispatch();
  const [open,setOpen]=useState();
  const [blogId,setBlogId]=useState("");
  const showModel=(e)=>{
    setOpen(true);
    setBlogId(e);
  };
  const hideModel=()=>{
    setOpen(false);
  }

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);
  const blogState = useSelector((state) => state.blog.blogs);
  const data1 = [];

  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i+1,
      name: blogState[i].title,
      category: blogState[i].category,
      action: (
        <>
          <Link to={`/admin/blog/${blogState[i]._id}`}>
            <BiEdit className="fs-4 " />
          </Link>
          <button className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={()=>{showModel(blogState[i]._id)}}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteABlog=(e)=>{
    dispatch(deleteBlog(e));
    setOpen(false);
    setTimeout(()=>{
      dispatch(getBlogs());
    },100);
  }
  return (
    <div>
      <h3 className="mb-4 title">BlogList</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel 
      hideModel={hideModel} 
      open={open}
      performAction={()=>{deleteABlog(blogId)}} 
      title="Are You sure you want to delete this blog?"  

      />
    </div>
  );
};

export default BlogList;
