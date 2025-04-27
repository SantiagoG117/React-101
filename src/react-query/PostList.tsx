import axios from "axios";
import { useEffect, useState } from "react";
import usePosts from "./hooks/usePosts";

/* 
    TODOS:
    ! Create separation of concerns and modularity
    ! Implement a ReactQuery object for:
        - Automatic refresh
        - Caching 
        - Autoretries in case the request to the server fails
    ! Replace state variables and useEffect hook

*/

const PostList = () => {
  const [userId, setUserId] = useState<number>();
  const { data, error, isLoading } = usePosts(userId);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <select
        onChange={(event) =>
            setUserId(Number((event.target as HTMLSelectElement).value))
            
        }
        value={userId}
        className="form-select mb-3 mt-3"
      >
        <option value=""></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul className="list-group">
        {data?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostList;
