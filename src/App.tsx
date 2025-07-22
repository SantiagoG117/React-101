import { useEffect, useRef, useState } from "react";
import AppFetch from "./AppFetch";
import PostListByUser from "./react-query/PostListByUser";
import PostListInfinite from "./react-query/PostListInfinite";
import PostListPagination from "./react-query/PostListPagination";
import TodoForm from "./react-query/TodoForm";
import TodoListReactQuery from "./react-query/TodoListReactQuery";
import TodoList from "./react-query/TodoListWithErrors";
import AppCart from "./shareStateAndBehavior/ShoppingCartList";
import AppNavBar from "./shareStateAndBehavior/ShoppingCartNavBar";
import ShoppingCart from "./shareStateAndBehavior/ShoppingCart";
import axios, { AxiosError } from "axios";
import PostList from "./react-query/PostList";
import Counter from "./state-management/Counter";
import TaskList from "./state-management/TaskList";
import LoginStatus from "./state-management/LoginStatus";

function App() {
  return (
    <>
      <LoginStatus></LoginStatus>
    </>
  );
}

export default App;
