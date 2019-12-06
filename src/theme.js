export const color = {
  darkGray: "#282c34",
  lightGray: "#CDCDCD",
  white: "#E3E4DB",
  lightPurple: "#AEA4BF",
  purple: "#8F6593"
};

export const font = {
  family: {
    regular: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;`,
    code: `source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;`
  },
  size: {
    large: "2.4rem",
    regular: "1.6rem",
    small: "1rem"
  },
  lineHeight: {
    regular: "1.5"
  }
};

const breakpoints = { small: 576, medium: 768, large: 992, extraLarge: 1200 };

export const mediaQuery = Object.keys(breakpoints).reduce(
  (acc, key) => ({
    ...acc,
    [key]: `@media (min-width: ${breakpoints[key]}px)`
  }),
  {}
);
