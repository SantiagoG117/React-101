/* 
    ? Zustand is a state management library that allows us to create global Stores to manage and share state across compnents using custom hooks
    * A Store is the object that holds the component's state and the functions (actions) that update that state 

    To use Zustand to manage the state of our application we must:
        1. Create an interface to define the shape of the store. 
        2. Create a hook encapsulating the state management logic (Same as a Reducer)

    ! Does not require a Provider or Context: Zustand's Store is Global by default and can be accessed from any component via the custom hook

    Prevent unnecessary re-rendering: Allow components to re-render only if certain pieces of data change
*/

import { create } from "zustand";

// Define the shape of the Store
interface AuhtStore {
  // State of the store
  username: string;
  // Actions to update the state
  login: (loginUsername: string) => void;
  logout: () => void;
}

// Hook to manage the state of a component (encapsulation)
const useAuthStore = create<AuhtStore>((set) => ({
  // Arrow function returns the initial state of the store
  username: "",
  // set function updates the state of the store. Takes the current state (store) and returns the updated one
  login: (loginUsername) => set(() => ({ username: loginUsername })),
  logout: () => set(() => ({ username: "" })),
}));

//? Export the Hook to share the state management logic with other components
export default useAuthStore;
