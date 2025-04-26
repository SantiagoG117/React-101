import createService from "./http-service";

export interface User {
  id: number;
  name: string;
}

/* 
    Responsible for making HTTP request to the Users API client 
*/

export default createService("/users"); 
