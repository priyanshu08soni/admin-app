import {React,useState} from 'react'
import CustomInput from '../Components/CustomInput'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onchange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully `);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const AddProduct = () => {
  const [desc, setDesc] = useState();
  const handleDesc = (e) => {
    setDesc(e);
  };
  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form action="">
          <CustomInput type='text' label='Enter Product title' />
          <div className='mb-3'>
          <ReactQuill
            theme="snow"
            value={desc}
            onChange={(evt) => {
              handleDesc(evt);
            }}
          />
          </div>
          <CustomInput type='number' label='Enter Product Price' />
          <select className="form-control py-3 mb-3" name="" id="">
            <option value="">Select Product Brand</option>
          </select>
          <select className="form-control py-3 mb-3" name="" id="">
            <option value="">Select Product Category</option>
          </select>
          <select className="form-control py-3 mb-3" name="" id="">
            <option value="">Select Product Color</option>
          </select>
          <CustomInput type='number' label='Enter Product Price' />
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Dragger>
          <button type='submit'  className="btn btn-success border-0 rounded-3 my-5">
            Add Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
