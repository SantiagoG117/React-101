/* 
  ? Theory concept: How to notify the parent component about an event
*/
interface Props {
  cartItems: string[];
  handleOnClearCart: () => void;
}

function AppCart({ cartItems, handleOnClearCart }: Props) {
  return (
    <>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={handleOnClearCart}>Clear the cart</button>{" "}
      {/* Notify the Parent component about an event */}
    </>
  );
}

export default AppCart;
