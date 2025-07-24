import { useContext, useReducer, useState } from "react";
import authReducer from "./reducers/authReducer";
import AuthContext from "./contexts/authContext";
import useAuth from "./hooks/useAuth";

const LoginStatus = () => {
  // const [user, setUser] = useState("");
  const { user, dispatch } = useAuth();
  const [username, setUserName] = useState("");

  if (user)
    return (
      <>
        <div>
          <span className="mx-2">{user}</span>
          <a onClick={() => dispatch({ type: "LOGOUT" })} href="#">
            Logout
          </a>
        </div>
      </>
    );
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "LOGIN", username });
        }}
      >
        <input
          type="text"
          placeholder="Enter username"
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginStatus;
