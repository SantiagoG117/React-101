import { useContext } from "react";
import LoginStatus from "./LoginStatus";
import TaskContext from "./contexts/tasksContext";
import AuthContext from "./contexts/authContext";

const NavBar = () => {
  const { tasks } = useContext(TaskContext);
  const { user } = useContext(AuthContext);
  return (
    <nav className="navbar d-flex justify-content-between">
      <span className="badge text-bg-secondary">{tasks.length}</span>
      <span className="badge text-bg-primary">{user}</span>
      <LoginStatus />
    </nav>
  );
};

export default NavBar;
