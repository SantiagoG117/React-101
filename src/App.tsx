import { useReducer } from "react";
import LoginStatus from "./state-management/LoginStatus";
import taskReducer from "./state-management/reducers/taskReducer";
import NavBar from "./state-management/NavBar";
import HomePage from "./state-management/HomePage";
import TaskContext from "./state-management/contexts/tasksContext";
import authReducer from "./state-management/reducers/authReducer";
import AuthContext from "./state-management/contexts/authContext";

/* 
  To share the state with React context there are three things we need to do:
    1. Lift the local state (Reducer) up to the closest parent
    2. Create a context: 
      a. Specify the type of data we want to transport (shape of the box)
      b. Specify the Context (the truck transporting the box of data)
    3. Access the shared state using the context hook in our component tree

*/
function App() {
  // Maintains local state in a component
  const [tasks, tasksDispatch] = useReducer(taskReducer, []);
  const [user, authDispatch] = useReducer(authReducer, "");

  return (
    <>
      {/*
        We use context to dispatch state across the component tree. It works like a truck transporting a states
        so we can access it anywhare in our component tree
        Now we can access this box anywhere in our component tree
      */}
      <AuthContext.Provider value={{ user, dispatch: authDispatch }}>
        <TaskContext.Provider value={{ tasks, dispatch: tasksDispatch }}>
          <NavBar />
          <HomePage />
        </TaskContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
