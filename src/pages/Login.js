import React from "react";
import CustomInput from "../Components/CustomInput";

const Login = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <form action="">
          <CustomInput type="text" label="Email" id="email" />
          <CustomInput type="password" label="Password" id="pass" />
        </form>
      </div>
    </div>
  );
};

export default Login;
