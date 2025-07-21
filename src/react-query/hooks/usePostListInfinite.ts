import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  pageSize: number;
}

const usePostListInfinite = (query: PostQuery) =>
  useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query], //When the query object changes, ReactQueery will fetch the updated data from the back-end
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: (pageParam - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data),

    /* 
        getNextPageParam() is a function that determines the next page number. 
            - lastPage[]: Array of post returned by the last API
            - allPages[][]: Array of all pages fetched so far 
        
        When the user clicks on the load more button, ReactQuery calls this function
        to get the next page number and pass it to the queryFn
    */
    getNextPageParam: (lastPage, allPages) => {
      //Return the next page number or an undefined object if we reach the last page.
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });

export default usePostListInfinite;
