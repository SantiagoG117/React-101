import axios from "axios";
import { useEffect, useState } from "react";

/* 
    ! No separation of concerns or modularity:
        The logic for querying the data is mixed with how the component renders the data. 
        If we need the same logic in another component we need to duplicate it. There is no modularity.

    ! No automatic refresh: 
        If the data changes while the user is in this page, they won't see the changes unless
        they refresh the data. 

    ! No caching: 
        Caching is the process of storing data in a place where it can be accessed more quickly and
        efficiently in the future. 
        In React applications we can store frequently used data on the client side (inside the user's Browser) 
        so we don't have to fetched from the server everytime its need it.
*/

//Define the structure of the Todo object to be retrieved from the server
interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const TodoList = () => {
  //State management
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");

  /*
     ?useEffect: Fetches the list of Todos from the API when the component is mounted and rendered 
     We use the useEffect hook to execute code that can have side effects (like fetching data from an API).
     It is a good practice to return a clean up function for undoing the effects produced by useEffect in case
     the user stops using the component and therefore gets unmounted. 
     In case of HTTP requests this means we should cancel the request.
     
     ! Problem: No request cancellation if the component is unmounted. 
  */
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setTodos(res.data))
      .catch((error) => setError(error));
  }, []);

  //Return the error message in case of errors
  //! Problem: No retry of failed requests.
  if (error) return <p>{error}</p>;

  // Render the Todo objects
  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
