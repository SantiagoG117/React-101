/* 
    ? Zustand is a state management library that allows us to create global Stores  to manage and share state across compnents using custom hooks
    * A Store is the object that holds the component's state and the functions (actions) that update that state 

    To use Zustand to manage the state of our application we must:
        1. Create an interface to define the shape of the store. 
        2. Create a hook encapsulating the state management logic (Same as a Reducer)

    ! Does not require a Provider or Context: Zustand's Store is Global by default and can be accessed from any component via the custom hook
    Prevent unnecessary re-rendering: Allow components to re-render only if certain pieces of data change

*/

import { create } from "zustand";

// Define Shape of the Store
interface CounterStore {
  //State of the store
  counter: number;
  max: number;
  // Actions that update the state
  increment: () => void;
  reset: () => void;
}

// Hook to manage the state of a component (encapsulation)
const useCounterStore = create<CounterStore>((set) => ({
  // Initial state of the store
  counter: 0,
  max: 5,
  // set function updates the state of the store. Takes the current state (store) and returns the updated one
  increment: () => set((store) => ({ counter: store.counter + 1 })),
  reset: () => set(() => ({ max: 10  })),
}));

export default useCounterStore;
