import * as Form from "@radix-ui/react-form";
import type { ComponentProps, PropsWithChildren, PropsWithoutRef } from "react";
import React from "react";
import { styled } from "@linaria/react";
import { cssFluidClamp } from "../../styling/theme/theme";
import type { FieldError } from "react-hook-form";
import { css } from "@linaria/core";

export const fieldLayoutClasses = {
  label: css``,
  flexWrapper: css``
};

const YFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Label = styled(Form.Label)`
  font-size: 14px;
  font-weight: 600;
`;
const ErrorMessage = styled(Form.Message)`
  color: red;
  font-size: ${cssFluidClamp(12, 14)};
  margin-top: 3px;
`;

const FormControl = styled(Form.Control)`
  &[aria-invalid="true"]{
    border-color: red;
  }
`

type LayoutProps = PropsWithChildren<{
  label: string;
  fieldProps: Omit<PropsWithoutRef<ComponentProps<typeof Form.Field>>, 'className'>;
  errorMessage?: FieldError;
  className?: string;
}>;

const YStack = React.forwardRef<
  React.ComponentRef<typeof Form.Field>,
  LayoutProps
>((props, ref) => {
  const { fieldProps, label, errorMessage, children, className } = props;

  return (
    <Form.Field ref={ref} className={className} {...fieldProps}>
      <YFlexWrapper className={fieldLayoutClasses.flexWrapper}>
        <TitleWrapper>
          <Label className={fieldLayoutClasses.label}>{label}</Label>
          {errorMessage && (
            <ErrorMessage name={fieldProps.name}>
              {errorMessage?.message}
            </ErrorMessage>
          )}
        </TitleWrapper>
        <FormControl asChild aria-invalid={!!errorMessage}>
          {children}
        </FormControl>
      </YFlexWrapper>
    </Form.Field>
  );
});

export const FieldLayout = { YStack };
