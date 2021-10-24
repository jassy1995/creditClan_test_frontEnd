import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../user/navbar";
import Swal from "sweetalert2";
import "../../styles/register.css";
const Register = () => {
  let [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit: submitLoginForm,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const password = watch("password");
  const history = useHistory();

  //request alert
  const proceedToLogin = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        text: "would you like to login!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No, cancel!",
        confirmButtonText: "Yes, login!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) history.push("/");
        else if (result.dismiss === Swal.DismissReason.cancel) reset();
      });
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

  //check confirm password field if it is the same with password field
  const checkPassword = (confirmPassword) => password === confirmPassword;

  //submit the data to backend
  const submitForm = (newUserData) => {
    setIsLoading(true);
    axios
      .post("http://localhost:3007/user/register", newUserData)
      .then((res) => {
        if (res.data) {
          let message = res.data.successResponse || res.data.errorResponse;
          let messageIcon = res.data.successResponse ? "success" : "warning";
          responseMessage(message, messageIcon);
          setIsLoading(false);
          setTimeout(() => {
            if (res.data.successResponse) {
              proceedToLogin();
            }
          }, 2000);
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
        className="container-fluid pt-md-5 pb-md-5 pl-md-5 pr-md-5"
        style={{ backgroundColor: "#e4ebf1" }}
        id="register_container"
      >
        <form
          className="bg-light shadow rounded mt-md-4 pt-3 pr-3 pl-3 mb-4"
          onSubmit={submitLoginForm(submitForm)}
          noValidate
          autoComplete="off"
          id="register_form"
        >
          <h2 className="mb-2 d-none d-md-block fst-italic font-monospace">
            Register here
          </h2>
          <div className="row mb-4">
            <div className="col-sm-6 ">
              {!errors.username ? (
                <label>username</label>
              ) : (
                errors.username &&
                errors.username.type === "required" && (
                  <small className="text-danger">username is require.</small>
                )
              )}
              <input
                {...register("username", { required: true })}
                type="text"
                className="form-control "
                placeholder="enter your first name"
                aria-label="username"
              />
            </div>

            <div className="col-sm-6">
              {!errors.phone ? (
                <label>phone number</label>
              ) : (
                errors.phone &&
                errors.phone.type === "required" && (
                  <small className="text-danger">
                    phone number is require.
                  </small>
                )
              )}
              <input
                {...register("phone", { required: true })}
                type="text"
                className="form-control formInput"
                placeholder="enter your phone number"
                aria-label="phone"
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-sm-6">
              {!errors.email ? (
                <label>email address</label>
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
                      invalid email address
                    </small>
                  )}
              <input
                {...register("email", {
                  required: true,
                  pattern: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
                })}
                type="text"
                name="email"
                className="form-control formInput"
                placeholder="enter your first name"
                aria-label="name"
              />
            </div>
            <div className="col-sm-6">
              {!errors.address ? (
                <label>address number</label>
              ) : (
                errors.address &&
                errors.address.type === "required" && (
                  <small className="text-danger">address is require.</small>
                )
              )}
              <input
                {...register("address", { required: true })}
                type="text"
                className="form-control formInput"
                placeholder="enter your address number"
                aria-label="address"
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-sm-6">
              {!errors.password ? (
                <label>create password</label>
              ) : (
                errors.password &&
                errors.password.type === "required" && (
                  <small className="text-danger">password is require.</small>
                )
              )}
              <input
                {...register("password", { required: true })}
                type="password"
                className="form-control formInput"
                placeholder="enter your password"
                aria-label="password"
              />
            </div>
            <div className="col-sm-6 mb-2">
              {!errors.confirmPassword ? (
                <label>confirm password</label>
              ) : (
                errors.confirmPassword &&
                errors.confirmPassword.type === "required" && (
                  <small className="text-danger text-center">
                    confirmPassword is require
                  </small>
                )
              )}
              {!errors.confirmPassword
                ? ""
                : errors.confirmPassword &&
                  errors.confirmPassword.type === "validate" && (
                    <small className="text-danger pb-2">
                      password does not match
                    </small>
                  )}
              <input
                {...register("confirmPassword", {
                  required: true,
                  validate: checkPassword,
                })}
                type="password"
                className="form-control formInput"
                placeholder="confirm password"
                aria-label="confirmPassword"
              />
            </div>
          </div>
          <div className="text-sm-center">
            <button
              type="submit"
              className="register_button rounded-pill col-sm-6 mb-3 pt-0 mt-0"
            >
              <span>
                {isLoading ? (
                  loadingMessage()
                ) : (
                  <span className="fs-4">Submit</span>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>

      <footer className="mt-auto fixed-bottom p-3 register_footer">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-light">Copyright &copy;food_app 2021</div>
            <div>
              <Link to={"/register"} className="text-light">
                Contact : +2348143274300
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Register;
