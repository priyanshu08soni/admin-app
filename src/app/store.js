import { configureStore } from "@reduxjs/toolkit";
import authreducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import pcategoryReducer from "../features/pcategory/pcategorySlice";
import colorReducer from "../features/color/colorSlice";
import blogReducer from "../features/blogs/blogSlice";
import bcategoryReducer from "../features/bcategory/bcategorySlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";


export const store = configureStore({
  reducer: {
    auth: authreducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    pcategory:pcategoryReducer,
    color:colorReducer,
    blog:blogReducer,
    bcategory:bcategoryReducer,
    enquiry:enquiryReducer,
    upload:uploadReducer,
  },
});
// service takes the responsed data from server then server give this data to service -> slice and slice 
// saves this data then when state calls from pages it calls to reducer then reducer get its data from slice.
