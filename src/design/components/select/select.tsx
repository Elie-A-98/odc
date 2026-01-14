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
          border: 1px solid ${themeToken("palette-borders-primary")};
          background: ${themeToken("palette-backgrounds-input")};
          color: inherit;
          font-size: ${themeToken("typography-sizes-button")};
          height: ${cssFluidClamp(30, 40)};
          padding: ${themeToken("spacing-xs")};
          cursor: pointer;
          box-sizing: border-box;

          &::placeholder {
            color: ${themeToken("palette-text-muted")};
          }

          &:hover {
            border-color: ${themeToken("palette-borders-accent")};
          }

          &[data-state="open"] {
            border-color: ${themeToken("palette-borders-accent")};
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
            background: ${themeToken("palette-backgrounds-input")};
            border: 1px solid ${themeToken("palette-borders-primary")};
            border-radius: 8px;
            box-shadow: 0 4px 12px ${themeToken("palette-effects-toast-shadow")};
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
                    background: ${themeToken("palette-borders-primary")};
                  }

                  &[data-state="checked"] {
                    background: ${themeToken("palette-backgrounds-accent")};
                    color: ${themeToken("palette-text-on-accent-alt")};
                    font-weight: 500;
                  }

                  &[data-disabled] {
                    color: ${themeToken("palette-text-muted")};
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
