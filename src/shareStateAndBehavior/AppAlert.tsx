import React from "react";

/* 
  ? Theory concept: Passign children of any kind (including HTML markup) to a component
*/



interface Prop {
  children: React.ReactNode; //Allows to pass any type of children, including HTML markup
  onClose?: () => void; //Signature of the function passed as parameter from the parent component
}



const Alert = ({ children, onClose }: Prop) => {
  return (
    <div className="alert alert-primary alert-dismissible fade show" role="alert">
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose} //Calls the function passed as parameter from the parent component
      ></button>
    </div>
  );
};

export default Alert;
