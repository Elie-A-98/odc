import { css } from "@linaria/core";
import _ from "lodash";
import { between } from "polished";

const VIEWPORT_MIN_PX = 390;
const VIEWPORT_MAX_PX = 1920;

type Color = [string, string]; // [sRGB, P-3] color-gamuts

const colorTokens = {
  "spring-green-68": ["#90CBAD", "oklch(79.3% 0.0745 162)"],
  "spring-green-10": ["#102219", "oklch(23.3% 0.0299 161)"],
  "spring-green": ["#0DF280", "oklch(84.3% 0.2188 152)"],
  "white-solid": ["#fff", "oklch(100.0% 0 0)"],
  "gray-light-1": ["#ebf5e7", "oklch(95.8% 0.0209 137)"],
  // slightly darker variant for light sidebar
  "gray-light-2": ["#e3efe0", "oklch(94% 0.0209 137)"],
  "gray-light-10": ["#50813a", "oklch(55.2% 0.1152 137)"],
  /* login page primitives */
  "green-deep-1": ["#224936", "oklch(37.1% 0.0558 161)"],
  "green-border-1": ["#31684D", "oklch(47.2% 0.0738 160)"],
  "green-card-1": ["#183426", "oklch(29.8% 0.043 160)"],
  "accent-green-05a": ["rgba(13, 242, 128, 0.05)", "oklch(84.3% 0.2188 152 / 0.05)"],
  "black-25a": ["rgba(0, 0, 0, 0.25)", "oklch(0.0% 0 0 / 0.25)"],
  /* toast primitives */
  "black-30a": ["rgba(0, 0, 0, 0.3)", "oklch(0.0% 0 0 / 0.3)"],
  "red-1": ["#FF6B6B", "oklch(71.2% 0.1812 23)"],
  /* home page primitives */
  "green-border-2": ["#1F3B2D", "oklch(32.5% 0.0426 161)"],
  "green-surface-2": ["#182E22", "oklch(27.9% 0.0361 159)"],
  "gold-1": ["#FFD700", "oklch(88.7% 0.1822 95)"],
  "accent-green-20a": ["rgba(13, 242, 128, 0.2)", "oklch(84.3% 0.2188 152 / 0.2)"],
  "accent-green-30a": ["rgba(13, 242, 128, 0.3)", "oklch(84.3% 0.2188 152 / 0.3)"],
  "accent-green-40a": ["rgba(13, 242, 128, 0.4)", "oklch(84.3% 0.2188 152 / 0.4)"],
  "accent-green-50a": ["rgba(13, 242, 128, 0.5)", "oklch(84.3% 0.2188 152 / 0.5)"],
  "green-overlay-80a": ["rgba(16, 34, 25, 0.8)", "oklch(23.3% 0.0299 161 / 0.8)"],
  "spring-green-hover-1": ["#0CD970", "oklch(77.6% 0.2033 152)"],
  "slate-500": ["#64748B", "oklch(55.4% 0.0407 257)"],
  "slate-300": ["#CBD5E1", "oklch(86.9% 0.0198 253)"],
  "white-10a": ["rgba(255, 255, 255, 0.1)", "oklch(100.0% 0 0 / 0.1)"],
  "black-90a": ["rgba(0, 0, 0, 0.9)", "oklch(0.0% 0 0 / 0.9)"],
  "black-40a": ["rgba(0, 0, 0, 0.4)", "oklch(0.0% 0 0 / 0.4)"],
  /* products page primitives */
  "black-10a": ["rgba(0, 0, 0, 0.1)", "oklch(0.0% 0 0 / 0.1)"],
  "accent-green-10a": ["rgba(13, 242, 128, 0.1)", "oklch(84.3% 0.2188 152 / 0.1)"],
  "red-strong-1": ["#F20D0D", "oklch(60.6% 0.2448 29)"],
  "red-10a": ["rgba(242, 13, 13, 0.1)", "oklch(60.6% 0.2448 29 / 0.1)"],
  "amber-1": ["#FACC15", "oklch(86.1% 0.1731 92)"],
  "spring-green-12": ["#0A1812", "oklch(19.4% 0.0232 165)"],
  "green-overlay-50a": ["rgba(24, 46, 34, 0.5)", "oklch(27.9% 0.0361 159 / 0.5)"],
  /* shared components primitives */
  "black-50a": ["rgba(0, 0, 0, 0.5)", "oklch(0.0% 0 0 / 0.5)"],
  "black-70a": ["rgba(0, 0, 0, 0.7)", "oklch(0.0% 0 0 / 0.7)"],
  "spring-green-68-50a": ["rgba(144, 203, 173, 0.5)", "oklch(79.3% 0.0745 162 / 0.5)"],
  "accent-green-15a": ["rgba(13, 242, 128, 0.15)", "oklch(84.3% 0.2188 152 / 0.15)"],
  "spring-green-11": ["#10231A", "oklch(23.6% 0.0307 162)"],
  "spring-green-9": ["#0B1610", "oklch(18.7% 0.0202 160)"],
  "brand-blue-1": ["#3B82F6", "oklch(62.3% 0.188 260)"],
  /* light theme additions */
  "green-border-light-1": ["#CFE9DC", "oklch(91.1% 0.0325 164)"],
  "neutral-border-1": ["#E5E7EB", "oklch(92.8% 0.0058 265)"],
  "gold-700": ["#B8860B", "oklch(65.2% 0.1322 82)"],
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
      accent: ColorTokens; // accent colored text (e.g., lock icon)
      "on-accent": ColorTokens; // text on accent backgrounds (e.g., button)
      highlight: ColorTokens; // highlight text (e.g., gold)
      muted: ColorTokens; // subdued text on dark surfaces
      "muted-inverted": ColorTokens; // subdued text on light surfaces
      "on-accent-strong": ColorTokens; // darker text on accent
      "on-accent-alt": ColorTokens; // alt on-accent for select checked
      rating: ColorTokens; // rating star color
      "error-strong": ColorTokens; // strong error text (e.g., badges)
      error: ColorTokens; // error text color
    };
    surfaces: {
      primary: ColorTokens;
      "primary-inverted": ColorTokens;
      sidebar: ColorTokens; // deep sidebar surface
    };
    backgrounds: {
      card: ColorTokens; // e.g., login card background
      "card-alt": ColorTokens; // alternative card bg (e.g., stat cards)
      input: ColorTokens; // inputs/selects background
      icon: ColorTokens; // e.g., lock circle background
      accent: ColorTokens; // e.g., primary CTA background
      "overlay-accent-5": ColorTokens; // e.g., soft green glow overlay
      "overlay-accent-10": ColorTokens; // light accent overlay
      "overlay-accent-20": ColorTokens; // stronger accent overlay
      "overlay-dark-90": ColorTokens; // category overlay dark
      "overlay-dark-40": ColorTokens; // category overlay mid
      "overlay-dark-70": ColorTokens; // strong overlay
      "overlay-dark-50": ColorTokens; // shared overlay mid
      "overlay-surface-80": ColorTokens; // hero overlay on surface
      "overlay-surface-50": ColorTokens; // medium surface overlay
      "accent-hover": ColorTokens; // accent hover state
      "card-alt-hover": ColorTokens; // hover state for alt card
      "accent-weak": ColorTokens; // subtle accent bg (e.g., toast hover)
      "error-weak": ColorTokens; // subtle error bg (e.g., badge)
    };
    borders: {
      primary: ColorTokens; // e.g., card/input borders
      accent: ColorTokens; // solid accent border
      secondary: ColorTokens; // darker green border
      "accent-30a": ColorTokens; // accent border with 30% alpha
      "accent-50a": ColorTokens; // accent border with 50% alpha
      "accent-weak": ColorTokens; // subtle accent border
    };
    effects: {
      shadow: ColorTokens; // e.g., card shadow color only
      "toast-shadow": ColorTokens; // toast-specific shadow color
      "glow-accent-40a": ColorTokens; // green glow used in buttons
      "premium-overlay": ColorTokens; // subtle white overlay for premium icon
      "card-shadow": ColorTokens; // product card hover shadow
      "focus-ring": ColorTokens; // input/select focus ring
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
      primary: "gray-light-1", // light, softly tinted background
      "primary-inverted": "spring-green-68", // light brand-tinted surface for contrast
      sidebar: "gray-light-2", // slightly darker tint for sidebar
    },
    text: {
      primary: "spring-green-10", // dark text on light backgrounds
      "tertiary-inverted": "slate-500", // muted readable on light sidebar
      "primary-inverted": "spring-green-10", // text on light inverted surfaces
      secondary: "slate-500", // neutral secondary text on light
      accent: "gray-light-10", // darker vibrant green for accent text on light backgrounds
      "on-accent": "white-solid", // text on green accent backgrounds
      "on-accent-strong": "white-solid",
      "on-accent-alt": "white-solid",
      highlight: "gold-700",
      muted: "slate-500",
      "muted-inverted": "slate-300",
      rating: "amber-1",
      "error-strong": "red-strong-1",
      error: "red-1",
    },
    backgrounds: {
      card: "white-solid",
      "card-alt": "gray-light-1",
      input: "white-solid",
      icon: "spring-green-68",
      accent: "spring-green",
      "overlay-accent-5": "accent-green-05a",
      "overlay-accent-10": "accent-green-10a",
      "overlay-accent-20": "accent-green-20a",
      "overlay-dark-90": "black-90a",
      "overlay-dark-40": "black-40a",
      "overlay-dark-70": "black-70a",
      "overlay-dark-50": "black-50a",
      "overlay-surface-80": "green-overlay-80a",
      "overlay-surface-50": "green-overlay-50a",
      "accent-hover": "spring-green-hover-1",
      "card-alt-hover": "spring-green-68",
      "accent-weak": "spring-green-68",
      "error-weak": "red-10a",
    },
    borders: {
      primary: "neutral-border-1", // modern subtle neutral border
      accent: "spring-green",
      secondary: "green-border-light-1",
      "accent-30a": "accent-green-30a",
      "accent-50a": "accent-green-50a",
      "accent-weak": "spring-green-68",
    },
    effects: {
      shadow: "black-10a",
      "toast-shadow": "black-30a",
      "glow-accent-40a": "accent-green-40a",
      "premium-overlay": "white-10a",
      "card-shadow": "black-10a",
      "focus-ring": "accent-green-15a",
    },
  },
} satisfies Partial<Theme>);

const darkTheme: Theme = _.merge({}, baseTheme, {
  palette: {
    surfaces: {
      primary: "spring-green-10",
      "primary-inverted": "spring-green",
      sidebar: "spring-green-9",
    },
    text: {
      primary: "white-solid",
      "tertiary-inverted": "spring-green-68",
      "primary-inverted": "gray-light-1",
      secondary: "gray-light-10",
      accent: "spring-green",
      "on-accent": "spring-green-10",
      "on-accent-strong": "spring-green-12",
      "on-accent-alt": "spring-green-11",
      highlight: "gold-1",
      muted: "slate-500",
      "muted-inverted": "slate-300",
      rating: "amber-1",
      "error-strong": "red-strong-1",
      error: "red-1",
    },
    backgrounds: {
      card: "green-card-1",
      "card-alt": "green-surface-2",
      input: "spring-green-11",
      icon: "green-deep-1",
      accent: "spring-green",
      "overlay-accent-5": "accent-green-05a",
      "overlay-accent-10": "accent-green-10a",
      "overlay-accent-20": "accent-green-20a",
      "overlay-dark-90": "black-90a",
      "overlay-dark-40": "black-40a",
      "overlay-dark-70": "black-70a",
      "overlay-dark-50": "black-50a",
      "overlay-surface-80": "green-overlay-80a",
      "overlay-surface-50": "green-overlay-50a",
      "accent-hover": "spring-green-hover-1",
      "card-alt-hover": "green-border-2",
      "accent-weak": "spring-green-68",
      "error-weak": "red-10a",
    },
    borders: {
      primary: "green-border-1",
      accent: "spring-green",
      secondary: "green-border-2",
      "accent-30a": "accent-green-30a",
      "accent-50a": "accent-green-50a",
      "accent-weak": "spring-green-68",
    },
    effects: {
      shadow: "black-25a",
      "toast-shadow": "black-30a",
      "glow-accent-40a": "accent-green-40a",
      "premium-overlay": "white-10a",
      "card-shadow": "black-10a",
      "focus-ring": "accent-green-15a",
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
      background-color: ${themeToken("palette-backgrounds-icon")};
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
      border: 1px solid ${themeToken("palette-borders-primary")};
      background: ${themeToken("palette-backgrounds-input")};
      font-size: ${cssFluidClamp(14, 16)};
      color: inherit;
      height: ${cssFluidClamp(30, 40)};
      padding: ${themeToken("spacing-xs")};
      font-weight: 400;

      &::placeholder {
        color: ${themeToken("palette-text-muted-inverted")};
      }
    }

    input:is(:-webkit-autofill, :autofill) {
      background-clip: text;
      text-fill-color: ${themeToken("palette-text-primary")};
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
