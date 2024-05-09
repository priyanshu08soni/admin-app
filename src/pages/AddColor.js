import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { addColors, getaColor, resetState, updateColor } from "../features/color/colorSlice";
import { useLocation, useNavigate } from "react-router-dom";
let schema = yup.object().shape({
  title: yup.string().required("Color is required"),
});
const AddColor = () => {
  const dispatch = useDispatch();
  const newColor = useSelector((state) => state.color);
  const location =useLocation();
  const navigate=useNavigate();
  const colorId=location.pathname.split("/")[3];
  const { isSuccess, isError, isLoading, colors,colorName,updatedColor } = newColor;
  useEffect(()=>{
    if(colorId!==undefined){
      dispatch(getaColor(colorId));
    }else{
      dispatch(resetState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[colorId]);
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(colorId!==undefined){
        const data={id:colorId,colorData:values}
        dispatch(updateColor(data));
      }else{
        dispatch(addColors(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  useEffect(() => {
    if (isSuccess && colors) {
      toast.success("Color Added Successfullly!");
    }
    if(updatedColor && isSuccess){
      toast.success("Color Added Successfully");
      navigate("/admin/color-list")
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, isLoading]);
  return (
    <div>
      <h3 className="mb-4 title">{colorId!==undefined?"Edit":"Add"} Color</h3>
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
            {colorId!==undefined?"Edit":"Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
