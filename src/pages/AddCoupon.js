import React, { useEffect, useState } from "react";
import CustomInput from "../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { addCoupons, getCoupon, resetState, updateCoupon } from "../features/coupon/couponSlice";
import { useLocation ,useNavigate} from "react-router-dom";
let schema = yup.object().shape({
  name: yup.string().required("Coupon Name is required"),
  expiry: yup.date().required("Date is required"),
  discount: yup.number().required("Discount is required"),
});
const AddCoupon = () => {
  const dispatch = useDispatch();
  const newCoupon = useSelector((state) => state.coupon);
  const location=useLocation();
  const navigate=useNavigate();
  const couponId=location.pathname.split("/")[3];
  const { 
    isSuccess, 
    isError, 
    isLoading, 
    coupons,
    couponName,
    couponExpiry,
    couponDiscount,
    updatedCoupon
  } = newCoupon;
  const changeDateFormet = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month,day,year] = newDate.split("/");
    return [year,month,day].join("-");
  };

  
  useEffect(()=>{
    if(couponId!==undefined){
      dispatch(getCoupon(couponId));
    }else{
      dispatch(resetState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[couponId]);
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      name:couponName || "",
      expiry: changeDateFormet(couponExpiry) || "",
      discount: couponDiscount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(couponId!==undefined){
        const data={id:couponId,couponData:values};
        dispatch(updateCoupon(data));
        dispatch(resetState());
      }else{
        dispatch(addCoupons(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  useEffect(() => {
    if (isSuccess && coupons) {
      toast.success("Coupon Added Successfullly!");
    }
    if (updatedCoupon && isSuccess){
      toast.success("Coupon Updated Successfully")
      navigate('/admin/coupon-list')
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, isLoading]);
  return (
    <div>
      <h3 className="mb-4 title">{couponId!==undefined?"Edit":"Add"} Coupon</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Coupon Name"
            name="name"
            onCh={formik.handleChange("name")}
            onBl={formik.handleBlur("name")}
            val={formik.values.name}
            id="name"
          />
          <div className="error text-danger">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            label="Enter Expiry Date"
            name="expiry"
            onCh={formik.handleChange("expiry")}
            onBl={formik.handleBlur("expiry")}
            val={formik.values.expiry}
            id="expiry"
          />
          <div className="error text-danger">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          
          <CustomInput
            type="number"
            label="Enter % Discount"
            name="discount"
            onCh={formik.handleChange("discount")}
            onBl={formik.handleBlur("discount")}
            val={formik.values.discount}
            id="discount"
          />
          <div className="error text-danger">
            {formik.touched.discount && formik.errors.discount}
          </div>
          
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {couponId!==undefined?"Edit":"Add"} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
