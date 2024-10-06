/* eslint-disable react/prop-types */
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import { useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import { useTheme } from '@mui/material';
import Logo from '../../../assets/smarthome-logo.svg'
import { tokens } from '../../../styles/theme';
import { useGlobal } from '../../../context/global/globalContext';
import { SIDEBAR_SIZE } from '../../../common/types';

// eslint-disable-next-line react/prop-types
const Item = ({ title, to, icon, selected, setSelected, mainItemColor }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            active={selected === to}
            style={{
                color: mainItemColor,
                backgroundColor: selected === to ? 'rgba(0, 0, 0, 0.1)' : colors.grey[400],
            }}
            onClick={() => {
                setSelected(to);
                navigate(to);
            }}
            icon={icon}
        >
            <Typography marginRight={.3}>
                {title}
            </Typography>
        </MenuItem>
    );
};


const SideBar = ({ isAllowedToAccessControl }) => {
    const { globalState, toggleSidebar } = useGlobal();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [selected, setSelected] = useState(location.pathname);
    const mainItemColor = colors.blueAccent[100];

    if (isMobile && globalState.sidebarOpen) {
        return null;
    }


    return (

        <Sidebar
            collapsed={globalState.sidebarOpen}
            style={{ backgroundColor: colors.grey[400] }}
            width={SIDEBAR_SIZE.OPEN + "px"}
            rootStyles={{
                height: '100vh',
                display: 'flex',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 100,
                boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)',
                border: 'none',
            }}
            backgroundColor={colors.grey[400]}

        >
            <Menu iconShape="square">

                {/* LOGO AND MENU ICON */}
                <MenuItem
                    onClick={toggleSidebar}
                    icon={globalState.sidebarOpen ? <img src={Logo} alt="SmartMove" height={'47px'} width={'70px'} /> : undefined}
                    style={{
                        margin: "10px 0 20px 0",
                        color: mainItemColor,
                        backgroundColor: 'transparent',
                    }}

                >
                    {!globalState.sidebarOpen && (
                        <img src={Logo} alt="SmartMove" height={'47px'} width={'70px'}
                            style={{
                                margin: "10px 0 0 0",
                                color: mainItemColor,
                                backgroundColor: 'transparent',
                            }} />
                    )}
                </MenuItem>


                <Box paddingLeft={globalState.sidebarOpen ? undefined : "1%"}>
                    <Item
                        title="Dashboard"
                        to="/"
                        icon={<HomeOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        mainItemColor={mainItemColor}
                    />
                    <Item
                        title="Reclamos"
                        to="/my-claims"  // Redirige a "Mis Reclamos"
                        icon={<BugReportOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        mainItemColor={mainItemColor}
                    />
                    <Item
                        title="Mediaciones"
                        to="/my-arbitrations"  // Redirige a "Mis Mediaciones"
                        icon={<ErrorIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        mainItemColor={mainItemColor}
                    />
                    <Item
                        title="Registros"
                        to="/logs"
                        icon={<ReceiptOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        mainItemColor={mainItemColor}
                    />
                    {isAllowedToAccessControl &&
                        <Item
                            title="Control de acceso"
                            to="/access-control"
                            icon={<SecurityOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            mainItemColor={mainItemColor}
                        />
                    }
                </Box>
            </Menu>
        </Sidebar>

    );
};

export default SideBar;
