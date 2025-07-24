interface Action {
  type: "LOGIN" | "LOGOUT";
}

interface Login {
  type: "LOGIN";
  username: string;
}

interface Logout {
  type: "LOGOUT";
}

export type AuthAction = Login | Logout;

/* 
  ? A reducer extracts the state management complexity away from a component and 
  ? encapsulates it inside a reusable function
*/

const authReducer = (user: string, action: AuthAction): string => {
  switch (action.type) {
    case "LOGIN":
      return action.username;
    case "LOGOUT":
      return "";
  }
};

export default authReducer;
