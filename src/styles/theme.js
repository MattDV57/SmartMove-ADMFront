import { createTheme } from '@mui/material'
import { createContext, useMemo, useState } from 'react';
import { esES } from '@mui/x-data-grid/locales';

export const tokens = (mode) => ({
        ...(mode === 'dark')
        ? {
        grey: {
            100: "#e0e0e0",
            200: "#c2c2c2",
            300: "#626a79",
            400: "#364053", // old value: #858585
            500: "#666666",
            600: "#525252",
            700: "#3d3d3d",
            800: "#292929",
            900: "#141414",
        },
        primary: {
            100: "#d0d1d5",
            200: "#a1a4ab",
            300: "#727681",
            400: "#1F2A40",
            500: "#1F2A40",
            600: "#101624",
            700: "#0c101b",
            800: "#080b12",
            900: "#040509",
          },
          blueAccent: {
            100: "#e1e2fe",
            200: "#c3c6fd",
            300: "#a4a9fc",
            400: "#868dfb",
            500: "#6870fa",
            600: "#535ac8",
            700: "#3e4396",
            800: "#2a2d64",
            900: "#151632",
          },
          priority: { 
            100: "#ffdbce",
            200: "#feb79d",
            300: "#fe936c",
            400: "#fd6f3b",
            500: "#fd4b0a",
            600: "#ca3c08",
            700: "#982d06",
            800: "#651e04",
            900: "#330f02"
        }
    }
          :
        {
          grey: {
          100: "#fefefe",
          200: "#fdfdfd",
          300: "#fcfcfc",
          400: "#fbfbfb",
          500: "#fafafa",
          600: "#c8c8c8",
          700: "#969696",
          800: "#646464",
          900: "#323232"
          },
          primary: {
            100: "#040509",
            200: "#080b12",
            300: "#0c101b",
            400: "#f2f0f0",
            500: "#141b2d",
            600: "#1F2A40",
            700: "#727681",
            800: "#a1a4ab",
            900: "#d0d1d5",
          },
          blueAccent: {
            100: "#151632",
            200: "#2a2d64",
            300: "#3e4396",
            400: "#535ac8",
            500: "#6870fa",
            600: "#868dfb",
            700: "#a4a9fc",
            800: "#c3c6fd",
            900: "#e1e2fe",
          },
          priority: { 
            100: "#ffdbce",
            200: "#feb79d",
            300: "#fe936c",
            400: "#fd6f3b",
            500: "#fd4b0a",
            600: "#ca3c08",
            700: "#982d06",
            800: "#651e04",
            900: "#330f02"
                },
        }
    })


export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
              ? {
                  // palette values for dark mode
                  primary: {
                    main: colors.primary[700],
                  },
                  secondary: {
                    main: colors.grey[500],
                  },
                  neutral: {
                    dark: colors.grey[700],
                    main: colors.grey[500],
                    light: colors.grey[100],
                  },
                  background: {
                    default: colors.primary[500],
                  },
                }
              : {
                  // palette values for light mode
                  primary: {
                    main: colors.primary[100],
                  },
                  secondary: {
                    main: colors.grey[600],
                  },
                  neutral: {
                    dark: colors.grey[700],
                    main: colors.grey[500],
                    light: colors.grey[100],
                  },
                  background: {
                    default: "#fcfcfc",
                  },
                }),
          },

    typography: {
        fontFamily: "Source Sans Pro, sans-serif"
    }
}}


    
    export const ColorModeContext = createContext({
        toggleColorMode: () => {},
      });
      
      export const useMode = () => {
        const [mode, setMode] = useState("light");
      
        const colorMode = useMemo(
          () => ({
            toggleColorMode: () =>
              setMode((prev) => (prev === "light" ? "dark" : "light")),
          }),
          []
        );
      
        const theme = useMemo(() => createTheme(themeSettings(mode), esES), [mode]);
        return [theme, colorMode];
      };