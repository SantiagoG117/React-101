import React, { useReducer } from "react";
import taskReducer from "../reducers/taskReducer";
import TaskContext from "../contexts/tasksContext";


//? Custom provider: Has its own state and shares it using a context

interface Props {
  // Represents the components in our tree
  children: React.ReactNode;
}

function tasksProvider({ children }: Props) {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export default tasksProvider;
