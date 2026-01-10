import { css } from "@linaria/core";
import _ from "lodash";
import { between } from "polished";

const VIEWPORT_MIN_PX = 390;
const VIEWPORT_MAX_PX = 1920;

type Color = [string, string]; // [sRGB, P-3] color-gamuts

const colorTokens = {
  "spring-green-68": ["#90CBAD", "#90CBAD"],
  "spring-green-10": ["#102219", "#102219"],
  "spring-green": ["#0DF280", "#0DF280"],
  "white-solid": ["#fff", "#fff"],
  "gray-light-1": ["#ebf5e7", "oklch(95.8% 0.0209 137)"],
  "gray-light-10": ["#50813a", "oklch(55.2% 0.1152 137)"],
} as const satisfies Record<string, Color>;

type ColorTokens = keyof typeof colorTokens;

const fontTokens = {
  manrope: "manrope",
} as const;

type Fonts = {
  [K in keyof typeof fontTokens]: `${K}${string}`;
};

type Theme = {
  header: {
    height: string;
  };
  spacing: {
    xxs: string;
    xs: string;
    s: string;
    m: string;
    xm: string;
    l: string;
  };
  palette: {
    text: {
      primary: ColorTokens;
      "tertiary-inverted": ColorTokens;
      "primary-inverted": ColorTokens;
      secondary: ColorTokens;
    };
    surfaces: {
      primary: ColorTokens;
      "primary-inverted": ColorTokens;
    };
  };
  typography: {
    fonts: Fonts;
    sizes: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      h5: string;
      button: string;
    };
    lineHeights: {
      body: string;
      heading: string;
      ui: string;
    };
  };
};

const baseTheme = {
  header: {
    height: "73px",
  },
  spacing: {
    xxs: cssFluidClamp(8, 9),
    xs: cssFluidClamp(9, 12),
    s: cssFluidClamp(12, 16),
    m: cssFluidClamp(16, 24),
    xm: cssFluidClamp(24, 32),
    l: cssFluidClamp(32, 40),
  },
  typography: {
    fonts: {
      manrope: `${fontTokens.manrope}, sans-serif`,
    },
    sizes: {
      h1: cssFluidClamp(24, 32),
      h2: cssFluidClamp(20, 26),
      h3: cssFluidClamp(16, 22),
      h4: cssFluidClamp(16, 18),
      h5: cssFluidClamp(14, 16),
      button: "14px",
    },
    lineHeights: {
      body: "1.6",
      heading: "1.25",
      ui: "1.2",
    },
  },
} as const satisfies Partial<Theme>;

const lightTheme: Theme = _.merge({}, baseTheme, {
  palette: {
    surfaces: {
      primary: "spring-green-10",
      "primary-inverted": "spring-green",
    },
    text: {
      primary: "white-solid",
      "tertiary-inverted": "spring-green-68",
      "primary-inverted": "gray-light-1",
      secondary: "gray-light-10",
    },
  },
} satisfies Partial<Theme>);

const darkTheme: Theme = _.merge({}, baseTheme, {
  palette: {
    surfaces: {
      primary: "spring-green-10",
      "primary-inverted": "spring-green",
    },
    text: {
      primary: "white-solid",
      "tertiary-inverted": "spring-green-68",
      "primary-inverted": "gray-light-1",
      secondary: "gray-light-10",
    },
  },
} satisfies Partial<Theme>);

export const themeVariants = {
  light: "light",
  dark: "dark",
} as const;

type TokenPath<T = Theme, First extends boolean = true> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? `${First extends false ? "-" : ""}${K}${TokenPath<T[K], false>}`
        : never;
    }[keyof T]
  : "";

/**
 * This is over engineered but it allowed me to edit my theme on the fly without needing to always inject the needed css properties later in the global css
 *
 * @param tree the object to parse
 * @param parserOptions how to parse the value. 'raw' will use the value from the tree as it is, 'css-var' will wrap the value in a var(...)
 * @param root the root from the object to start from
 * @returns
 */
const parseAsCssVars = <TTree extends object>(
  tree: TTree,
  parserOptions: { valueType: "raw" | "css-var" },
  root?: keyof TTree
) => {
  const extractLeafsAsCssVars = (
    obj: unknown
  ): { name: string; value: unknown }[] => {
    if (obj == null || typeof obj !== "object")
      return [
        {
          name: "",
          value: obj as unknown,
        },
      ];
    return Object.entries(obj)
      .map(([key, value]) =>
        extractLeafsAsCssVars(value).map((rightPart) => ({
          name: `${key}${rightPart.name !== "" ? `-${rightPart.name}` : ""}`,
          value: `${rightPart.value}`,
        }))
      )
      .flat();
  };

  return extractLeafsAsCssVars(root ? tree[root] : root).map(
    ({ name, value }) => ({
      name: `--${root && `${root.toString()}-`}${name}`,
      value: `${
        parserOptions.valueType === "css-var" ? `var(--${value})` : value
      }`,
    })
  );
};

const serializeColorTokensAsCssVars = (colorMode: "sRGB" | "P3") =>
  Object.entries(colorTokens)
    .map(
      ([key, [sRGB, P3]]) => `
            --${key}: ${colorMode === "sRGB" ? sRGB : P3};
      `
    )
    .join("\n");

void css`
  :global() {
    /* Define primitive tokens */

    :root {
      ${serializeColorTokensAsCssVars("sRGB")}

      ${parseAsCssVars(baseTheme, { valueType: "raw" }, "spacing")
        .map(({ name, value }) => `${name}:${value};`)
        .join("\n")}
    }
    :root {
      @supports (color: color(display-p3 1 1 1)) {
        @media (color-gamut: p3) {
          ${serializeColorTokensAsCssVars("P3")}
        }
      }
    }

    /* Define semantic tokens (the ones that are defined in the theme)*/

    :root {
      /* Fonts are parsed before custom props, so font tokens are not included as vars */
      ${parseAsCssVars(baseTheme, { valueType: "raw" }, "typography")
        .map(({ name, value }) => `${name}:${value};`)
        .join("\n")}

      ${parseAsCssVars(baseTheme, { valueType: "raw" }, "header")
        .map(({ name, value }) => `${name}:${value};`)
        .join("\n")}
    }

    :root.${themeVariants.dark} {
      ${parseAsCssVars(darkTheme, { valueType: "css-var" }, "palette")
        .map(({ name, value }) => `${name}:${value};`)
        .join("\n")}
    }

    :root.${themeVariants.light} {
      ${parseAsCssVars(lightTheme, { valueType: "css-var" }, "palette")
        .map(({ name, value }) => `${name}:${value};`)
        .join("\n")}
    }

    /* Define some defaults using the semantic tokens defined in the previous step */

    @media (prefers-reduced-motion: reduce) {
      * {
        animation: none;
      }
    }

    @font-face {
      font-family: ${fontTokens.manrope};
      src: url("/src/assets/fonts/Manrope-VariableFont.woff2")
        format("woff2-variations");
      font-weight: 100 900;
      font-style: normal;
      font-display: swap;
    }

    :root {
      color: ${themeToken("palette-text-primary")};
    }

    body {
      font-family: ${themeToken("typography-fonts-manrope")}, sans-serif;
      font-weight: 400;
      line-height: ${themeToken("typography-lineHeights-body")};
      background: ${themeToken("palette-surfaces-primary")};
      color: ${themeToken("palette-text-primary")};
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
      line-height: ${themeToken("typography-lineHeights-heading")};
    }

    h1 {
      font-size: ${themeToken("typography-sizes-h1")};
      font-weight: 700;
    }

    h2 {
      font-size: ${themeToken("typography-sizes-h2")};
      font-weight: 600;
    }

    h3 {
      font-size: ${themeToken("typography-sizes-h3")};
      font-weight: 600;
    }

    h4 {
      font-size: ${themeToken("typography-sizes-h4")};
      font-weight: 600;
    }

    h5 {
      font-size: ${themeToken("typography-sizes-h5")};
      font-weight: 600;
    }

    button {
      border: 0;
      outline: 0;
      display: inline-block;
      font-family: ${themeToken("typography-fonts-manrope")};
      font-weight: 700;
      font-size: ${themeToken("typography-sizes-button")};
      padding-inline: ${themeToken("spacing-s")};
      padding-block: ${themeToken("spacing-xxs")};
      background-color: #224936;
      border-radius: 8px;
      white-space: nowrap;
      color: inherit;
      cursor: pointer;
      box-sizing: border-box;
      line-height: ${themeToken("typography-lineHeights-ui")};
    }

    input,
    textarea {
      width: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      border-radius: 8px;
      border: 1px solid #31684d;
      background: #10231a;
      font-size: ${cssFluidClamp(14, 16)};
      color: inherit;
      height: ${cssFluidClamp(30, 40)};
      padding: ${themeToken("spacing-xs")};
      font-weight: 400;

      &::placeholder {
        color: rgba(144, 203, 173, 0.5);
      }
    }

    input:is(:-webkit-autofill, :autofill) {
      background-clip: text;
      text-fill-color: #ffffff;
    }
  }
`;

export type ThemeVariants = keyof typeof themeVariants;

/**
 *
 * @param min min size
 * @param max max size
 * @returns an interpolated css value clamped between min and max (the interpolation is the rate of change of the size relative to the viewport width - the slope is the derivative of the line from (min, VIEWPORT_MIN) to (max, VIEWPORT_MAX) )
 */
export function cssFluidClamp(min: number, max: number) {
  const interpolation = between(
    `${min}px`,
    `${max}px`,
    `${VIEWPORT_MIN_PX}px`,
    `${VIEWPORT_MAX_PX}px`
  );
  return `clamp(${min}px, ${interpolation}, ${max}px)`;
}

/**
 *
 * @param path the path from the Theme
 * @returns the value of path in the theme
 */
export function themeToken(path: TokenPath) {
  return `var(--${path})`;
}
