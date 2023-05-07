import React, { useEffect, useState } from "react";
import { register } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Header from "./partials/Header";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigation("/");
    }
  });

  const navigation = useNavigate();

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const result = await register(form);
    console.log(result);

    if (result.status === 200) {
      if (result.data.status === 201) {
        setError(result.data.data);
        toast(result.data.message);
        return;
      }
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/");
        return;
      }
    } else {
      toast("Something went wrong Try Again");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <ToastContainer />
        <div
          className="
      flex flex-col
      bg-white
      shadow-md
      px-4
      sm:px-6
      md:px-8
      lg:px-10
      py-8
      rounded-3xl
      w-50
      max-w-md
    "
        >
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            Register an Account
          </div>

          <div className="mt-10">
            <form action="#">
              <div className="flex flex-col mb-5">
                <label className="mb-1 text-xs tracking-wide text-gray-600">
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    className="
                text-sm
                placeholder-gray-500
                pl-10
                pr-4
                rounded-2xl
                border border-gray-400
                w-full
                py-2
                focus:outline-none focus:border-blue-400
              "
                    placeholder="Enter  Name"
                    onChange={handleChange}
                  />
                  {error?.name && (
                    <small className="text-muted text-sm text-red-800">
                      {error.name.msg}
                    </small>
                  )}
                </div>
              </div>
              <div className="flex flex-col mb-5">
                <label className="mb-1 text-xs tracking-wide text-gray-600">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    className="
                text-sm
                placeholder-gray-500
                pl-10
                pr-4
                rounded-2xl
                border border-gray-400
                w-full
                py-2
                focus:outline-none focus:border-blue-400
              "
                    placeholder="Enter  Username"
                    onChange={handleChange}
                  />
                  {error?.username && (
                    <small className="text-muted text-sm text-red-800">
                      {error.username.msg}
                    </small>
                  )}
                </div>
              </div>
              <div className="flex flex-col mb-5">
                <label className="mb-1 text-xs tracking-wide text-gray-600">
                  E-Mail Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    className="
                text-sm
                placeholder-gray-500
                pl-10
                pr-4
                rounded-2xl
                border border-gray-400
                w-full
                py-2
                focus:outline-none focus:border-blue-400
              "
                    placeholder="Enter  Email"
                    onChange={handleChange}
                  />
                  {error?.email && (
                    <small className="text-muted text-sm text-red-800">
                      {error.email.msg}
                    </small>
                  )}
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    className="
                text-sm
                placeholder-gray-500
                pl-10
                pr-4
                rounded-2xl
                border border-gray-400
                w-full
                py-2
                focus:outline-none focus:border-blue-400
              "
                    placeholder="Enter  Password"
                    onChange={handleChange}
                  />
                  {error?.password && (
                    <small className="text-muted text-sm text-red-800">
                      {error.password.msg}
                    </small>
                  )}
                </div>
              </div>

              <div className="flex w-full">
                <button
                  type="submit"
                  className="
              flex
              mt-2
              items-center
              justify-center
              focus:outline-none
              text-white text-sm
              sm:text-base
              bg-blue-500
              hover:bg-blue-600
              rounded-2xl
              py-2
              w-full
              transition
              duration-150
              ease-in
            "
                  onClick={handleSubmit}
                >
                  <span className="mr-2 uppercase">Register Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
