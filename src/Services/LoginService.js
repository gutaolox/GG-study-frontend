import { customAxios } from "../Utils/customAxios";

export const login = (username, password, location, history) => {
  const newAxios = customAxios(false);
  return newAxios
    .post("/auth/login", {
      username,
      password,
    })
    .then((result) => {
      const { data } = result;
      localStorage.setItem("token", data.access_token);
      let { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    });
};

export const Logout = () => {
  localStorage.removeItem("token");
};

export const profile = () => {
  return customAxios().get("/profile");
};
