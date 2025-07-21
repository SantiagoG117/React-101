
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface QueryObject {
  userId: number | undefined;
  pageNumber: number;
  pageSize: number;
}

const usePostList = (queryObject: QueryObject) => {
  const getPosts = () => {
    return axios
      .get("https://jsonplaceholder.typicode.com/posts", {
        params: {
          userId: queryObject.userId,
          _start: (queryObject.pageNumber - 1) * queryObject.pageSize,
          _limit: queryObject.pageSize,
        },
      })
      .then((res) => res.data);
  };


  return useQuery<Post[], Error>({
    queryKey:
      queryObject.userId
        ? ["users", queryObject.userId, "posts", queryObject]
        : ["posts", queryObject],
    queryFn: getPosts,
    keepPreviousData: true,
    staleTime: 1 * 60 * 1000,
  });
};

export default usePostList;
