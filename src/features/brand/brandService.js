import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";
const getBrands=async()=>{
    const response=await axios.get(`${base_url}brand/`);
    return response.data;
}
const addBrands=async(brand)=>{
    const response=await axios.post(`${base_url}brand/`,brand,config);
    return response.data;
}
const updateBrand=async(brand)=>{
    const response=await axios.put(`${base_url}brand/${brand.id}`,{title:brand.brandData.title},config);
    return response.data;
}
const getaBrand=async(_id)=>{
    const response=await axios.get(`${base_url}brand/${_id}`,config);
    return response.data;
}
const deleteABrand=async(_id)=>{
    const response=await axios.delete(`${base_url}brand/${_id}`,config);
    return response.data;
}
const brandService={
    getBrands,
    addBrands,
    getaBrand,
    updateBrand,
    deleteABrand,
};
export default brandService; 
