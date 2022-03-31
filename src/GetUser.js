import { useEffect, useState } from "react";
import Axios from "axios";
import UserLogout from "./UserLogout";
import "./GetUser.css";

const GetUser = () => {
  const [data, setData] = useState(null);

  /*useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/user",
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    }, []);
  });*/
  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/user",
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  return (
    <div className="userPage">
      <div className="userPageBtns">
        <button onClick={getUser}>Get User</button>
        <UserLogout></UserLogout>
      </div>

      {data ? (
        <h1 className="displayName">
          Welcome Back {data.firstname} {data.lastname}
        </h1>
      ) : null}
    </div>
  );
};

export default GetUser;
