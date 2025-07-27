import { ReactNode, useReducer } from "react";
import AuthContext from "../auth/authContext";

//? Reducer:  extracts the state management logic away from a component and encapsulates it inside a reusable function

interface Login {
  type: "LOGIN";
  username: string;
}

interface Logout {
  type: "LOGOUT";
}

export type AuthAction = Login | Logout;

 
const authReducer = (user: string, action: AuthAction): string => {
  switch (action.type) {
    case "LOGIN":
      return action.username;
    case "LOGOUT":
      return "";
  }
};


//? Custom provider: Component that provides state and actions to all its children without having to pass props manually at every level
// Has its own state (Reducer) and shares it using a Context

interface Props {
  // Represents the children components in the tree
  children: ReactNode;
}

function AuthProvider({ children }: Props) {
  const [user, dispatch] = useReducer(authReducer, "");

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {/* Pass the rest of the component tree */}
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
