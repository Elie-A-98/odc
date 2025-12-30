import {
  type DefaultError,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { type AccountResponseDto } from "./msw/handlers";
import { apiKeys } from "./api-keys";
import { wrappedFetch } from "./msw/fetch-utils";

export const useAccount = (
  options?: Partial<UseQueryOptions<AccountResponseDto | undefined, DefaultError>>
) => {
  return useQuery<AccountResponseDto | undefined, DefaultError>({
    queryKey: [apiKeys.account],
    queryFn: async () => {
      const res = await wrappedFetch("/api/account", {
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
