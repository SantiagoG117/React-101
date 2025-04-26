import { useEffect, useState } from "react";
import userService, { User } from "../services/user-service";
import { CanceledError } from "axios";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //? GET
  useEffect(() => {
    setIsLoading(true);

    //instance of the service object
    const { request, cancel } = userService.getAll<User>();

    
    request
      .then((response) => setUsers(response.data))
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setErrorMessage(error.message);
      })
      //The block withing finally always gets executed. Regardless of whether the request gets accepted or rejected
      .finally(() => setIsLoading(false));

    //Cleanup function in case the fetched data is no longer needed
    return () => cancel();
  }, []); //<- [] Tells react to render the useEffect hook only once after the component gets re-rendered. Meaining it is not dependent on any values.

  return {
    users,
    setUsers,
    errorMessage,
    setErrorMessage,
    isLoading,
    setIsLoading,
  };
};

export default useUsers;
