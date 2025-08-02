import { useLocation, useParams, useSearchParams } from "react-router-dom";

const UserDetailPage = () => {
  // Extract parameter values from the URL
  const params = useParams();
  // Access and update the query string parameters
  const [searchParams, setSearchParams] = useSearchParams();
  // Access the current location
  const location = useLocation();

  return <p>User {params.id}</p>;
};

export default UserDetailPage;
