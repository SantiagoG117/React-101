import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsQuery {
  pageSize: number;
}

const usePostInfinite = (query: PostsQuery) =>
  useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query], //Everytime the query object changes, ReactQuery will fetch the updated data from the back-end
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get(
          "https://jsonplaceholder.typicode.com/posts",
          // Query string parameters object:
          {
            params: {
              _start: (pageParam - 1) * query.pageSize,
              _limit: query.pageSize,
            },
          }
        )
        .then((response) => response.data),
    keepPreviousData: true, //Improves user experience
    /* 
      Infinite queries handle pagination automatically. We use getNextPageParam()
      to calculate the page number. 
      getNextPageParam is a function with two parameters:
        - lastPage: An array of posts
        - allPages: An array of arrays of Posts (contains the data for all pages)

       When the user clicks on the load more button react query calls this function
       to get the next page number and pass it to the query function
    */
    getNextPageParam: (lastPage, allPages) => {
      //return the next page number or an undefined object if we reach the last page
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });

export default usePostInfinite;
