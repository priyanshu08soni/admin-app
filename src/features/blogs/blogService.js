import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getBlogs=async()=>{
    const response=await axios.get(`${base_url}blog/`);
    return response.data;
}
const addBlogs=async(blogData)=>{
    const response=await axios.post(`${base_url}blog/`,blogData,config);
    return response.data;
}
const updateBlog=async(blog)=>{
    const response=await axios.put(`${base_url}blog/${blog._id}`,
    {
        title:blog.blogData.title,
        description:blog.blogData.description,
        category:blog.blogData.category,
        images:blog.blogData.images,
    }
    ,config);
    return response.data;
}
const getBlog=async(_id)=>{
    const response=await axios.get(`${base_url}blog/${_id}`,config);
    return response.data;
}
const deleteBlog=async(_id)=>{
    const response=await axios.delete(`${base_url}blog/${_id}`,config);
    return response.data;
}
const blogService={
    getBlogs,
    addBlogs,
    deleteBlog,
    getBlog,
    updateBlog,
};
export default blogService; 
