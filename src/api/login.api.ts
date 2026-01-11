import {
  type DefaultError,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { type LoginResponseDto, type LoginRequestDto } from "./msw/handlers";
import { apiKeys } from "./api-keys";
import { useFetch } from "../lib/fetch/useFetch";

export const useLogin = () => {
  const {protectedFetch} = useFetch();
  const queryClient = useQueryClient();
  return useMutation<
    LoginResponseDto | undefined,
    DefaultError,
    LoginRequestDto
  >({
    mutationFn: (dto) =>
      protectedFetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
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
