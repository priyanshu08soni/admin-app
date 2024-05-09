import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { 
   useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { login } from "../features/auth/authSlice";
let schema = yup.object().shape({
  email: yup
  .string()
  .email("Email should be valid")
  .required("Email is required"),
  password: yup.string().required("password is required"),
});
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (!user == null || isSuccess) {
      navigate("admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading, isError, isSuccess, message]);
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            name="email"
            type="text"
            label="Email"
            id="email"
            val={formik.values.email}
            onCh={formik.handleChange("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
          <CustomInput
            name="password"
            type="password"
            label="Password"
            id="pass"
            val={formik.values.password}
            onCh={formik.handleChange("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            type="submit"
            style={{ background: "#ffd333" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
