import { css } from "@linaria/core";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cssFluidClamp, themeToken } from "../../styling/theme/theme";
import React from "react";

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: Record<string, string>;
  disabled?: boolean;
  "aria-label"?: string;
};

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(({
  value,
  onValueChange,
  placeholder = "Select an option",
  options,
  disabled = false,
  "aria-label": ariaLabel,
}, ref) => {
  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        ref={ref}
        className={css`
          display: flex;
          width: 100%;
          /* Try to visually match input styles defined in the theme */
          align-items: center;
          justify-content: space-between;
          border-radius: 8px;
          border: 1px solid #31684d;
          background: #10231a; /* same as inputs */
          color: inherit;
          font-size: ${themeToken("typography-sizes-button")};
          height: ${cssFluidClamp(30, 40)};
          padding: ${themeToken("spacing-xs")};
          cursor: pointer;
          box-sizing: border-box;

          &::placeholder {
            color: rgba(144, 203, 173, 0.5);
          }

          &:hover {
            border-color: #0df280;
          }

          &[data-state="open"] {
            border-color: #0df280;
          }
        `}
        aria-label={ariaLabel}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon />
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className={css`
            background: #10231a; /* match input background */
            border: 1px solid #31684d;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            min-width: var(--radix-select-trigger-width);
            box-sizing: border-box;
          `}
          position="popper"
          sideOffset={4}
        >
          <SelectPrimitive.Viewport
            className={css`
              padding: ${themeToken("spacing-xs")};
            `}
          >
            {Object.entries(options).map(([value, label]) => (
              <SelectPrimitive.Item
                key={value}
                value={value}
                className={css`
                  padding: ${themeToken("spacing-xs")} ${themeToken(
                    "spacing-s"
                  )};
                  cursor: pointer;
                  border-radius: 4px;
                  color: inherit;
                  outline: none;
                  transition: background 0.15s, color 0.15s;

                  &:hover {
                    background: #31684d;
                  }

                  &[data-state="checked"] {
                    background: #0df280;
                    color: #10231a;
                    font-weight: 500;
                  }

                  &[data-disabled] {
                    color: #6b7280;
                    cursor: not-allowed;
                  }
                `}
              >
                <SelectPrimitive.ItemText>{label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});
