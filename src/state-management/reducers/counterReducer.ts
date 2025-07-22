/* 
    ? Reducer: A function that encapsulates a component's state logic

    As a component grows in complexity it becomes more challenging to keep track of its state logic.
    A Reducer extracts the state management complexity away from the component
    params:
        - state: current state
        - action: an object that describes what the user is trying to do

    return: 
        The new state
*/

interface Action {
  // By convention we annotate the action param to an object with a type property set to the literal values that are accepted as Actions (prevents typos and ensures consistency)
  type: "INCREMENT" | "RESET";
}

const reducerFunction = (state: number, action: Action): number => {
  if (action.type === "INCREMENT") return state + 1;
  if (action.type === "RESET") return 0;
  return state; // By convention if the type of action is not supported return the state
};

export default reducerFunction;
