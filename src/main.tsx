import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

/*
  Takes the component tree and renders inside an element with the id of root.
  In web applications (Browser-based), we use ReactDOM to update and render the DOM. In mobile apps we use React Native,
  which uses native components to render a user interface.

  We use the ReactDOM.createRoot method to create a root instance and call the render method on it to render the component tree.

*/
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  /* 
    Component Tree: 
    The component tree is wrapped in a React.StrictMode component to enable additional checks and warnings for the development environment.

    
  */
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
