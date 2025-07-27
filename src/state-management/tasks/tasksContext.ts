import { Dispatch } from "react";
import React from "react";
import { Task, TaskAction } from "./tasksProvider";

//? React context works like a truck transporting a box. Inside that box we can have some state.

//? Define the shape of the state we wish to transport shape of the box):
interface TaskContextType {
  tasks: Task[];
  //Dispatch is a type that represents a function that takes an argument and returns void. In this case it is a function that takes a TaskAction argument and returns void
  dispatch: Dispatch<TaskAction>;
}

//? Define the Context (the Truck) we wish to share in our component tree
const TaskContext = React.createContext<TaskContextType>({} as TaskContextType); //We must provide an object of type TaskContextType as default value

export default TaskContext;
