import { css, cx } from "@linaria/core";
import LoaderIcon from "../../../assets/loader.svg?react";
import { themeToken } from "../../styling/theme/theme";

export const Loader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cx(
        css`
          color: ${themeToken("palette-text-accent")};

          @keyframes scale {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
            }
          }
          animation: scale 1s linear infinite;
        `,
        className
      )}
    >
      <LoaderIcon
        className={css`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          animation: spin 2s linear infinite;
        `}
      />
    </div>
  );
};
