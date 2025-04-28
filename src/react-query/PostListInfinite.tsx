import React, { useState } from "react";
import usePostInfinite from "./hooks/usePostInfinite";

function PostListInfinite() {
  const pageSize = 10;
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
    usePostInfinite({
      // A query object is a design containing all the values for querying a set of objects
      pageSize,
    });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {/* 
            data is an instance of InfiniteData. The pages parameter contains the data for all pages
            We must iterate over each page and render the data for each page separately
        */}
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <button
        disabled={isFetchingNextPage}
        onClick={() => fetchNextPage()} //calls getNextPageParam in the user to calculate the next page number
        className="btn btn-primary my-3 mx-1"
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </button>
    </>
  );
}

export default PostListInfinite;
