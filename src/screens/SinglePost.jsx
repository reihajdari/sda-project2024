import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSingleUser } from "../api/users";

function SinglePost() {
  const params = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", params.userId],
    queryFn: () => getSingleUser(params.userId),
    enabled: params.userId ? true : false,
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <h1>Is Error</h1>;
  }

  return (
    <div>
      SinglePost with user id: {params.userId} and Post Id {params.postId}
      {data?.name}
    </div>
  );
}

export default SinglePost;
