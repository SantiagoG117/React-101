import React, { useEffect, useState } from "react";
import { CanceledError } from "../services/api-client";
import userService, { type User } from "../services/user-service";
import useUsers from "../hooks/useUsers";

/* Service Contains all the logic related to handeling http request */

function AppFetch() {
  const {
    users,
    setUsers,
    errorMessage,
    setErrorMessage,
    isLoading,
    setIsLoading,
  } = useUsers();

  //? POST
  const handleOnCreate = () => {
    /* 
        Optimistic update:
            1. Update the UI
            2. Call the server
        
        With this approach we assume that the call to the server will succeed most of the time. So we update the UI to give the user an instant feedback
        and then persist the changes in the server. This will make our UI much faster
    */

    const newUser = { id: 0, name: "Santiago" };

    //Save a copy of the original users:
    const originalUsers = [...users];

    //Update the UI:
    setUsers([newUser, ...users]);

    //Call the server to store persistent changes
    userService
      .create(newUser)
      .then((response) => setUsers([response.data, ...users]))
      .catch((error) => {
        setErrorMessage(error.message);
        //In case of error, restore the UI back to its original state
        setUsers(originalUsers);
      });
  };

  //? DELETE
  const handleOnDelete = (user: User) => {
    /* 
        Optimistic update:
            1. Update the UI
            2. Call the server
        
        With this approach we assume that the call to the server will succeed most of the time. So we update the UI to give the user an instant feedback
        and then persist the changes in the server. This will make our UI much faster
    */

    // Save a copy of the original users
    const originalUsers = [...users];

    // Update the UI
    setUsers(users.filter((u) => u.id !== user.id));

    //Call the server to implement persisten changes
    userService.delete(user.id).catch((error) => {
      setErrorMessage(error.message);
      //In case of an error restore the UI back to its original state
      setUsers(originalUsers);
    });
  };

  //? PUT
  const handleOnUpdate = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + " Updated" };

    /* 
        To update an object using apiClient we have to options:
            - put: Replace an object in the server
            - patch: Replace one or more of the properties of the object
            
        The option that we chose depends on what is supported by the back-end. 
    */

    /*
    Update the UI 
        Everytime we wish to update objects we can use the map() function.
        map will call the callback function on each item in the array. If the current user (u) has an id equal to the updated user, return the updated user.
        otherwise return the current user.
    */
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.update(updatedUser).catch((error) => {
      setErrorMessage(error.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      {isLoading && <div className="spinner-border"></div>}

      <button
        className="btn - btn-primary mb-3 mt-3 mx-1"
        onClick={handleOnCreate}
      >
        Add User
      </button>

      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary"
                onClick={() => handleOnUpdate(user)}
              >
                Update
              </button>

              <button
                className="btn btn-outline-danger mx-2"
                onClick={() => handleOnDelete(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default AppFetch;
