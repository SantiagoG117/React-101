import { useReducer, useState } from "react";
import reducerFunction from "./counterReducer";
import useCounterStore from "./counterStore";

const Counter = () => {
  const { counter, increment, reset } = useCounterStore();
  return (
    <div>
      Counter ({counter})
      <button onClick={() => increment()} className="btn btn-primary mx-1">
        Increment
      </button>
      <button onClick={() => reset()} className="btn btn-primary mx-1">
        Reset
      </button>
    </div>
  );
};

export default Counter;
