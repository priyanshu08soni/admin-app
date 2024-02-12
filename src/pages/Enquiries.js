import { React, useEffect, useState } from "react";
import { Table } from "antd";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomModel from "../Components/CustomModel";
import {
  deleteAEnquiry,
  deleteEnquiry,
  getEnquiries,
  updateAEnquiry,
} from "../features/enquiry/enquirySlice";
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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const [open, setOpen] = useState();
  const [enquiryId, setEnquiryId] = useState("");
  const showModel = (e) => {
    setOpen(true);
    setEnquiryId(e);
  };
  const hideModel = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries());
  }, []);
  const enquiryState = useSelector((state) => state.enquiry.enquiries);
  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      status: (
        <>
          <select
            name=""
            defaultValue={enquiryState[i].status ? enquiryState[i].status : "Submitted"}
            className="form-control form-select"
            id=""
            onChange={(e)=>setEnquiryStatus(e.target.value,enquiryState[i]._id)}
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link className="ms-3 fs-4 text-danger" to={`${enquiryState[i]._id}`}>
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-4 text-danger bg-transparent border-0"
            onClick={() => {
              showModel(enquiryState[i]._id);
            }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const setEnquiryStatus=(e,i)=>{
    const data={_id:i,enqData:e}
    dispatch(updateAEnquiry(data));
  }
  const deleteEnquiry = (e) => {
    dispatch(deleteAEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModel
        hideModel={hideModel}
        open={open}
        performAction={() => {
          deleteEnquiry(enquiryId);
        }}
        title="Are You sure you want to delete this enquiry?"
      />
    </div>
  );
};

export default Enquiries;
