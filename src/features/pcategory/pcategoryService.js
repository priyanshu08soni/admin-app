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
const pCategoryService={
    getProductCategories,
    addCategories,
};
export default pCategoryService; 
