/* eslint-disable react/prop-types */
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import { useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import { theme } from '../../styles/theme';
import Logo from '../../assets/logo.png'


const mainItemColor = theme.palette.primary.main;
const subItemColor = theme.palette.primary.light;

// eslint-disable-next-line react/prop-types
const Item = ({ title, to, icon, selected, setSelected, isSubItem = false }) => {
    const navigate = useNavigate();

    return (
        <MenuItem
            active={selected === title}
            style={{
                color: isSubItem ? subItemColor : mainItemColor,
                backgroundColor: theme.palette.secondary.extraLight,
            }}
            onClick={() => {
                setSelected(title);
                navigate(to);
            }}
            icon={icon}
        >
            <Typography>{title}</Typography>
        </MenuItem>
    );
};


const SideBar = ({ isCollapsed, toggleSidebar }) => {

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [selected, setSelected] = useState('Dashboard');

    if (isMobile && isCollapsed) {
        return null;
    }

    return (

        <Sidebar
            collapsed={isCollapsed}
            rootStyles={{
                height: '100vh',
                display: 'flex',
            }}
            backgroundColor={theme.palette.secondary.extraLight}
        >
            <Menu iconShape="square">

                {/* LOGO AND MENU ICON */}
                <MenuItem
                    onClick={toggleSidebar}
                    icon={isCollapsed ? <img src={Logo} alt="SmartMove" height={'47px'} width={'70px'} /> : undefined}
                    style={{
                        margin: "10px 0 20px 0",
                        color: mainItemColor,
                    }}
                >
                    {!isCollapsed && (
                        <img src={Logo} alt="SmartMove" height={'47px'} width={'70px'} style={{}} />
                    )}
                </MenuItem>


                <Box paddingLeft={isCollapsed ? undefined : "1%"}>
                    <Item
                        title="Dashboard"
                        to="/"
                        icon={<HomeOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <SubMenu label="Reclamos" style={{ color: mainItemColor }} icon={<BugReportOutlinedIcon />}
                    >
                        <Item
                            title="Mis reclamos"
                            to="/my-claims"
                            icon={<AccessibilityNewOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isSubItem={true}
                        />
                        <Item
                            title="Reclamos generales"
                            to="/all-claims"
                            icon={<FolderOpenOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isSubItem={true}
                        />
                    </SubMenu>
                    <SubMenu label="Mediaciones" style={{ color: mainItemColor }} icon={<ErrorIcon />}
                    >
                        <Item
                            title="Mis mediaciones"
                            to="/my-arbitrations"
                            icon={<AccessibilityNewOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isSubItem={true}
                        />
                        <Item
                            title="Mediaciones generales"
                            to="/all-arbitrations"
                            icon={<FolderOpenOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isSubItem={true}
                        />
                    </SubMenu>
                    <Item
                        title="Registro de actividad"
                        to="/logs"
                        icon={<ReceiptOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Control de acceso"
                        to="/access-control"
                        icon={<SecurityOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />


                </Box>
            </Menu>
        </Sidebar>

    );
};

export default SideBar;
