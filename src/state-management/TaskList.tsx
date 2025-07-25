import { useContext, useReducer } from "react";
import taskReducer from "./reducers/taskReducer";
import TaskContext from "./contexts/tasksContext";
import AuthContext from "./contexts/authContext";
import useAuth from "./hooks/useAuth";
import useTasks from "./hooks/useTasks";

const TaskList = () => {
  // Access the context payload
  const { tasks, dispatch } = useTasks();
  const { user } = useAuth();

  return (
    <>
      <button
        onClick={() =>
          dispatch({
            type: "ADD",
            task: { id: Date.now(), title: "Task number " + Date.now() },
          })
        }
        className="btn btn-primary my-3"
      >
        Add Task
      </button>

      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span className="flex-grow-1">
              {task.title} created by {user}
            </span>
            <button
              className="btn btn-outline-danger"
              onClick={() => dispatch({ type: "DELETE", taskId: task.id })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
