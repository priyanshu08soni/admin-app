import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";
const getProductCategories=async()=>{
    const response=await axios.get(`${base_url}prodcategory/`);
    return response.data;
}
const addCategories=async(category)=>{
    const response=await axios.post(`${base_url}prodcategory/`,category,config);
    return response.data;
}
const updatePcategory=async(category)=>{
    const response=await axios.put(`${base_url}prodcategory/${category.id}`,{title:category.pCategory.title},config);
    return response.data;
}
const getaPcategory= async(_id)=>{
    const response=await axios.get(`${base_url}prodcategory/${_id}`,config);
    return response.data;
}
const deletePcategory= async(_id)=>{
    const response=await axios.delete(`${base_url}prodcategory/${_id}`,config);
    return response.data;
}
const pCategoryService={
    getProductCategories,
    addCategories,
    deletePcategory,
    getaPcategory,
    updatePcategory,
};
export default pCategoryService; 
