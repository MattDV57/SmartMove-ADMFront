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
        }
    },
    typography: {
        fontFamily: "Source Sans Pro, sans-serif"
    }
    })

// const theme = createTheme({
//     palette: {
//         indigo: {
//             100: "#ccdfed",
//             200: "#99bfdb",
//             300: "#66a0c8",
//             400: "#3380b6",
//             500: "#0060a4",
//             600: "#004d83",
//             700: "#003a62",
//             800: "#002642",
//             900: "#001321"
//     },
//     },
//     typography: {
//         fontFamily: "Source Sans Pro, sans-serif"
//     }
// })
    
export { theme }