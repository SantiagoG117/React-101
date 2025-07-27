import { useState } from "react";
import useAuth from "./useAuth";
import useAuthStore from "../authZustand/authStore";
import useCounterStore from "../counter/counterStore";

const LoginStatus = () => {
  const [user, setUser] = useState("");
  const { username, login, logout } = useAuthStore();

  if (username)
    return (
      <>
        <div>
          <span className="mx-2">{username}</span>
          <a onClick={() => logout()} href="#">
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
          login(user); //Takes the local state and sends it to the store
        }}
      >
        <input
          type="text"
          placeholder="Enter username"
          onChange={(e) => setUser(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginStatus;
