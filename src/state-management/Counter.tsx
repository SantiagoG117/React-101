import { useReducer, useState } from "react";
import reducerFunction from "./reducers/counterReducer";

/* 
By implementing a Reducer, the Component is no longer responsible for state management. It is purely responsible for markup 
  - Better separation of concerns
  - Potential reusability of Reducer's logic in other components that work with Counter 
*/
const Counter = () => {
  //! State variable: const [value, setValue] = useState(0);
  const initialState = 0;
  const [value, dispatch] = useReducer(reducerFunction, initialState);

  return (
    <div>
      Counter ({value})
      <button
        //! onClick={() => setValue(value + 1)} // Increment the state
        onClick={() => dispatch({ type: "INCREMENT" })} //Calls the Reducer function and pass the current state and the type of action
        className="btn btn-primary mx-1"
      >
        Increment
      </button>
      <button
        //! onClick={() => setValue(0)} //Reset the state
        onClick={() => dispatch({ type: "RESET" })} //Calls the Reducer function and pass the current state and the type of action
        className="btn btn-primary mx-1"
      >
        Reset
      </button>
    </div>
  );
};

export default Counter;
