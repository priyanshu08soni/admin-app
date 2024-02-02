import React from 'react'
import {Modal} from "antd"
const CustomModel = (props) => {
    const {open,hideModel,performAction,title}=props;
  return (
    <Modal 
        title="Confirmation"
        open={open}
        onOk={performAction}
        onCancel={hideModel}
        okText="Ok"
        cancelText="Cancel"
    >
        <p>{title}</p>

    </Modal>
  )
}

export default CustomModel
