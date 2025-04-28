import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface PostsQuery {
  pageNumber: number;
  pageSize: number;
}

const usePostByUser = (query: PostsQuery) => {
  console.log(query);
  const fetchPosts = () =>
    axios
      .get(
        "https://jsonplaceholder.typicode.com/posts",
        // Query string parameters object:
        {
          params: {
            _start: (query.pageNumber - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        }
      )
      .then((response) => response.data);

  return useQuery<Post[], Error>({
    queryKey: ["posts", query], //Everytime the query object changes, ReactQuery will fetch the updated data from the back-end
    queryFn: fetchPosts,
    keepPreviousData: true, //Improves user experience
  });
};

export default usePostByUser;
