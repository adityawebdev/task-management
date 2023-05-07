import axios from "axios";
import { CREATE_TODO, GET_TODO, LOGIN, REGISTER } from "./apiConstants";

export const login = async (data) => {
  return axios.post(LOGIN, data);
};
export const register = async (data) => {
  return axios.post(REGISTER, data);
};
export const createTodoApi = async (data) => {
  let token = getToken();
  console.log(token, "token");
  return axios.post(CREATE_TODO, data, {
    headers: {
      auth: token,
    },
  });
};

export const getTodoApi = () => {
  let token = getToken();
  console.log(token, "token");
  return axios.get(GET_TODO, {
    headers: {
      auth: token,
    },
  });
};

export const getToken = () => {
  let user = localStorage.getItem("user");
  if (!user) return;
  const userObj = JSON.parse(user);
  return userObj.token;
};
