import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "./hooks/useTodos";
import axios from "axios";

const TodoForm = () => {
  const queryClient = useQueryClient();

  //Mutation hook
  const addTodo = useMutation({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((response) => response.data),
    //savedTodo: object that we get from the back-end. newTodo: object send to the server
    onSuccess: (savedTodo, newTodo) => {
      //Update the data in the cache directly: Pass the query key ['todos'] and an updater function that update the array of todos
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        savedTodo,
        ...(todos || []), //Parenthesis is used in case todos is undefined, it will return an empty array
      ]);
    },
  });

  const ref = useRef<HTMLInputElement>(null);

  return (
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
        <button className="btn btn-primary">Add</button>
      </div>
    </form>
  );
};

export default TodoForm;
