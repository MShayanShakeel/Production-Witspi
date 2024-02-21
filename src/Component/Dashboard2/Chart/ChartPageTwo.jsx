import React, { useState } from "react";
import Chart from "react-apexcharts";
import { Card } from "react-bootstrap";
function ChartPageTwo() {
  const [options] = useState({
    chart: {
      height: "100%",
      opacity: 1,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [3, 3],
      curve: "smooth",
    },
    xaxis: {
      offsetX: 0,
      offsetY: 0,
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
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
    colors: ["#3e7f63", "#2fa2d4"],
    fill: {
      opacity: [0.5, 0.25, 1],
    },
    legend: {
      show: false,
    },
    tooltip: {
      x: {
        format: "MM",
      },
    },
  });

  const [series, setSeries] = useState([
    {
      name: "revenue1",
      data: [2, 15, 25, 20, 30, 26, 24, 15, 12, 20],
    },
    {
      name: "revenue2",
      data: [10, 25, 15, 16, 10, 14, 28, 18, 20, 16],
    },
  ]);
  return (
    <>
      <div style={{ borderRadius: "30px" , width : "100%" }}>
        {/* <Chart
          options={options}
          series={series}
          type="area"
          height={130}
          width={"113%"}
          borderRadius={"30px"}
          style={{
            transform: "translateX(-1%) translateY(1px)",
            minHeight: "350px",
            padding: "1rem 0px 0px 4px",
            margin: "2rem 0",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        /> */}
        <Chart
          options={options}
          series={series}
          type="area"
          height={"100%"}
          width={"113%"}
          borderRadius={"30px"}
          style={{
            transform: "translateX(-1%) translateY(1px)",
            minHeight: "350px",
            // padding: "1rem 0px 0px 4px",
            // margin: "2rem 0",
            borderRadius: "10px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column-reverse", 
          }}
        />
      </div>
    </>
  );
}

export default ChartPageTwo;
