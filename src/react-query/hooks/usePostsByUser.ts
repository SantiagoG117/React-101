import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const usePostsByUser = (userId: number | undefined) => {
  const fetchPosts = () =>
    axios
      .get(
        "https://jsonplaceholder.typicode.com/posts",
        // Query string parameters object:
        {
          params: {
            userId,
          },
        }
      )
      .then((response) => response.data);

  return useQuery<Post[], Error>({
    /* 
      When dealing with hierarchical data, we must structure the queryKey following a hierarchical
      structure that represents the relationship between the data. In this case user -> userId -> posts.

      The pattern is the same pattern that we use when designing URLs for APIs: user/userId/posts

      userId is the parameter for this query. Everytime the value for userId changes, react query 
      will fetch the posts for that user from the back-end.
    */
    queryKey: userId ? ["users", userId, "posts"] : ["posts"], //Set up the key dynamically depending of whether or not an userId was selected
    queryFn: fetchPosts,
  });
};

export default usePostsByUser;
