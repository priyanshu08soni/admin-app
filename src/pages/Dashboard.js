import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthWiseOrderIncome,
  getMonthlyOrders,
  getOrders,
  getYearlyOrders,
} from "../features/auth/authSlice";

const Dashboard = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [orderData,setOrderData]=useState([]);
  const config2 = {
    data: monthlySales,
    xField: "type",
    yField: "sales",
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
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };
  const config = {
    data: monthlyData,
    xField: "type",
    yField: "income",
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
        alias: "Month",
      },
      income: {
        alias: "Income",
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
      title: "Product Count",
      dataIndex: "product",
    },
    {
      title: "Total Price",
      dataIndex: "price",
    },
    {
      title: "Total Price After Discount",
      dataIndex: "dprice",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  const dispatch = useDispatch();
  const monthlyDataState = useSelector(
    (state) => state?.auth?.monthlyOrdersData
  );
  const yearlyDataState = useSelector(
    (state) => state?.auth?.yearlyOrdersData
  );
  let amnt;
  let cnt;
  for (let index = 0; index < yearlyDataState?.length; index++) {
    const element = yearlyDataState[index];
    amnt=element.amount;
    cnt=element.count;
    
  }
  const orderState=useSelector(state=>state?.auth?.orders);

  useEffect(() => {
    dispatch(getMonthlyOrders());
    dispatch(getYearlyOrders());
    dispatch(getOrders());
  }, []);
  useEffect(() => {
    let data = [];
    let salesCount = [];
    let month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({ type: month[element?._id?.month], income: element?.amount });
      salesCount.push({
        type: month[element?._id?.month],
        sales: element?.count,
      });
    }
    setMonthlyData(data);
    setMonthlySales(salesCount);

    const data1=[];
    for(let i = 0;i<orderState?.length;i++){
      data1.push({
        key:i,
        name:orderState[i]?.user?.firstname + ' ' + orderState[i]?.user?.lastname,
        product:orderState[i]?.orderItems?.length,
        price:orderState[i]?.totalPrice,
        dprice:orderState[i]?.totalPriceAfterDiscount,
        status:orderState[i]?.orderStatus,
      })
    }
    setOrderData(data1);
  }, [orderState]);
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex flex-grow-1 bg-white justify-content-between align-items-end p-3 rounded-3 w-50">
          <div>
            <p className="desc">Total Income</p>
            <h4 className="mb-0 sub-title">${amnt}</h4>
          </div>
          <div className="d-flex  flex-column align-items-end">
            <p className="mb-0 desc">Last Year Income</p>
          </div>
        </div>
        <div className="d-flex flex-grow-1 bg-white justify-content-between align-items-end p-3 rounded-3 w-50">
          <div>
            <p className="desc">Total Sales</p>
            <h4 className="mb-0 sub-title">{cnt}</h4>
          </div>
          <div className="d-flex  flex-column align-items-end">
            <p className="mb-0 desc">Last Year Sales</p>
          </div>
        </div>
      </div>
      <div className="d-flex gap-3 justify-content-between">
        <div className="mt-4 flex-grow-1 w-25">
          <h3 className="mb-5 ms-3 title">Income Statics</h3>
          <div>
            {
              monthlyData &&
              <Column {...config} />
            }
          </div>
        </div>
        <div className="mt-4 flex-grow-1 w-25">
          <h3 className="mb-5 ms-3 title">Sales Statics</h3>
          <div>
            {
              monthlySales && <Column {...config2} />
            }
          </div>
        </div>
      </div>
        <div className="mt-4 flex-grow-1">
          <h3 className="mb-5 title">Recent Orders</h3>
          <div>
            {
              orderState && 
            <Table columns={columns} dataSource={orderData} />
            }
          </div>
        </div>
    </div>
  );
};

export default Dashboard;
