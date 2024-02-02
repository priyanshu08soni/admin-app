import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { addCoupons, getCoupons, resetState } from "../features/coupon/couponSlice";
let schema = yup.object().shape({
  name: yup.string().required("Coupon Name is required"),
  expiry: yup.date().required("Date is required"),
  discount: yup.number().required("Discount is required"),
});
const AddCoupon = () => {
  const dispatch = useDispatch();
  const newCoupon = useSelector((state) => state.coupon);
  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(addCoupons(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  const { isSuccess, isError, isLoading, coupons } = newCoupon;
  useEffect(() => {
    if (isSuccess && coupons) {
      toast.success("Coupon Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  return (
    <div>
      <h3 className="mb-4 title">Add Coupon</h3>
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
            Add Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
