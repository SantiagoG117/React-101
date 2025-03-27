import axios from "axios";
import { CanceledError } from "axios";
/* 
    Axios client  with a custom configuration
*/

//Creates a new axios instance
export default axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export { CanceledError };
