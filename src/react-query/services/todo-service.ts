import ApiClient from "./api-client";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

/* 
  Export an instance of the API client responsible for making HTTP request to the /todos endpoint
  defined by the provided baseURL and working with Todo data.
*/

export default new ApiClient<Todo>(
  "https://jsonplaceholder.typicode.com",
  "/todos"
);
