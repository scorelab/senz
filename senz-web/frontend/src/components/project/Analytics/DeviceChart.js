import React from "react";
import { Line } from "react-chartjs-2";

const DeviceChart = props => {
  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

    datasets: [
      {
        label: "Requests Made",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(100, 181, 246, 0.5)",
        borderColor: "rgba(100, 181, 246, 1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.data,
        id: "requests"
      }
    ]
  };
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false
    }
  };

  return (
    <div style={{ width: "60%", height: "60%" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default DeviceChart;
