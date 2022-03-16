import { useState } from "react";
import RegisterForm from "./RegisterForm";
import LogInForm from "./LoginForm";
import GetUser from "./GetUser";

function App() {
  const [page, setPage] = useState("LogInForm");

  const renderApp = () => {
    switch (page) {
      case "LogInForm":
        return <LogInForm setPage={(page) => setPage(page)}></LogInForm>;
      case "RegisterForm":
        return <RegisterForm setPage={(page) => setPage(page)}></RegisterForm>;
      case "GetUser":
        return <GetUser setPage={(page) => setPage(page)}></GetUser>;
    }
  };

  return renderApp();
}

export default App;
