import React from "react";
import CustomInput from "../Components/CustomInput";

const Forgotpassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333",minHeight:"100vh" }}>
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Forgot password</h3>
        <p className="text-center">Please enter your registered email</p>
        <form action="">
          <CustomInput type="text" label="Email" id="email" />
          <button className="border-0 px-3 py-2 text-white fw-bold w-100" type="submit" style={{ background: "#ffd333" }} >
            Get Link
          </button>
        </form>
      </div>

    </div>
  );
};

export default Forgotpassword;
