import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { resetState } from "../features/product/productSlice";
import { addCategories } from "../features/pcategory/pcategorySlice";
let schema = yup.object().shape({
  title: yup.string().required("Category is required"),
});
const AddCat = () => {
  const dispatch = useDispatch();
  const newCategory = useSelector((state) => state.pcategory);
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(addCategories(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  const { isSuccess, isError, isLoading, pcategories } = newCategory;
  useEffect(() => {
    if (isSuccess && pcategories) {
      toast.success("Category Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  return (
    <div>
      <h3 className="mb-4 title">Add Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit} >
          <CustomInput
            type="text"
            label="Enter Category"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
            id="category"
          />
          <div className="error text-danger">
            {formik.touched.title && formik.errors.title}
          </div>

          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCat;
