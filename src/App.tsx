import { useReducer } from "react";
import LoginStatus from "./state-management/auth/LoginStatus";
import NavBar from "./state-management/NavBar";
import HomePage from "./state-management/HomePage";
import AuthContext from "./state-management/auth/authContext";
import TasksProvider from "./state-management/tasks/tasksProvider";
import AuthProvider from "./state-management/auth/AuthProvider";
import Counter from "./state-management/counter/Counter";

function App() {
  return (
    <>
      {/* We use context to dispatch state across the component tree. It works like a truck transporting a states across the component tree*/}
      <AuthProvider>
        <TasksProvider>
          <Counter />
          <NavBar />
          <HomePage />
        </TasksProvider>
      </AuthProvider>
    </>
  );
}

export default App;
