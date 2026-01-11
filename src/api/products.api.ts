import {
  type DefaultError,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { type ProductFiltersDto, type PaginatedProductsResponseDto } from "./msw/handlers";
import { apiKeys } from "./api-keys";
import { useFetch } from "../lib/fetch/useFetch";

export const useFilteredProducts = (
  filters: ProductFiltersDto,
  options?: Partial<
    UseSuspenseQueryOptions<PaginatedProductsResponseDto, DefaultError>
  >
) => {
  const {protectedFetch} = useFetch();
  return useSuspenseQuery<PaginatedProductsResponseDto, DefaultError>({
    queryKey: [apiKeys.getProducts, filters],
    queryFn: async () => {
      const res = await protectedFetch("/api/products/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      });

      const data = (await res.json()) as PaginatedProductsResponseDto;
      return data;
    },
    retry: false,
    ...options,
  });
};
