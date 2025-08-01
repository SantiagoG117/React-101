import React, { useReducer } from "react";
import TaskContext from "./tasksContext";

//? Reducer: extracts the state logic away from a component and encapsulates it inside a reusable function
export interface Task {
  id: number;
  title: string;
}

interface AddTask {
  type: "ADD";
  task: Task;
}

interface DeleteTask {
  type: "DELETE";
  taskId: number;
}

/* 
* Union type: Allows a property to be one of multiple specific forms
- Represents all possible actions that can be dispatched to the reducer
- Allows the reducer to handle the required extra data for adding or deleting tasks
- Helps TypeScript to ensure that only valid actions with the correct structure are used when updating the state
*/
export type TaskAction = AddTask | DeleteTask;

/* 
    * params:
        - tasks: current state
        - action: An object that describes what the user is trying to do
        
    * When dealing with actions that require extra data we should provide different types of actions 
    for different scenarios.
*/

const taskReducer = (tasks: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case "ADD":
      return [action.task, ...tasks];
    case "DELETE":
      return tasks.filter((t) => t.id !== action.taskId);
  }
};

//? Custom provider: Has its own state (Reducer) and shares it using a context

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
