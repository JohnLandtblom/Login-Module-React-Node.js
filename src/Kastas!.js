<form onSubmit={handleSubmit(onSubmit)}>
  <input
    {...register("firstName", { required: true })}
    placeholder="Firstname"
  ></input>
  {errors.firstName && <p>First name is required.</p>}
  <input
    {...register("lastName", { required: true })}
    placeholder="Lastname"
  ></input>
  {errors.lastName && <p>Last name is required.</p>}
  <input {...register("email")} type="email" placeholder="Email-adress"></input>
  {errors.email && <p>Email-adress is required.</p>}
  <input
    {...register("password", { required: true })}
    type="password"
    placeholder="Password"
  ></input>
  {errors.password && <p>Password is required.</p>}
  <input type="submit"></input>
</form>;

<body className="RegisterForm">
  <section className="RegisterFormContainer">
    <div className="wrapper">
      <div className="headLineFlex">
        <h1 className="headLine">Register Here!</h1>
      </div>
      <div className="firstAndLastName">
        <input
          className="firstName"
          type="text"
          id="firstname"
          name="firstname"
          placeholder="First Name"
          onChange={(e) => setRegisterFirstname(e.target.value)}
        ></input>
        <input
          className="lastName"
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Last Name"
          onChange={(e) => setRegisterLastname(e.target.value)}
        ></input>
      </div>
      <div className="emailAndPw">
        <input
          className="email"
          type="email"
          id="email"
          name="email"
          placeholder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        ></input>
        <div className="pwAndLabel">
          <input
            className="pw"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setRegisterPassword(e.target.value)}
          ></input>
        </div>

        <div>
          <button onClick={registerUser}>Register</button>
          <a href="#" onClick={() => setPage("LogInForm")}>
            I already have an account
          </a>
        </div>
      </div>
    </div>
  </section>
</body>;
