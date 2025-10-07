import type { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  primaryColor: "cyan",
  colors: {
    cyan: [
      "#E6F7F7",
      "#B3E6E6",
      "#80D4D4",
      "#4DC3C3",
      "#1AB1B1",
      "#00A0A0", // Primary - Cor principal do PENSA
      "#008080",
      "#006666",
      "#004D4D",
      "#003333",
    ],
    teal: [
      "#E6F9F5",
      "#B3EFE0",
      "#80E5CC",
      "#4DDBB8",
      "#1AD1A3",
      "#00C78F",
      "#00A072",
      "#007956",
      "#005339",
      "#002C1D",
    ],
  },
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
  headings: {
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
    fontWeight: "700",
    sizes: {
      h1: { fontSize: "48px", lineHeight: "1.2" },
      h2: { fontSize: "36px", lineHeight: "1.3" },
      h3: { fontSize: "24px", lineHeight: "1.4" },
      h4: { fontSize: "20px", lineHeight: "1.5" },
      h5: { fontSize: "18px", lineHeight: "1.5" },
      h6: { fontSize: "16px", lineHeight: "1.5" },
    },
  },
  spacing: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  radius: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },
  shadows: {
    xs: "0 1px 3px rgba(0, 0, 0, 0.05)",
    sm: "0 1px 6px rgba(0, 0, 0, 0.08)",
    md: "0 4px 12px rgba(0, 0, 0, 0.1)",
    lg: "0 8px 24px rgba(0, 0, 0, 0.12)",
    xl: "0 16px 48px rgba(0, 0, 0, 0.15)",
  },
  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
      styles: {
        root: {
          fontWeight: 600,
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-2px)",
          },
        },
      },
    },
    Card: {
      defaultProps: {
        radius: "lg",
        shadow: "sm",
      },
    },
    Input: {
      defaultProps: {
        radius: "md",
      },
    },
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 960,
          lg: 1140,
          xl: 1320,
        },
      },
    },
  },
};

