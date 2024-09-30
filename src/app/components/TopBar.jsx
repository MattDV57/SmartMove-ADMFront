/* eslint-disable react/prop-types */
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../styles/theme';

const CustomIconButton = ({ children, onClick, extraStyles }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <IconButton
            onClick={onClick}
            sx={{
                color: colors.blueAccent[200],
                borderRadius: '0',
                '&:hover': {
                    backgroundColor: theme.palette.action.hover
                },
                ...extraStyles
            }}
        >
            {children}
        </IconButton>
    );
};


const TopBar = ({ toggleSidebar }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const navigate = useNavigate();

    return (
        <Box display='flex' justifyContent='space-between' p={2}
            backgroundColor={colors.grey[400]}
            boxShadow={'0px 0px 5px 0px rgba(0,0,0,0.2)'}
        >
            <CustomIconButton onClick={toggleSidebar}>
                <MenuOutlinedIcon />
            </CustomIconButton>

            <Box display='flex'>
                <CustomIconButton >
                    <NotificationsNoneOutlinedIcon />
                </CustomIconButton>

                <CustomIconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </CustomIconButton>

                <CustomIconButton
                    extraStyles={{ display: "flex", alignItems: "center", gap: "8px" }}
                    onClick={() => navigate('/profile')}
                >
                    <AccountCircleOutlinedIcon />
                    {isMobile
                        ? null
                        : <Typography>Juan Doe</Typography>}

                </CustomIconButton>
            </Box>
        </Box>
    )
}



export default TopBar;