import { useState } from 'react'
import { GlobalProvider } from '../context/global/globalContext'
import SideBar from './components/SideBar'
import { ThemeProvider } from '@emotion/react'
import { theme } from '../styles/theme'
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




function App() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <BrowserRouter>
      <GlobalProvider>
        <ModalProvider>
          <ThemeProvider theme={theme}>
            <Box display='flex' flex={1} >
              <SideBar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
              <Box flex={1} >
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
          </ThemeProvider>
        </ModalProvider>
      </GlobalProvider>
    </BrowserRouter>

  )
}

export default App;
