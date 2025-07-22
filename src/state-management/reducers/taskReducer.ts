interface Task {
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
? Union type: Allows a property to be one of multiple specific forms
- Represents all possible actions that can be dispatched to the reducer
- Allows the reducer to handle the required extra data for adding or deleting tasks
- Helps TypeScript to ensure that only valid actions with the correct structure are used when updating the state
*/
type TaskAction = AddTask | DeleteTask;

/* 
    ? A Reducer extracts the state management complexity away from a component and encapsulates inside a reusable function

    params:
        - tasks: current state
        - action: An object that describes what the user is trying to do
        
    When dealing with actions that require extra data we should provide different types of actions 
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
export default taskReducer;
