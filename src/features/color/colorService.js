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
const updateColor=async(color)=>{
    const response=await axios.put(`${base_url}color/${color.id}`,{title:color.colorData.title},config);
    return response.data;
}
const getaColor=async(_id)=>{
    const response=await axios.get(`${base_url}color/${_id}`,config);
    return response.data;
}
const deleteColor=async(_id)=>{
    const response=await axios.delete(`${base_url}color/${_id}`,config);
    return response.data;
}
const colorService={
    getColors,
    addColors,
    updateColor,
    getaColor,
    deleteColor,
};
export default colorService; 
