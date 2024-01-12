import { React, useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Link from "antd/es/typography/Link";
import { getBlogs } from "../features/blogs/blogSlice";
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
];

const BlogList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);
  const blogState = useSelector((state) => state.blog.blogs);
  const data1 = [];

  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i+1,
      name: blogState[i].title,
      category: blogState[i].category,
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">BlogList</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default BlogList;
