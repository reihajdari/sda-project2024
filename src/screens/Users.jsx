import { getAllUsers } from "../api/users";
import { useQuery } from "@tanstack/react-query";

function Users() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <h1>Error</h1>;
  }

  return <div>{data?.map(() => {})}</div>;
}

export default Users;
