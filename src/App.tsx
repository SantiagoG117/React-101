import AppFetch from "./AppFetch";
import PostListByUser from "./react-query/PostListByUser";
import PostListInfinite from "./react-query/PostListInfinite";
import PostListPagination from "./react-query/PostListPagination";
import TodoForm from "./react-query/TodoForm";
import TodoListReactQuery from "./react-query/TodoListReactQuery";
import TodoList from "./react-query/TodoListWithErrors";

function App() {
  return (
    <>
      <TodoForm />
      <TodoListReactQuery />
    </>
  );
}

export default App;
