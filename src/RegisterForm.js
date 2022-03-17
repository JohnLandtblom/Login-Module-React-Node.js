import { useState } from "react";
import Axios from "axios";
import { useForm } from "react-hook-form";
import "./RegisterForm.css";

const RegisterForm = ({ setPage }) => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerFirstname, setRegisterFirstname] = useState("");
  const [registerLastname, setRegisterLastname] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    Axios({
      method: "POST",
      data: {
        firstname: registerFirstname,
        lastname: registerLastname,
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/register",
    })
      .then((res) => {
        console.log(res);
        setPage("LogInForm");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <body className="RegisterForm">
      <section className="RegisterFormContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="wrapper">
            <div className="headLineFlex">
              <h1 className="headLine">Register Here!</h1>
            </div>
            <div className="firstAndLastName">
              <input
                {...register("firstName", { required: true })}
                placeholder="Firstname"
                className="firstName"
                onChange={(e) => setRegisterFirstname(e.target.value)}
              ></input>
              <div className="fnameReq">
                {errors.firstName && <p>Firstname is required.</p>}
              </div>
              <input
                {...register("lastName", { required: true })}
                placeholder="Lastname"
                className="lastName"
                onChange={(e) => setRegisterLastname(e.target.value)}
              ></input>
              <div className="lnameReq">
                {errors.lastName && <p>Lastname is required.</p>}
              </div>
            </div>
            <div className="emailAndPw">
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email"
                className="email"
                onChange={(e) => setRegisterUsername(e.target.value)}
              ></input>
              {errors.email && <p>Email-adress is required.</p>}
              <div className="pwAndLabel">
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="Password"
                  className="pw"
                  onChange={(e) => setRegisterPassword(e.target.value)}
                ></input>
                {errors.password && <p>Password is required.</p>}
              </div>

              <div>
                <button type="submit">Register</button>
                <a href="#" onClick={() => setPage("LogInForm")}>
                  I already have an account
                </a>
              </div>
            </div>
          </div>
        </form>
      </section>
    </body>
  );
};

export default RegisterForm;
