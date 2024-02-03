import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";

import {
  addBlogCategories,
  getaBlogCategory,
  resetState,
  updateBlogCategory,
} from "../features/bcategory/bcategorySlice";
import { useLocation, useNavigate } from "react-router-dom";
let schema = yup.object().shape({
  title: yup.string().required("Category is required"),
});
const AddBlogCat = () => {
  const dispatch = useDispatch();
  const newCategory = useSelector((state) => state.bcategory);
  const location = useLocation();
  const navigate=useNavigate();
  const bCatId = location.pathname.split("/")[3];
  const { isSuccess, isError, isLoading, bcategories, blogCatName ,updatedBlogCategory} =
    newCategory;
  useEffect(() => {
    if (bCatId !== undefined) {
      dispatch(getaBlogCategory(bCatId));
    } else {
      dispatch(resetState());
    }
  }, [bCatId]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (bCatId !== undefined) {
        const data={id:bCatId,bCategory:values}
        dispatch(updateBlogCategory(data));
      } else {
        dispatch(addBlogCategories(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });
  useEffect(() => {
    if (isSuccess && bcategories) {
      toast.success("Blog Category Added Successfullly!");
    }
    if ( updatedBlogCategory && isSuccess) {
      toast.success(" Blog Category updated Successfullly!");
      navigate('/admin/blog-category-list')
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  return (
    <div>
      <h3 className="mb-4 title">Add Blog Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Category"
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
            Add Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCat;
