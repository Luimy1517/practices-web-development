import { fetchUsers } from "../services/users";
import { useInfiniteQuery } from "@tanstack/react-query";
import { type User } from "../types.d";

export const useUsers = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["users"], // <- la key de la información o de la query
      queryFn: fetchUsers,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 3,
    });

  return {
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    users: data?.pages.flatMap((page) => page.users) ?? [],
    hasNextPage,
  };
};
