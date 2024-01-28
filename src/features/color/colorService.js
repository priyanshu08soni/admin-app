import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";
const getColors=async()=>{
    const response=await axios.get(`${base_url}color/`);
    return response.data;
}
const addColors=async(color)=>{
    const response=await axios.post(`${base_url}color/`,color,config);
    return response.data;
}
const colorService={
    getColors,
    addColors,
};
export default colorService; 
