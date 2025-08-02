import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserList from "./UserList";
import useAuth from "./hooks/useAuth";

function UsersPage() {
  
  return (
    <div className="row">
      <div className="col">
        <UserList />
      </div>
      <div className="col">
        {/* At runtime, depending on the paths defined under the children property, outlet will render different components */}
        <Outlet />
      </div>
    </div>
  );
}


export default UsersPage;
