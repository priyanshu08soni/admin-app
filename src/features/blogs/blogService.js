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
const blogService={
    getBlogs,
    addBlogs,
};
export default blogService; 
