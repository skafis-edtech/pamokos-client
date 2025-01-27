const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    cssVariables: true,
    palette: {
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#f50057",
      },
      background: {
        default: "#f5f5f5",
        paper: "#ffffff",
      },
      text: {
        primary: "#333333",
        secondary: "#555555",
      },
    },
    shape: {
      borderRadius: 0,
    },
    typography: {
      fontFamily: "Arial, sans-serif",
      fontSize: 12,
      h1: { fontSize: "1.8rem", fontWeight: 700 },
      h2: { fontSize: "1.5rem", fontWeight: 600 },
      h3: { fontSize: "1.3rem", fontWeight: 500 },
      h4: { fontSize: "1.1rem", fontWeight: 500 },
      h5: { fontSize: "1rem", fontWeight: 400 },
      h6: { fontSize: "0.9rem", fontWeight: 400 },
      body1: { fontSize: "0.875rem" },
      body2: { fontSize: "0.75rem" },
    },
    components: {
      MuiPopover: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiPopper: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiDialog: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiModal: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            padding: "6px 12px",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            padding: "12px",
            boxShadow: "none",
            border: "1px solid #e0e0e0",
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            borderCollapse: "collapse",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "6px 12px",
          },
        },
      },
    },
  },
  corePlugins: {
    // Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
    preflight: false,
  },
  plugins: [],
});
