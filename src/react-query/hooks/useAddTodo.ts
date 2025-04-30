import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import todoService, { Todo } from "../services/todo-service";

interface AddTodoContext {
  todosBeforeUpdate: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();

  //?Mutation hook Generic types: <Type of data we fetch from the Server, Type of Error, Type of data we post to the server, Type of context object>
  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    //* Mutation function: Responsible for performing the mutation
    mutationFn: (todo: Todo) => todoService.create(todo),

    //* Callback function called before the mutation is executed for Optimistic updates. The cache is updated so the UI reflects the updated data quicly, improving User Experience
    onMutate: (newTodo: Todo) => {
      //Get the data from the query cache before the mutation takes place
      const todosBeforeUpdate =
        queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || []; //If the todos array is undefined, return an empty array

      //Optimistic Update: Assume most of the time the backend calls will succeed
      //Update the data in the cache directly: Pass the query key ['todos'] and an updater function
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) => [
        newTodo, //Object send to the server from the client. Here is where the optimistic update takes place
        ...(todos || []),
      ]);

      //Function send by the consumer of this hook to specify what to do after the mutation takes place
      onAdd();

      return { todosBeforeUpdate }; //Context object with the data before the post request
    },

    //* Callback function to be called if the mutation was successful
    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueriesData<Todo[]>(
        // Query key
        CACHE_KEY_TODOS,
        // Updater function: Replace the newTodo (object sent to the server from the client-side) in the cache with the savedTodo (Object we get from the server after the mutation takes place)
        (todos) => todos?.map((todo) => (todo === newTodo ? savedTodo : todo)) //Iterate over the todos in the cache. If the current todo matches the newTodo it will be replaced with the savedTodo. This is essentially a swap
      );
    },

    //* Callback function to be called if the mutation was unsuccessful. context contains the context object returned by onMutate
    onError: (error, newTodo, context) => {
      queryClient.setQueryData<Todo[]>(
        CACHE_KEY_TODOS,
        context?.todosBeforeUpdate
      );
    },
  });

  return addTodo;
};

export default useAddTodo;
