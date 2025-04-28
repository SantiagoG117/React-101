import React, { useState } from "react";
import usePostPagination from "./hooks/usePostPagination";

function PostListPagination() {
  const pageSize = 10;
  const [pageNumber, setPageNumber] = useState(1);
  const [userId, setUserId] = useState<number>();

  const { data, error, isLoading } = usePostPagination({
    // A query object is a design containing all the values for querying a set of objects
    pageNumber,
    pageSize,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {data?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        onClick={() => setPageNumber(pageNumber - 1)}
        className="btn btn-primary my-3 mx-1"
        disabled={pageNumber === 1}
      >
        {" "}
        Previous
      </button>
      <button
        onClick={() => setPageNumber(pageNumber + 1)}
        className="btn btn-primary my-3 mx-1"
      >
        {" "}
        Next
      </button>
    </>
  );
}

export default PostListPagination;
