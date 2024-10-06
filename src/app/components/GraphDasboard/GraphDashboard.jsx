import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LIST_CATEGORIES } from '../../../common/types';


const GraphDashboard = ({ claimsByCategory }) => {

    const uData = LIST_CATEGORIES.map(category => {
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
                xAxis={[{ data: LIST_CATEGORIES, scaleType: 'band' }]}
            />
        </div>
    );
}
export default GraphDashboard