import React from "react";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
const data = [
  {
    type: "1913",
    value: 25,
  },
  {
    type: "1914",
    value: 20,
  },
  {
    type: "1915",
    value: 30,
  },
  {
    type: "1916",
    value: 20,
  },
  {
    type: "1917",
    value: 35,
  },
  {
    type: "1918",
    value: 40,
  },
  {
    type: "1919",
    value: 45,
  },
];
const config = {
  data,
  xField: "type",
  yField: "value",
  color: ({ value }) => {
    if (value === "30") {
      return "#ffd333";
    }
  },
  label: {
    style: {
      fill: "#ffffff",
      opacity: 0.6,
    },
  },
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
  meta: {
    type: {
      alias: "Years",
    },
    value: {
      alias: "Sales in Millions",
    },
  },
};
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
    title: "Status",
    dataIndex: "status",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Priyanshu soni ${i}`,
    product: 32,
    status: `London,Park Lane No. ${i}`,
  });
}
const Dashboard = () => {
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex flex-grow-1 bg-white justify-content-between align-items-end p-3 rounded-3">
          <div>
            <p className="desc" >Total</p>
            <h4 className="mb-0 sub-title">$1000</h4>
          </div>
          <div className="d-flex  flex-column align-items-end">
            <h6 className="green">
              <BsArrowUpRight />
              32%
            </h6>
            <p className="mb-0 desc">Compare To April 2022</p>
          </div>
        </div>
        <div className="d-flex flex-grow-1 bg-white justify-content-between align-items-end p-3 rounded-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1000</h4>
          </div>
          <div className="d-flex  flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight />
              32%
            </h6>
            <p className="mb-0 desc">Compare To April 2022</p>
          </div>
        </div>
        <div className="d-flex flex-grow-1 bg-white justify-content-between align-items-end p-3 rounded-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">$1000</h4>
          </div>
          <div className="d-flex  flex-column align-items-end">
            <h6 className="green">
              <BsArrowUpRight />
              32%
            </h6>
            <p className="mb-0 desc">Compare To April 2022</p>
          </div>
        </div>
      </div>
      <div className="d-flex gap-3 justify-content-between">
      <div className="mt-4 flex-grow-1 w-50">
        <h3 className="mb-5 title">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4 flex-grow-1 w-50">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
