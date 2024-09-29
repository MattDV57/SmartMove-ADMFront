import React from 'react'

import { Typography } from '@mui/material';

import './ItemDashboard.scss'

const ItemDashboard = ({
    title,
    cuantity,
    ico,
    extraInfo
}) => {
    return (
        <div className='item-dashboard'>
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>
            <Typography variant="h3" gutterBottom>
                {cuantity}
            </Typography>
            <Typography variant="body2" gutterBottom color='info'>
                {extraInfo}
            </Typography>
        </div>
    );
}

export default ItemDashboard;