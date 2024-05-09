import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { addBrands, getaBrand, resetState, updateBrand } from "../features/brand/brandSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
let schema = yup.object().shape({
  title: yup.string().required("Brand is required"),
});
const AddBrand = () => {
  const dispatch = useDispatch();
  const newBrand=useSelector((state)=>state.brand);
  const location=useLocation();
  const navigate=useNavigate();
  const getBrandId=location.pathname.split("/")[3];
  const {isSuccess,isError,isLoading,brands,brandName,updatedBrand}=newBrand;
  useEffect(()=>{
    if(getBrandId!==undefined){
      dispatch(getaBrand(getBrandId));
    }else{
      dispatch(resetState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[getBrandId])
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(getBrandId!==undefined){
        const data={id:getBrandId,brandData:values};
        dispatch(updateBrand(data));
      }else{
        dispatch(addBrands(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  useEffect(() => {
    if (isSuccess && brands) {
      toast.success("Brand Added Successfullly!");
    }
    if(updatedBrand && isSuccess){
      toast.success("Brand Updated Successfully")
      navigate('/admin/brand-list')
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, isLoading]);
  return (
    <div>
      <h3 className="mb-4 title">{getBrandId!==undefined?"Edit":"Add"} Brand</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Brand"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
            id="brand"
          />
          <div className="error text-danger">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getBrandId!==undefined?"Edit":"Add"} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
