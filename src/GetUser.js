import { useState } from "react";
import Axios from "axios";
import UserLogout from "./UserLogout";

const GetUser = () => {
  const [data, setData] = useState(null);
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
    <div>
      <button onClick={getUser}>Get User</button>
      {data ? (
        <h1>
          Welcome Back {data.firstname} {data.lastname}
        </h1>
      ) : null}
      <UserLogout></UserLogout>
    </div>
  );
};

export default GetUser;
