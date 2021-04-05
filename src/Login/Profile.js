// @flow
import * as React from "react";
import "./Login.scss";
import { useEffect, useState } from "react";
import * as loginService from "../Services/LoginService";

export const Profile = () => {
  const [user, setUser] = useState({});
  const getProfile = () => {
    loginService.profile().then((result) => {
      const { data } = result;
      setUser(data);
      console.log(data);
    });
  };

  useEffect(getProfile, []);
  return (
    <div className="Login-form">
      <div style={{ color: "black" }}>{user._id}</div>
      <div style={{ color: "black" }}>{user.username}</div>
      <div style={{ color: "black" }}>{user.role}</div>
    </div>
  );
};
