import { useState } from "react";
import usePostList from "./hooks/usePostList";

function PostList() {
  const [userId, setUserId] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 5;

  const { data, error, isLoading } = usePostList({
    userId,
    pageNumber,
    pageSize,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <select
        onChange={(event) => {
          const value = Number((event.target as HTMLSelectElement).value);
          setUserId(value === 0 ? undefined : value);
        }}
        className="form-select mb-3 mt-3"
      >
        {/* Refresh the data when all posts is selected*/}
        <option value="0" onClick={() => setPageNumber(1)}>
          All Posts
        </option>
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
      <button
        className="btn btn-primary my-3 mx-1"
        onClick={() => setPageNumber(pageNumber - 1)}
        disabled={pageNumber === 1}
      >
        previus
      </button>
      <button
        className="btn btn-primary my-3 mx-1"
        onClick={() => setPageNumber(pageNumber + 1)}
        disabled={data.length === 0}
      >
        next
      </button>
    </>
  );
}

export default PostList;
