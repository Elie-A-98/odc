import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const priceRange = [1, 4000] as const;

export const sortByOptions = {
  name: "Name",
  price: "Price",
  "-": "-",
} as const;

export const availabilityOptions = {
  inStock: "In Stock",
  arrivingSoon: "Arriving Soon",
  all: "All",
} as const;

const schema = z.object({
  name: z.string(),
  sortBy: z.enum(
    Object.keys(sortByOptions) as Array<keyof typeof sortByOptions>
  ),
  availability: z.enum(
    Object.keys(availabilityOptions) as Array<keyof typeof availabilityOptions>
  ),
  maxPrice: z.number(),
});

export type FilterValues = z.infer<typeof schema>;

export const useFilters = () => {
  const form = useForm({
    defaultValues: {
      availability: "all",
      maxPrice: priceRange[1],
      name: "",
      sortBy: "-",
    },
    resolver: zodResolver(schema),
  });

  return form;
};
