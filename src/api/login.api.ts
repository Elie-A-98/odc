import {
  type DefaultError,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { type LoginResponseDto, type LoginRequestDto } from "./msw/handlers";
import { apiKeys } from "./api-keys";
import { wrappedFetch } from "./msw/fetch-utils";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<
    LoginResponseDto | undefined,
    DefaultError,
    LoginRequestDto
  >({
    mutationFn: (dto) =>
      wrappedFetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
        credentials: "include",
      }).then(async (res) => {
        return (await res.json()) as LoginResponseDto;
      }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [apiKeys.account],
      });
    },
  });
};
