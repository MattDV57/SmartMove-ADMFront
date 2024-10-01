import React from 'react'

import { Box } from '@mui/material'
import Header from '../../components/Header'
import ItemDashboard from '../../components/ItemDashboard/ItemDashboard'

import './Dashboard.scss'
import GraphDashboard from '../../components/GraphDasboard/GraphDashboard'

const Dashboard = () => {
    return (
        <Box margin={"15px"}>
            <Header
                title="Dashboard"
                id="dashboard-titulo"
            />
            <div className="dashboard-grid">

                <ItemDashboard
                    title="Reclamos nuevos"
                    cuantity="2"
                    extraInfo="En esta semana se crearon 2 nuevos reclamos"
                    id="dashboard-reclamos-nuevos"
                />

                <ItemDashboard
                    title="Mediaciones nuevas"
                    cuantity="1"
                    extraInfo="En esta semana se creó 1 mediación"
                    id="dashboard-mediaciones-nuevas"
                />

                <ItemDashboard
                    title="Reclamos activos"
                    cuantity="13"
                    extraInfo="Hay 13 reclamos activos"
                    id="dashboard-reclamos-activos"
                />

                <ItemDashboard
                    title="Mediaciones activas"
                    cuantity="15"
                    extraInfo="Hay 15 mediaciones activas"
                    id="dashboard-mediaciones-activas"
                />
            </div>

            <GraphDashboard

            />
        </Box>
    )
}

export default Dashboard