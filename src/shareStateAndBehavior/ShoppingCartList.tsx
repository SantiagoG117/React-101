//? Theory concept: How to share state between components

interface Props {
  cartItems: string[];
  onDeleteItem: (item: string) => void;
}

function ShoppingCartList({ cartItems, onDeleteItem }: Props) {
  return (
    <>
      <ul className="list-group">
        {cartItems.map((item, index) => (
          <li className="list-group-item" key={index}>
            {item}{" "}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDeleteItem(item)} // Notify the parent that the button was clicked
            >
              Delete item
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ShoppingCartList;
