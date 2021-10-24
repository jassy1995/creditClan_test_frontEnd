import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../../components/user/navbar";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { setUser } from "../../utils/userFunction";
import "../../styles/login.css";

const Login = () => {
  let [isLoading, setIsLoading] = useState(false);

  const {
    register: login,
    handleSubmit: submitLoginForm,
    formState: { errors },
    reset,
  } = useForm();
  const history = useHistory();

  //loading spinner
  const loadingMessage = () => {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  };

  //alert response message
  const responseMessage = (message, messageIcon) => {
    Swal.fire({
      position: "top-end",
      icon: messageIcon,
      title: message,
      color: "#d33",
      width: 300,
      height: 200,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  //submit the data to backend
  const submitForm = (newUserData) => {
    setIsLoading(true);
    axios
      .post("http://localhost:3007/user/login", newUserData)
      .then((res) => {
        if (res.data) {
          setIsLoading(false);
          try {
            if (res.data.token) {
              localStorage.setItem(
                "accessToken",
                res.data.token?.split(" ")[1]
              );
              setUser(res.data.user);
            }
            let message = res.data.successResponse || res.data.errorResponse;
            let messageIcon = res.data.successResponse ? "success" : "warning";
            responseMessage(message, messageIcon);
            setTimeout(() => {
              if (res.data.successResponse) {
                setUser(res.data.user);
                history.push("/dashboard");
                reset();
              }
            }, 2000);
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div
        className="container-fluid  pt-2 pb-4"
        style={{ backgroundColor: "#e4ebf1" }}
        id="login_container"
      >
        <div className="row justify-content-center mt-4">
          <div className="col-md-12 col-lg-10">
            <div className="wrap d-md-flex">
              <div className="text-wrap  p-lg-5 text-center d-flex align-items-center order-md-last shadow">
                <div className="text w-100 d-none d-md-block">
                  <h2 className="pb-0">Welcome to login</h2>
                  <h5 className="text-light mb-2">Don't have an account?</h5>
                  <Link
                    to={"/register"}
                    className="signUpButton text-light border p-1  mb-2"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
              <div className="login-wrap  p-lg-5">
                <form
                  onSubmit={submitLoginForm(submitForm)}
                  noValidate
                  autoComplete="off"
                  className="mt-sm-5 pl-4 pr-4"
                  id="login_form"
                >
                  <h3 className="text-center d-none d-md-block fst-italic font-monospace mb-3">
                    Login here
                  </h3>
                  <div className="form-group mb-3 text-center ">
                    {!errors.email ? (
                      <label className="mt-4">Email Address</label>
                    ) : (
                      errors.email &&
                      errors.email.type === "required" && (
                        <small className="text-danger text-center">
                          Email is require
                        </small>
                      )
                    )}
                    {!errors.email
                      ? ""
                      : errors.email &&
                        errors.email.type === "pattern" && (
                          <small className="text-danger pb-2">
                            Invalid email
                          </small>
                        )}
                    <input
                      {...login("email", {
                        required: true,
                        pattern: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
                      })}
                      className="form-control  rounded-pill  pl-4"
                      placeholder="enter your email address"
                    />
                  </div>
                  <div className="form-group text-center p">
                    {!errors.password ? (
                      <label>password</label>
                    ) : (
                      errors.password &&
                      errors.password.type === "required" && (
                        <small className="text-danger">
                          Password is require.
                        </small>
                      )
                    )}
                    <input
                      {...login("password", { required: true })}
                      className="form-control  rounded-pill pl-4"
                      placeholder="enter your password"
                    />
                  </div>
                  <div className="form-group d-flex">
                    <div className="form-group">
                      <div className="custom-control custom-checkbox">
                        <input
                          {...login("role")}
                          type="checkbox"
                          className="custom-control-input formCheckBox"
                          id="role"
                        />
                        <label className="custom-control-label" htmlFor="role">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="w-50 text-end">
                      <Link to={"password"}>Forgot Password?</Link>
                    </div>{" "}
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="rounded-pill  login_button w-100 mb-3"
                    >
                      <span>
                        {isLoading ? (
                          loadingMessage()
                        ) : (
                          <span className="fs-5">Submit</span>
                        )}
                      </span>
                    </button>
                    <div className="d-block d-md-none pb-3 text-center">
                      {" "}
                      <h5 className="text-danger mb-2">
                        Don't have an account?
                      </h5>{" "}
                      <Link
                        to={"/register"}
                        className="mb-5 text-primary btn-link"
                      >
                        Sign Up here
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-auto fixed-bottom p-3 login_footer">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-light">Copyright &copy;food_app 2021</div>
            <div>
              <Link to={"/"} className="text-light">
                Contact : +2348143274300
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Login;
