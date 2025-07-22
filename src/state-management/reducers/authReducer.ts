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

type AuthAction = Login | Logout;

const authReducer = (user: string, action: AuthAction): string => {
  switch (action.type) {
    case "LOGIN":
      return action.username;
    case "LOGOUT":
      return "";
  }
};

export default authReducer;
