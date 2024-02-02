import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { addCategories, getaPcategory, resetState, updatePcategory } from "../features/pcategory/pcategorySlice";
import { useLocation, useNavigate } from "react-router-dom";
let schema = yup.object().shape({
  title: yup.string().required("Category is required"),
});
const AddCat = () => {
  const dispatch = useDispatch();
  const newCategory = useSelector((state) => state.pcategory);
  const location =useLocation();
  const navigate=useNavigate();
  const getProdCatId=location.pathname.split("/")[3];
  const { isSuccess, isError, isLoading, pcategories,pcategoryName,updatedpCategory } = newCategory;
  useEffect(()=>{
    if(getProdCatId!==undefined){
      dispatch(getaPcategory(getProdCatId));
    }else{
      dispatch(resetState());
    }
  },[getProdCatId])
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title: pcategoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(getProdCatId!==undefined){
        const data={id:getProdCatId,pCategory:values}
        dispatch(updatePcategory(data))
      }else{
        dispatch(addCategories(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  useEffect(() => {
    if (isSuccess && pcategories) {
      toast.success("Category Added Successfullly!");
    }
    if(updatedpCategory && isSuccess){
      toast.success("Product Category Updated Successfully");
      navigate('/admin/category-list')
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  return (
    <div>
      <h3 className="mb-4 title">{getProdCatId!==undefined?"Edit":"Add"} Category</h3>
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
            {getProdCatId!==undefined?"Edit":"Add"} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCat;
