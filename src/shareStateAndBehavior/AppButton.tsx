/* 
  ? Theory: How to create an interface to define the type of properties to be received by the componennt
*/
interface Props {
  children: string;
  onClickButton: () => void; //Signature of the function passed as parameter from the parent component
  style?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
}

function AppButton({ children, style = "primary", onClickButton }: Props) {
  return (
    <button
      type="button"
      className={"btn btn-" + style}
      onClick={onClickButton} // Calls the function passed as parameter from the parent component
    >
      {children}
    </button>
  );
}

export default AppButton;
