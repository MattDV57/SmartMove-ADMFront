import { useState } from 'react'
import { GlobalProvider } from '../context/global/globalContext'
import SideBar from './components/SideBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TopBar from './components/TopBar'
import { Box } from '@mui/material'
import { MyClaims } from './screens/Claims/MyClaims'
import { AllClaims } from './screens/Claims/AllClaims'
import { MyArbitrations } from './screens/Arbitrations/MyArbitrations'
import { AllArbitrations } from './screens/Arbitrations/AllArbitrations'
import { Logs } from './screens/Logs'
import { AccessControl } from './screens/AccessControl/AccessControl'
import Dashboard from './screens/Dashboard/Dashboard'
import { ModalProvider } from '../context/ModalContext'
import Profile from './screens/Profile/Profile'
import { ColorModeContext, useMode } from '../styles/theme'
import { CssBaseline, ThemeProvider } from "@mui/material";



function App() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [theme, colorMode] = useMode();
  const sidebarWidth = isCollapsed ? 80 : 250;

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalProvider>
            <ModalProvider>
              <Box width="100%" height="100%" display='flex' position='relative'>
                <SideBar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
                <Box width="100%" height="100%"
                  sx={{
                    paddingLeft: `${sidebarWidth}px`,
                    width: '100%',
                    minHeight: '100vh',
                    transition: 'padding-left 0.3s ease',
                  }}
                >
                  <TopBar toggleSidebar={toggleSidebar} />

                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/my-claims" element={<MyClaims />} />
                    <Route path="/all-claims" element={<AllClaims />} />
                    <Route path="/my-arbitrations" element={<MyArbitrations />} />
                    <Route path="/all-arbitrations" element={<AllArbitrations />} />
                    <Route path="/logs" element={<Logs />} />
                    <Route path="/access-control" element={<AccessControl />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>

                </Box>
              </Box>
            </ModalProvider>
          </GlobalProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>

  )
}

export default App;
