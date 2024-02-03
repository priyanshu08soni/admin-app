import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getBlogCategories=async()=>{
    const response=await axios.get(`${base_url}blogcategory/`);
    return response.data;
}
const addBlogCategories=async(blogCategory)=>{
    const response=await axios.post(`${base_url}blogcategory/`,blogCategory,config);
    return response.data;
}
const updateBlogCategory=async(blog)=>{
    const response=await axios.put(`${base_url}blogcategory/${blog.id}`,{title:blog.bCategory.title},config);
    return response.data;
}
const getaBlogCategory=async(_id)=>{
    const response=await axios.get(`${base_url}blogcategory/${_id}`,config);
    return response.data;
}
const deleteBlogCategory=async(_id)=>{
    const response=await axios.delete(`${base_url}blogcategory/${_id}`,config);
    return response.data;
}
const bcategoryService={
    getBlogCategories,
    addBlogCategories,
    getaBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
};
export default bcategoryService; 
