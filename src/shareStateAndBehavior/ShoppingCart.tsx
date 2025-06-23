import { useState } from "react";
import ShoppingCartNavBar from "./ShoppingCartNavBar";
import ShoppingCartList from "./ShoppingCartList";

/* 
    ?Theory concept: How to share state between components
    To share the state between two or more components we must lift the content 
    to the closest parent of both components and then pass it as a prop

                                ShoppingCart
            ShoppingCartNavBar                  ShoppingCartList

    ShoppingCart holds the state data so it should be the only responsible for updating it.
*/
function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    "Product 1",
    "Product 2",
    "Product 3",
    "Product 4",
  ]);

  const handleOnDeleteItem = (item: string) => {
    const newItems = cartItems.filter((cartItem) => cartItem !== item);
    setCartItems(newItems);
  };
  return (
    <>
      <ShoppingCartNavBar
        cartItemsCount={cartItems.length}
      ></ShoppingCartNavBar>
      <ShoppingCartList
        cartItems={cartItems}
        onDeleteItem={handleOnDeleteItem}
      ></ShoppingCartList>
    </>
  );
}

export default ShoppingCart;
