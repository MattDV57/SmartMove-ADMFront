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
import { useTheme } from '@mui/material';
import Logo from '../../assets/logo.png'
import { tokens } from '../../styles/theme';


// eslint-disable-next-line react/prop-types
const Item = ({ title, to, icon, selected, setSelected, isSubItem = false, mainItemColor, subItemColor }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            active={selected === title}
            style={{
                color: isSubItem ? subItemColor : mainItemColor,
                textDecoration: selected === title ? 'underline' : 'none',
                backgroundColor: isSubItem ? colors.grey[400] : 'transparent',
            }}
            onClick={() => {
                setSelected(title);
                navigate(to);
            }}
            icon={icon}
        >
            <Typography fontSize={isSubItem ? '14px' : '16px'} >{title}</Typography>
        </MenuItem>
    );
};


const SideBar = ({ isCollapsed, toggleSidebar }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [selected, setSelected] = useState('Dashboard');
    const mainItemColor = colors.blueAccent[200];
    const subItemColor = colors.blueAccent[300];

    if (isMobile && isCollapsed) {
        return null;
    }

    return (

        <Sidebar
            collapsed={isCollapsed}
            rootStyles={{
                height: '100vh',
                display: 'flex',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 100,
                boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)',
                border: 'none'
            }}
            backgroundColor={colors.grey[400]}

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
                        mainItemColor={mainItemColor}
                        subItemColor={subItemColor}
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
                            mainItemColor={mainItemColor}
                            subItemColor={subItemColor}
                        />
                        <Item
                            title="Reclamos generales"
                            to="/all-claims"
                            icon={<FolderOpenOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isSubItem={true}
                            mainItemColor={mainItemColor}
                            subItemColor={subItemColor}
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
                            mainItemColor={mainItemColor}
                            subItemColor={subItemColor}
                        />
                        <Item
                            title="Mediaciones generales"
                            to="/all-arbitrations"
                            icon={<FolderOpenOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            isSubItem={true}
                            mainItemColor={mainItemColor}
                            subItemColor={subItemColor}
                        />
                    </SubMenu>
                    <Item
                        title="Registro de actividad"
                        to="/logs"
                        icon={<ReceiptOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        mainItemColor={mainItemColor}
                        subItemColor={subItemColor}
                    />
                    <Item
                        title="Control de acceso"
                        to="/access-control"
                        icon={<SecurityOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        mainItemColor={mainItemColor}
                        subItemColor={subItemColor}
                    />


                </Box>
            </Menu>
        </Sidebar>

    );
};

export default SideBar;
