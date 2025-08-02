import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt,
        mollitia!
      </p>
      {/* Replacement for anchor <a> element. Prevents full page reloads from the server when clicking a hyperlink */}
      <Link to="/users">Users</Link>
    </>
  );
};

export default HomePage;
