//? React Context work like a truck transporting a box, in which we can save some state

import { Dispatch } from "react";
import { AuthAction } from "../reducers/authReducer";
import React from "react";

//? Define the shape of the state we wish the transport (Shape of the box)
interface AuthContextType {
  user: string;
  //Dispatch is a type that represents a function taking an atgument and returning void.
  dispatch: Dispatch<AuthAction>;
}

//? Define the Context (the Truck) we wish to share in our component tree
const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
