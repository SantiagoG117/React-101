import { useContext } from "react";
import LoginStatus from "./auth/LoginStatus";

import AuthContext from "./auth/authContext";
import TaskContext from "./tasks/tasksContext";
import useAuth from "./auth/useAuth";
import useCounterStore from "./counter/counterStore";

const NavBar = () => {
  const { user } = useAuth();
  // Re-render only if the counter property changes. Not the max property
  const counter = useCounterStore((state) => state.counter);

  console.log("Render NavBar");

  return (
    <nav className="navbar d-flex justify-content-between">
      <span className="badge text-bg-secondary">{counter}</span>
      <span className="badge text-bg-primary">{user}</span>
      <LoginStatus />
    </nav>
  );
};

export default NavBar;
