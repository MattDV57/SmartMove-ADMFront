import { useTheme } from "@emotion/react";
import { Box } from "@mui/material"
import { tokens } from "../../styles/theme";


export const GridContainer = ({ children }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (

        <Box
            m="0 0 0 0"
            height="75vh"
            sx={{
                // width: { xs: "270%", sm: "100%" },
                overflowX: "auto",
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .name-column--cell": {
                    color: colors.blueAccent[400],
                },
                "& .MuiDataGrid-columnHeader": {
                    backgroundColor: `${colors.blueAccent[900]} !important`,
                    // color: headerRootColor,
                    borderBottom: "none",

                },
                "& .MuiDataGrid-columnHeaderTitle": {
                    fontSize: ".7rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.grey[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: `${colors.blueAccent[900]} !important`,
                },
                "& .MuiTablePagination-root": {
                    // color: headerRootColor,
                },
                "& .MuiSvgIcon-root-": {
                    //TODO: No se ven el filtro de pagina, ni el ordenamiento en Control de Acceso.
                }

            }}

        >
            {children}
        </Box>

    )
}
