import React, { useState } from "react";

/* 
  ? Theory concept: How to use the state hook
*/

interface Props {
  /* 
    Since we are using a string type for the text, we can use the built-in methods for string
    provided by JavaScript. To get a substring of a string, we can use the slice method.
  */
  children: string;
  maxChars?: number; //? Makes it optional
}

function AppExpandableText({ children, maxChars = 100 }: Props) {
  /* We should use the statehook only for 
        - Values that may change over time and their change require re-rendering the component 
        - Values that are not derived from props (which should be immutable) and that are defined in the rendering section of the component.
    */
  const [isExpanded, setIsExpanded] = useState(false);
  const summarizedText = isExpanded ? children : children.slice(0, maxChars); //The magic happens here. The number of characters to be displayed is determined by the isExpanded state

  //?Edge case: if the text is smaller or equal to the maxChars, we don't need to show the button or the '...'
  if (children.length <= maxChars) return <p>{children}</p>;

  return (
    <p>
      {summarizedText}...{" "}
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Less" : "More"}
      </button>{" "}
    </p>
  );
}

export default AppExpandableText;
