import { themeToken, themeVariants } from "./theme";
import { useTheme } from "./useTheme";
import SunIcon from "../../../assets/sun.svg?react";
import MoonIcon from "../../../assets/moon.svg?react";
import { styled } from "@linaria/react";

const SwitcherBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  color: ${themeToken("palette-text-accent")};
  border: 2px solid ${themeToken("palette-borders-primary")};
  height: 34px;
  width: 34px;
  padding: 4px;
  .${themeVariants.light} & {
    background: ${themeToken("palette-backgrounds-card")};
  }
  &:hover {
    background-color: ${themeToken("palette-backgrounds-card-alt")};
  }
`;

export const ThemeSwitcher: React.FC<{ className?: string }> = (props) => {
  const { className } = props;
  const { currentTheme, toggleTheme } = useTheme();

  return (
    <SwitcherBtn className={className} onClick={toggleTheme}>
      {currentTheme === "light" ? <SunIcon /> : <MoonIcon />}
    </SwitcherBtn>
  );
};
