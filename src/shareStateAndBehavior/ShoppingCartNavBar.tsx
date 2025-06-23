import React from "react";

//? Theory concept: How to share state between components
interface Props {
  cartItemsCount: number;
}

export default function ShoppingCartNavBar({ cartItemsCount }: Props) {
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            Total items in cart: {cartItemsCount}
          </span>
        </div>
      </nav>
    </>
  );
}
