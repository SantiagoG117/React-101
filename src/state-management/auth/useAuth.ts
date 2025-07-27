import { useContext } from "react";
import AuthContext from "./authContext";
//? Custom hook for accessing the context
const useAuth = () => useContext(AuthContext);

export default useAuth;
