import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../../services/api";

const Header = ({ modal }) => {
  const userLog = getToken();

  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const navigation = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    setUser(u);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigation("/login");
  };

  return (
    <nav
      className="flex items-center flex-wrap  p-3 bg-extraDarkMaroon shadow-lg"
      style={{
        filter: `${modal ? "blur(8px)" : "blur(0px)"}`,
      }}
    >
      <div className="inline-flex items-center p-2 mr-4 ">
        <span className="text-xl text-gold  font-bold uppercase tracking-wide">
          Task Manager
        </span>
      </div>

      <button
        className=" inline-flex p-3 hover:bg-green-600 rounded lg:hidden text-gold ml-auto  outline-none "
        onClick={handleClick}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
      <div
        className={`${
          active ? "" : "hidden"
        }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
      >
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
          <Link to="/">
            <p className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded  font-bold items-center justify-center hover:bg-green-600 text-gold hover:text-white ">
              Home
            </p>
          </Link>
          <Link to="/register">
            <p className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded  font-bold items-center justify-center hover:bg-green-600 text-gold hover:text-white ">
              Register
            </p>
          </Link>
          <Link to="/login">
            <p className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gold font-bold items-center justify-center  hover:text-white hover:bg-green-600 ">
              Login
            </p>
          </Link>
          {user && (
            <div>
              <p
                className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gold font-bold items-center justify-center  hover:text-white hover:bg-green-600 "
                onClick={handleLogout}
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
