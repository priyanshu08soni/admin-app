import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { addColors, resetState } from "../features/color/colorSlice";
let schema = yup.object().shape({
  title: yup.string().required("Color is required"),
});
const AddColor = () => {
  const dispatch = useDispatch();
  const newColor = useSelector((state) => state.color);
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(addColors(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  const { isSuccess, isError, isLoading, colors } = newColor;
  useEffect(() => {
    if (isSuccess && colors) {
      toast.success("Category Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  return (
    <div>
      <h3 className="mb-4 title">Add Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter New Color"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"
          />
          <div className="error text-danger">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            Add Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
