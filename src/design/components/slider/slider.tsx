import React from "react";
import * as RadixSlider from "@radix-ui/react-slider";
import { styled } from "@linaria/react";
import { themeToken } from "../../styling/theme/theme";

const Root = styled(RadixSlider.Root)`
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;
  width: 100%;
  height: 20px;
  box-sizing: border-box;
  overflow: visible;
`;

const Track = styled(RadixSlider.Track)`
  /* right-of-handle bar */
  background: ${themeToken("palette-borders-secondary")};
  position: relative;
  flex-grow: 1;
  border-radius: 9999px;
  height: 3px;
  width: calc(100% - 16px);
  overflow: visible;
`;

const Range = styled(RadixSlider.Range)`
  /* left-of-handle (filled) bar */
  position: absolute;
  background: ${themeToken("palette-backgrounds-accent")};
  border-radius: 9999px;
  height: 100%;
`;

const Thumb = styled(RadixSlider.Thumb)`
  /* handle look */
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  background: ${themeToken("palette-backgrounds-accent")};
  border: 2px solid ${themeToken("palette-backgrounds-card-alt")};
  box-shadow: 0 1px 3px 0 ${themeToken("palette-borders-accent-50a")},
    0 1px 2px -1px ${themeToken("palette-borders-accent-50a")};
  z-index: 2;

  &:hover {
    filter: brightness(0.98);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 5px ${themeToken("palette-effects-focus-ring")};
  }
`;

const RangeLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
  color: ${themeToken("palette-text-accent")};
`;

export type SliderProps = {
  value: number;
  onValueChange: (v: number) => void;
  min?: number;
  max?: number;
  ariaLabel?: string;
  unit?: string;
};

export const Slider = React.forwardRef<
  React.ComponentRef<typeof RadixSlider.Root>,
  SliderProps
>(({ value, onValueChange, min = 0, max = 100, ariaLabel = "Slider", unit = "$" }, ref) => {
  return (
    <div>
      <RangeLabel>
        <div />
        <div>
          {unit}
          {min} - {unit}
          {value}
        </div>
      </RangeLabel>
      <Root
        ref={ref}
        value={[value]}
        min={min}
        max={max}
        step={1}
        onValueChange={(v) => onValueChange(v[0])}
      >
        <Track>
          <Range />
        </Track>
        <Thumb aria-label={ariaLabel} />
      </Root>
    </div>
  );
});

export default Slider;
