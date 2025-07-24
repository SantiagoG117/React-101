import React, { ReactNode, useReducer } from "react";
import authReducer from "../reducers/authReducer";
import AuthContext from "../contexts/authContext";

interface Props {
  // Represents the components in our tree
  children: ReactNode;
}

//? Custom provider: Has its own state and shares it using a context
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
