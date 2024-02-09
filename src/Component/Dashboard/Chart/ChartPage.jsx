import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import "./chart.css";
function ChartPage() {
    const [options] = useState({
        chart: {
            height: 168,
            opacity: 1,
            type: 'area',
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: [3, 3],
            curve: 'smooth',
        },
        xaxis: {
            offsetX: 0,
            offsetY: 0,
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            labels: {
                low: 0,
                offsetX: 0,
                show: false,
            },
            axisBorder: {
                low: 0,
                offsetX: 0,
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: false,
        },
        grid: {
            show: false,
        },
        colors: ['#3e7f63', '#2fa2d4'],
        fill: {
            opacity: [0.5, 0.25, 1],
        },
        legend: {
            show: false,
        },
        tooltip: {
            x: {
                format: 'MM',
            },
        },
    });

    const [series, setSeries] = useState([
        {
            name: 'revenue1',
            data: [2, 15, 25, 20, 30, 26, 24, 15, 12, 20],
        },
        {
            name: 'revenue2',
            data: [10, 25, 15, 16, 10, 14, 28, 18, 20, 16],
        },
    ]);
    return (
        <>
            <Card className='Chart-card-style'>
                <Chart options={options} series={series} type="area" height={270} width={"104%"} style={{
                    transform: "translateX(-2.5%) translateY(44px)",
                }} />
            </Card>
        </>
    )
}

export default ChartPage
