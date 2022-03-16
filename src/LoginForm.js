import { useState } from "react";
import Axios from "axios";
import { useForm } from "react-hook-form";
import "./LoginForm.css";

const LogInForm = ({ setPage }) => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    }).then((res) => {
      console.log(res);
      setPage("GetUser");
    });
  };

  return (
    <body>
      <section className="login" id="login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="head">
            <h1 className="company">Welcome back!</h1>
          </div>
          <p className="msg">User login</p>
          <div className="form">
            <div className="emailAndPw">
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email"
                className="email"
                onChange={(e) => setLoginUsername(e.target.value)}
              ></input>
              {errors.email && <p>Email-adress is required.</p>}
              <br></br>
              <input
                {...register("password", { required: true })}
                type="password"
                id="password"
                name="password"
                placeholder="••••••••••••••"
                className="password"
                onChange={(e) => setLoginPassword(e.target.value)}
              ></input>
              {errors.password && <p>Password is required.</p>}
              <br></br>
              <div className="btns">
                <button type="submit">Login</button>
                <a
                  href="#"
                  onClick={() => setPage("RegisterForm")}
                  className="register"
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        </form>
      </section>
    </body>
  );
};

export default LogInForm;
