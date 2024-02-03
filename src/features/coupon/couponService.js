import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";
const getCoupons=async()=>{
    const response=await axios.get(`${base_url}coupon/`,config);
    return response.data;
}
const addCoupons=async(coupon)=>{
    const response=await axios.post(`${base_url}coupon/`,coupon,config);
    return response.data;
}
const updateCoupon=async(coupon)=>{
    const response=await axios.put(`${base_url}coupon/${coupon.id}`,
    {
        title:coupon.couponData.name,
        expiry:coupon.couponData.expiry,
        discount:coupon.couponData.discount
    },
    config);
    return response.data;
}
const getCoupon=async(_id)=>{
    const response=await axios.get(`${base_url}coupon/${_id}`,config);
    return response.data;
}
const deleteCoupon=async(_id)=>{
    const response=await axios.delete(`${base_url}coupon/${_id}`,config);
    return response.data;
}
const couponService={
    getCoupons,
    addCoupons,
    updateCoupon,
    getCoupon,
    deleteCoupon,
};
export default couponService; 
