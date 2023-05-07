import React, { useEffect, useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./partials/Header";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigation = useNavigate();
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigation("/");
    }
  });

  const handleSubmit = async () => {
    const result = await login(form);
    console.log("form", result);
    setError(null);

    if (result.status === 200) {
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/");
        return;
      }
      if (result.data.status === 201) {
        setError(result.data.data);
        return;
      }
      if (result.data.status === 202) {
        toast(result.data.message);
        return;
      }
    }
  };

  return (
    <>
      <Header />
      <section className="flex justify-center items-center h-screen bg-gray-100">
        <ToastContainer />
        <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
          <div className="mb-4">
            <p className="text-gray-600">Log In</p>
          </div>
          <div>
            <input
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="text"
              placeholder="Email or Username"
              name="username"
              onChange={handleChange}
            />
            {error?.username && (
              <small classNameName="text-muted text-sm">
                {error.username.msg}
              </small>
            )}
          </div>
          <div>
            <input
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {error?.password && (
              <small classNameName="text-muted text-sm">
                {error.password.msg}
              </small>
            )}
          </div>
          <div>
            <button
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
              onClick={handleSubmit}
            >
              Log In
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
