import { ColorSystemOptions, createTheme } from "@mui/material/styles";
import "./Font.css";

const baseTheme = {
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#ff2e63",
            "& .MuiListItemIcon-root": {
              color: "#08D9D6",
            },
          },
          "&$selected:hover": {
            color: "ff2e63",
            "& .MuiListItemIcon-root": {
              color: "#08D9D6",
            },
          },
          "&:hover": {
            color: "#08D9D6",
            "& .MuiListItemIcon-root": {
              color: "#08D9D6",
            },
          },
        },
        selected: {},
      },
    },
  },
};

const darkTheme = {
  palette: {
    mode: "dark",

    primary: {
      main: "#FF2E63", // pink
    },

    secondary: {
      main: "#08D9D6", // cyan
    },

    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
    },

    action: {
      active: "#fff",
      hover: "rgba(255, 255, 255, 0.08)",
      selected: "rgba(255, 255, 255, 0.16)",
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
    },

    background: {
      default: "#212121",
      paper: "#313131",
    },

    divider: "rgba(255, 255, 255, 0.12)",
  },
} as ColorSystemOptions;

const lightTheme = {
  palette: {
    mode: "light",

    primary: {
      main: "#08D9D6", // cyan
    },

    secondary: {
      main: "#FF2E63", // pink
    },

    background: {
      default: "#FAFAFA",
      paper: "#fff",
    },
  },
} as ColorSystemOptions;

const theme = createTheme({
  ...baseTheme,

  colorSchemes: {
    light: lightTheme,
    dark: darkTheme,
  },

  typography: {
    fontFamily: "'Quicksand'",
  },
});

export { theme };
