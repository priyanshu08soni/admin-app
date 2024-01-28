import { React, useEffect, useState } from "react";
import CustomInput from "../Components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Select } from "antd";
import * as yup from "yup";
import {toast} from "react-toastify"
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import "react-widgets/styles.css";
import Dropzone from "react-dropzone";
import { createProducts, resetState } from "../features/product/productSlice";
let schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required"),
  brand: yup.string().required("Brand is required"),
  category: yup.string().required("Category is required"),
  tags:yup.string().required("Tag is Required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quantity: yup.number().required("Quantity is required"),
});
//use state gets filled attributes of the form to assigned for further info.
const AddProduct = () => {
  const dispatch = useDispatch();
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);
  
  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector((state) => state.pcategory.pcategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct=useSelector((state)=>state.product.products);
  const {isSuccess,isError,isLoading,createdProduct}=newProduct;
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const colors = [];
  colorState.forEach((i) => {
    colors.push({
      label: i.title,
      value: i._id,
    });
  });
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      URL: i.URL,
    });
  });
  useEffect(()=>{
    formik.values.color = color?color:" ";
    formik.values.images = img;
  },[color,img]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags:"",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  const handleColors=(e)=>{
    setColor(e);
    console.log(color);
  }
  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          action=""
          className="d-flex gap-3 flex-column "
        >
          <CustomInput
            type="text"
            label="Enter Product title"
            name="title"
            val={formik.values.title}
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
          />
          <div className="error text-danger">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="mb-3">
            <ReactQuill
              theme="snow"
              name="title"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
            <div className="error text-danger">
              {formik.touched.description && formik.errors.description}
            </div>
          </div>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            val={formik.values.price}
            onCh={formik.handleChange("price")}
            onBl={formik.handleBlur("price")}
          />
          <div className="error text-danger">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            className="form-control py-3 mb-3"
            name="brand"
            value={formik.values.brand}
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            id=""
          >
            <option value="">Select Product Brand</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error text-danger">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            className="form-control py-3 mb-3"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            id=""
          >
            <option value="">Select Product Category</option>
            {categoryState.map((i, j) => {
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
          <select name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id="">
              <option value="" disabled >
                Select Category
              </option>
              <option value="featured">Featured</option>
              <option value="popular">Popular</option>
              <option value="special">Special</option>
            </select>
            <div className="error">
              {formik.touched.tags && formik.errors.tags}
            </div>
            <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={colors}
          />
          <div className="error text-danger">
            {formik.touched.color && formik.errors.color}
          </div>
          <CustomInput
            type="number"
            name="quantity"
            label="Enter Product Quantity"
            val={formik.values.quantity}
            onCh={formik.handleChange("quantity")}
            onBl={formik.handleBlur("quantity")}
          />
          <div className="error text-danger">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="bg-white border-1 p-5 text-center">
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
                    onClick={()=>dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute  "
                    style={{ top: "5px", right: "5px" }}
                  ></button>
                  <img src={i.URL} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
