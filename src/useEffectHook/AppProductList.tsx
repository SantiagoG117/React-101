import React, { useEffect, useState } from "react";

function AppProductList({ category }: { category: string }) {
  const [products, setProducts] = useState<string[]>([]);

  /* 
    ? Theory concept: useEffect() hook
    
    Fetch all the products from a server:

    useEffect is an 'after render' hook. The code inside this block is called after each render.
    the useEffect hook allows us to add any code that causes side effects and that have nothing to
    do with rendering a JSX markup like:
      1. Calling a server to store/fetch data
      2. Modifying the DOM
      3. Storing data in a local storage of the Browser
    
    We can call the useEffect multiple times for multiple purposes. But it should always be called at the top level of our components
  */

  useEffect(() => {
    console.log("Fetching products in ", category);
    setProducts(["Clothing, HouseHold"]);
  }, [category]); //<- [] Tells react to render the useEffect hook only once after the component gets re-rendered. Meaining it is not dependent on any values. By passing a variable, we are telling react that the effectHook is dependent on changes in a given prop

  return (
    <div>
      <p>{category}</p>
    </div>
  );
}

export default AppProductList;
