import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import todoService, { Todo } from "../services/todo-service";

const useTodos = () => {
  const { request } = todoService.getAll();

  /* 
  React Query has many benefits:
      1. We get autoretries in case the the call to the server fails
      2. Automatic refresh: If the data changes while the user is in this page, the page will be re-rendered to reflect the changes
      3. Caching: The fetched data will be stored in the cache and will be fresh . 
          The next time we need the same piece of data. If it is still in the cache we don't have to fetch it from the server
      Generic types: <Type of data we are fetching, Type of Error>
  */
  return useQuery<Todo[], Error>({
    /* Unique identifier for the query. It is interally used for caching. Everytime we retrieve data from the backend, 
        the data is stored in the cache and can be accessible via the query key 
        We set the key to an array of one or more values. The values depend on the type of data we want to store but the first
        value is often a string that identifies the type of data we want to store.
        */
    queryKey: CACHE_KEY_TODOS,
    /* The function that we use to fetch the data from the backend.*/
    queryFn: () => request,
  });
};

export default useTodos;
