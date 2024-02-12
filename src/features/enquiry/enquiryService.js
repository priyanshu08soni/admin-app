import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getEnquiries=async()=>{
    const response=await axios.get(`${base_url}enquiry/`);
    return response.data;
}
const deleteEnquiry=async(_id)=>{
    const response=await axios.delete(`${base_url}enquiry/${_id}`,config);
    return response.data;
}
const getEnquiry=async(_id)=>{
    const response=await axios.get(`${base_url}enquiry/${_id}`);
    return response.data;
}
const updateEnquiry=async(enq)=>{
    const response=await axios.put(`${base_url}enquiry/${enq._id}`,{status:enq.enqData},config);
    return response.data;
}
const enquiryService={
    getEnquiries,
    deleteEnquiry,
    getEnquiry,
    updateEnquiry,
};
export default enquiryService; 
