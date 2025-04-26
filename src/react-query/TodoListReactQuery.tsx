import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

/* 
    ! No separation of concerns or modularity:
        The logic for querying the data is mixed with how the component renders the data. 
        Moreover, if we need the same logic in another component we need to duplicate it.
        There is no modularity.

*/

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const TodoListReactQuery = () => {
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.data);

  /* 
    React Query has many benefits:
      1. Replace the state variables for the data and errors, as well as the effectHook
      2. We get autoretries in case the the call to the server fails
      3. Automatic refresh: If the data changes while the user is in this page, the page will be re-rendered to reflect the changes
      4. Caching: The fetched data will be stored in the cache and will be fresh for a certain period of time. 
         The next time we need the same piece of data. If it is still in the cache we don't have to fetch it from the server
      Generic types: <Type of data we are fetching, Type of Error>
  */
  const { data, error } = useQuery<Todo[], Error>({
    /* Unique identifier for the query. It is interally used for caching. Everytime we retrieve data from the backend, 
    the data is stored in the cache and can be accessible via the query key 
    We set the key to an array of one or more values. The values depend on the type of data we want to store but the first
    value is often a string that identifies the type of data we want to store.
    */
    queryKey: ["todos"],
    /* The function that we use to fetch the data from the backend.*/
    queryFn: fetchTodos,
  });

  //Return the error message in case of errors
  if (error) return <p>{error.message}</p>;

  // Render the Todo objects
  return (
    <ul className="list-group">
      {data?.map((todo) => (
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoListReactQuery;
