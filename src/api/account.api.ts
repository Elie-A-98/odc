import {
  type DefaultError,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { type AccountResponseDto } from "./msw/handlers";
import { apiKeys } from "./api-keys";
import { useFetch } from "../lib/fetch/useFetch";

export const useAccount = (
  options?: Partial<
    UseQueryOptions<AccountResponseDto | undefined, DefaultError>
  >
) => {
  const { protectedFetch } = useFetch();
  return useQuery<AccountResponseDto | undefined, DefaultError>({
    queryKey: [apiKeys.account],
    queryFn: async () => {
      const res = await protectedFetch("/api/account", {
        method: "GET",
      });
      try {
        const account: AccountResponseDto = await res.json();
        return account;
      } catch (err) {
        console.error(err);
      }
    },
    retry: false,
    ...options,
  });
};
