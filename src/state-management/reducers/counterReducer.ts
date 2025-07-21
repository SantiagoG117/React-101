/* 
    ? Reducer: A function that allows us to encapsulate a component's state updates in a separate function.

    As a component grows in complexity. Keeping track on how a state gets updated also becomes more challenging.
    With a reducer we can extract the state management logic of a component and centralize it inside a single function.

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
