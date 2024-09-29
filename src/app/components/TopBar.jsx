/* eslint-disable react/prop-types */
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { theme } from '../../styles/theme';
import { useNavigate } from 'react-router-dom';

const CustomIconButton = ({ children, onClick, extraStyles }) => {
    return (
        <IconButton
            onClick={onClick}
            sx={{
                color: theme.palette.primary.main,
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

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const navigate = useNavigate();

    return (
        <Box display='flex' justifyContent='space-between' p={2}
            backgroundColor={theme.palette.secondary.extraLight}
        >
            <CustomIconButton onClick={toggleSidebar}>
                <MenuOutlinedIcon />
            </CustomIconButton>

            <Box display='flex'>
                <CustomIconButton>
                    <NotificationsNoneOutlinedIcon />
                </CustomIconButton>

                <CustomIconButton>
                    <SettingsOutlinedIcon />
                </CustomIconButton>

                <CustomIconButton 
                    extraStyles={{ display: "flex", alignItems: "center", gap: "8px" }}
                    onClick={()=>navigate('/profile')}
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