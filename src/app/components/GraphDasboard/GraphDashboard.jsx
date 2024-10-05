import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

// const uData = [1, 0, 2, 2, 1, 1, 3, 1, 2, 0];
const categories = [
    "Técnicos",
    "Cobros/Pagos",
    "Servicio",
    "Mediaciones",
    "Información",
    "Perfil/Usuario",
    "Inmuebles",
    "Contrato",
    "Servicio de Mudanza",
    "Otros"
];

const GraphDashboard = ({ claimsByCategory }) => {

    const uData = categories.map(category => {
        const isCategoryPresent = claimsByCategory?.find(claim => claim._id === category);
        return isCategoryPresent ? isCategoryPresent.count : 0;
    });


    return (
        <div className='mt1'>
            <BarChart
                //   width={500}
                height={300}
                series={[
                    { data: uData, label: 'Reclamos activos - Categorías', id: 'uvId' },
                ]}
                xAxis={[{ data: categories, scaleType: 'band' }]}
            />
        </div>
    );
}
export default GraphDashboard