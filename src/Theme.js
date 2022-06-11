import { createTheme, ThemeProvider } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: ["Cairo", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      light: "#0D4E32",
      main: "#0D4E32",
      dark: "#0D4E32",
      contrastText: "#0D4E32",
    },
    secondary: {
      light: "#00A560",
      main: "#00A560",
      dark: "#00A560",
      contrastText: "#00A560",
    },
  },
});

function Theme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={cacheRtl}>{children}</CacheProvider>
    </ThemeProvider>
  );
}

export default Theme;
