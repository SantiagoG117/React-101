import { useReducer } from "react";
import LoginStatus from "./state-management/LoginStatus";
import taskReducer from "./state-management/reducers/taskReducer";
import NavBar from "./state-management/NavBar";
import HomePage from "./state-management/HomePage";
import TaskContext from "./state-management/contexts/tasksContext";
import authReducer from "./state-management/reducers/authReducer";
import AuthContext from "./state-management/contexts/authContext";
import AuthProvider from "./state-management/providers/AuthProvider";
import TasksProvider from "./state-management/providers/tasksProvider";

/* 
  To share the state with React context there are three things we need to do:
    1. Lift the local state (Reducer) up to the closest parent
    2. Create a context: 
      a. Specify the type of data we want to transport (shape of the box)
      b. Specify the Context (the truck transporting the box of data)
    3. Access the shared state using the context hook in our component tree

*/

/* 
  TODO:
    Create a custom provider for sharing tasks
    Create a custom Hook for accessing the share tasks

*/
function App() {
  return (
    <>
      {/* We use context to dispatch state across the component tree. It works like a truck transporting a states across the component tree*/}
      <AuthProvider>
        <TasksProvider>
          <NavBar />
          <HomePage />
        </TasksProvider>
      </AuthProvider>
    </>
  );
}

export default App;
