import {React,useEffect, useState} from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAColor, deleteColor, getColors, getaColor, resetState } from "../features/color/colorSlice";
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

const ColorList = () => {
  const [open,setOpen]=useState();
  const [colorId,setColorId]=useState("");
  const showModel=(e)=>{
    setOpen(true);
    setColorId(e);
  }  
  const hideModel=()=>{
    setOpen(false);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, []);
  const colorState=useSelector((state)=>state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i+1,
      name: colorState[i].title,
      action: (
        <>
          <Link to={`/admin/color/${colorState[i]._id}`}>
            <BiEdit className="fs-4 " />
          </Link>
          <button className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={()=>{showModel(colorState[i]._id)}}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteAColor=(e)=>{
    dispatch(deleteColor(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  }
  return (
    <div>
      <h3 className="mb-4 title">Color List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel 
      hideModel={hideModel} 
      open={open}
      performAction={()=>{deleteAColor(colorId)}} 
      title="Are You sure you want to delete this Color?"  

      />
    </div>
  );
};

export default ColorList;
