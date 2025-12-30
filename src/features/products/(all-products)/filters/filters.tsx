import * as Form from "@radix-ui/react-form";
import {
  availabilityOptions,
  sortByOptions,
  priceRange,
  type useFilters,
} from "./useFilters";
import { FieldLayout, fieldLayoutClasses } from "../../../../design/components/form/FieldLayout";
import { Select } from "../../../../design/components/select/select";
import { Controller } from "react-hook-form";
import { Slider } from "../../../../design/components/slider/slider";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";

const YStackStyled = styled(FieldLayout.YStack)`
  .${fieldLayoutClasses.label} {
    color: #90cbad;
    font-size: 12px;
    font-weight: 500;
  }
`;

type Props = ReturnType<typeof useFilters> & {};

export const Filters: React.FC<Props> = (props) => {
  const {
    register,
    control,
    formState: { errors },
  } = props;

  return (
    <Form.Root
      className={css`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        align-items: flex-start;
      `}
    >
      <YStackStyled
        label="Name"
        fieldProps={{ name: "name" }}
        errorMessage={errors.name}
      >
        <input
          className="Input"
          type="text"
          placeholder="Search by name"
          {...register("name")}
        />
      </YStackStyled>

      <YStackStyled
        label="Availability"
        fieldProps={{ name: "availability" }}
        errorMessage={errors.availability}
      >
        <Controller
          control={control}
          name="availability"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              options={availabilityOptions}
              placeholder="Select availability"
              aria-label="Availability"
            />
          )}
        />
      </YStackStyled>

      <YStackStyled
        label="Sort By"
        fieldProps={{ name: "sortBy" }}
        errorMessage={errors.sortBy}
      >
        <Controller
          control={control}
          name="sortBy"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              options={sortByOptions}
              placeholder="Select sort option"
              aria-label="Sort By"
            />
          )}
        />
      </YStackStyled>

      <YStackStyled
        label="Price Range"
        fieldProps={{ name: "maxPrice" }}
        className={css`
          .${fieldLayoutClasses.flexWrapper} {
            gap: 0;
          }
        `}
      >
        <Controller
          control={control}
          name="maxPrice"
          render={({ field }) => {
            return (
              <Slider
                value={field.value ?? priceRange[1]}
                min={priceRange[0]}
                max={priceRange[1]}
                onValueChange={(v) => field.onChange(v)}
                ariaLabel="Max price"
              />
            );
          }}
        />
      </YStackStyled>
    </Form.Root>
  );
};
