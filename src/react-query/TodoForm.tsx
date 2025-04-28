import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "./hooks/useTodos";
import axios from "axios";

interface AddTodoContext {
  todosBeforeUpdate: Todo[];
}

const TodoForm = () => {
  const queryClient = useQueryClient();

  //?Mutation hook Generic types: <Type of data we fetch from the Server, Type of Error, Type of data we post to the server>
  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    //* Mutation function: Function responsible for performing the mutation
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todoXs", todo)
        .then((response) => response.data),

    //* Callback function called before the mutation is executed. The query cache is updated so the UI gets updated quickly (improves User Experience)
    onMutate: (newTodo: Todo) => {
      const todosBeforeUpdate =
        queryClient.getQueryData<Todo[]>(["todos"]) || []; //if the todos list is undefined, return an empty array

      //Optimistic Update: Assume that most of the time the backend calls will work
      // update the data in the cache directly: Pass the query key ['todos'] and an updater function that update the array of todos
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        newTodo, //newTodo: object send to the server from the client
        ...(todos || []), //Parenthesis is used in case todos is undefined, it will return an empty array
      ]);

      if (ref.current) ref.current.value = " ";

      return { todosBeforeUpdate }; //Context object with the previous todos before the post request
    },

    //* onSuccess callback: Function to be implemented if the mutation was successful to ensure that the UI reflects the most up-to-date state.
    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueriesData<Todo[]>(
        ["todos"],
        //Iterate over the current list of todos in the cache. If a todo matches the newTodo (object send to the server) it is being replaced with savedTodo (object that we get from the back-end after the new todo is saved)
        (todos) => todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },

    onError: (error, newTodo, context) => {
      if (!context) return;

      //Set the data in the cache to the previousTodos before the post request
      queryClient.setQueryData<Todo[]>(["todos"], context.todosBeforeUpdate);
    },
  });

  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}
      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault(); //Prevents the form from being posted to the server

          if (ref.current && ref.current.value)
            //React Query sends the data to the backend using the mutation function
            addTodo.mutate({
              //todo object
              id: 0, //Id will be defined by the server
              title: ref.current?.value,
              completed: true,
              userId: 1,
            });
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary" disabled={addTodo.isLoading}>
            {addTodo.isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
