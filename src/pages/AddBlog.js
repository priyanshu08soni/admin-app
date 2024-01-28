import { React, useEffect, useState } from "react";
import CustomInput from "../Components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";

import * as yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { resetState } from "../features/product/productSlice";
import { addBlogs, getBlogs } from "../features/blogs/blogSlice";
let schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
});
const AddBlog = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const bCategoryState = useSelector((state) => state.bcategory.bcategories);
  const imgState = useSelector((state) => state.upload.images);
  const newBlog = useSelector((state) => state.blog.blogs);
  const { isSuccess, isError, isLoading, blogs } = newBlog;
  useEffect(() => {
    if (isSuccess && blogs) {
      toast.success("Product Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      URL: i.URL,
    });
  });
  useEffect(() => {
    formik.values.images = img;
  }, [img]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(addBlogs(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Blog</h3>

      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              label="Enter Blog title"
              name="title"
              val={formik.values.title}
              onCh={formik.handleChange("title")}
              onBl={formik.handleBlur("title")}
            />
          </div>
          <div className="error text-danger">
            {formik.touched.title && formik.errors.title}
          </div>
          <select
            className="form-control py-3 mb-3"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            id=""
          >
            <option value="">Select Blog Category</option>
            {bCategoryState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error text-danger">
            {formik.touched.category && formik.errors.category}
          </div>
          <ReactQuill
            theme="snow"
            name="title"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
          <div className="error text-danger">
            {formik.touched.description && formik.errors.description}
          </div>
          <div className="bg-white mt-3 border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n drop sone files here , or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState.map((i, j) => {
              return (
                <div className=" position-relative " key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute  "
                    style={{ top: "5px", right: "5px" }}
                  ></button>
                  <img src={i.URL} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
