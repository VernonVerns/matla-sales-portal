import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import moment from 'moment';

const LineGraph = ({ seriesData, xAxisData }) => {
    return (
        <LineChart
            xAxis={[
                {
                    data: xAxisData,
                }
            ]}
            series={[
                {
                    data: seriesData,
                },
            ]}
            width={700}
            height={300}
        />
    )
}

export default LineGraph