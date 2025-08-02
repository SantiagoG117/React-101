import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import router from "./routing/routes";

const queryClient = new QueryClient();

/*
  Takes the component tree and renders inside a <div> element with the id of root:
    <div id="root"></div>
  
  In web applications (Browser-based), we use ReactDOM to update and render the DOM. 
  
  In mobile apps we use React Native, which uses native components to render a user interface.

  We use the ReactDOM.createRoot method to create a root instance and call the render method on it to render the component tree.

*/
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  /* 
    Component Tree: 
    The component tree is wrapped in a React.StrictMode component to enable additional checks and warnings for the development environment.    
  */
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* Provides a context for sharing a router with our application */}
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
