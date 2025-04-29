import { useRef } from "react";
import useAddTodo from "./hooks/useAddTodo";
import { current } from "immer";

const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { error, mutate, isLoading } = useAddTodo(() => { if(ref.current) ref.current.value = ' '});

  return (
    <>
      {error && <div className="alert alert-danger">{error.message}</div>}
      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault(); //Prevents the form from being posted to the server

          if (ref.current && ref.current.value)
            //React Query sends the data to the backend using the mutation function
            mutate({
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
          <button className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
