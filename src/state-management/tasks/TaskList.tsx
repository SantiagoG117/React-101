import { useContext } from "react";
import useAuth from "../auth/useAuth";
import TaskContext from "./tasksContext";
import useAuthStore from "../authZustand/authStore";

const TaskList = () => {
  // Access the context payload
  const { tasks, dispatch } = useContext(TaskContext);
  // const { user } = useAuth();
  const { username } = useAuthStore();

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
              {task.title} created by {username}
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
