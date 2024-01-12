import {React,useEffect} from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Link from "antd/es/typography/Link";
import { getCategories } from "../features/pcategory/pcategorySlice";

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
  const dispatch = useDispatch();
  useEffect(() => {
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
          <Link to="/">
            <BiEdit className="fs-4 " />
          </Link>
          <Link to="/">
            <AiFillDelete className="ms-3 fs-4 text-danger" />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Category List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default CategoryList;
