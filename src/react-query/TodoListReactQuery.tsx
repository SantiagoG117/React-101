import useTodos, { Todo } from "./hooks/useTodos";

const TodoListReactQuery = () => {
  
  const { data, error, isLoading } = useTodos();

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
