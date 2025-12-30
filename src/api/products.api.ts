import {
  type DefaultError,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { type ProductFiltersDto, type PaginatedProductsResponseDto } from "./msw/handlers";
import { apiKeys } from "./api-keys";
import { wrappedFetch } from "./msw/fetch-utils";

export const useFilteredProducts = (
  filters: ProductFiltersDto,
  options?: Partial<
    UseSuspenseQueryOptions<PaginatedProductsResponseDto, DefaultError>
  >
) => {
  return useSuspenseQuery<PaginatedProductsResponseDto, DefaultError>({
    queryKey: [apiKeys.getProducts, filters],
    queryFn: async () => {
      const res = await wrappedFetch("/api/products/filter", {
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
