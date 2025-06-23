import { useState } from "react";

/*
    ? Theory concept: Properties
    How can we make this component more reusable? 
    We can use props (properties) which are the inputs of a component and are used to pass data from a parent component to a child component in React.
    To use props we must first define their shape. For this, we can use an interface to define the data type of the props we wish to use.
*/
interface Props {
  items: { name: string; id: number }[];
  heading: string;
  //Signature of the function (event) sent from the parent component
  onSelectItem: (item: { name: string; id: number }) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>List of {heading}</h1>
      {items.length === 0 && <p>No {heading} to display</p>}

      <ul className="list-group">
        {/* To render a list in JSX, we use the ‘array.map()’ method. When mapping items, each item must have a unique key, which can be a string or a number. */}
        {items.map((city, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={city.id}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(city); // Notifies the parent component that an item was selected
            }}
          >
            {city.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
