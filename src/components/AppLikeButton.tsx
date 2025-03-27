import { useState } from "react";
interface Props {
  size: number;
  onClick: () => void;
}

function AppLikeButton({ size, onClick }: Props) {
  const [isVisible, setVisibility] = useState(false);
  let count = 0;

  const handleClick = () => {
    setVisibility(!isVisible);
    count++;
    //Other  states
    console.log(isVisible);
  }; //<- React patches all the events and executes them after the event handler completes its execution. That way the component gets re-rendered only once.

  return (
    <div>
      <button onClick={handleClick}>Show</button>
    </div>
  );
}

export default AppLikeButton;
