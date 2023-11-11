import React, { useEffect } from "react";
import "./Chart.css";
import Chart from "react-apexcharts";

const ChartComponent = ({ data }) => {


  const options = {
    chart: {
      id: "basic-bar",
      width: "100%",
    },
    xaxis: {
      show: false,
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: 0,
              to: 100,
              color: "#255524", // Change the bar color
            },
          ],
        },
      },
    },
    legend: {
      show: false, // Hide the legend
    },
    tooltip: {
      enabled: false, // Disable tooltips
    },
    annotations: {
      xaxis: [
        {
          x: -20, // x-coordinate position for the x-axis legend

          label: {
            text: " ",
            style: {
              color: "#828282",
              background: "transparent",
              fontSize: "20px",

              fontFamily: "Gilroy, sans-serif",
            },
          },
        },
      ],
      yaxis: [
        {
          y: -22, // y-coordinate position for the y-axis legend

          label: {
            text: " ",
            style: {
              color: "#828282",
              background: "transparent",
              fontSize: "20px",

              fontFamily: "Gilroy, sans-serif",
            },
          },
        },
      ],
    },
  };

  const series = [
    {
      name: "series-1",
      data: [data.CountTotal, data.ApprovedTotal, data.RejectedTotal, data.WorkTotal, data.ImplementedTotal],
    },
  ];

  return (
    <div className="bar-chart">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={series}
            type="bar"
            height="300px"
            class="charts"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
