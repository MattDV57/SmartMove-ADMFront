import { createTheme } from '@mui/material'
import { colors } from './colors'

const theme = createTheme({
    palette: {
        primary: {
            main: colors.primary,
            dark: colors.darkPrimary,
            light: colors.lightPrimary
        },
        secondary: {
            main: colors.secondary,
            dark: colors.darkSecondary,
            light: colors.lightSecondary,
            extraLight: colors.lightGray
        },
        text: {
            primary: colors.black,
            secondary: colors.gray
        },
        background: {
            default: colors.white,
            paper: colors.white
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
        
    },
    typography: {
        fontFamily: "Source Sans Pro, sans-serif"
    }
    })


    
export { theme }