import React from 'react';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from 'chart.js/auto';
Chart.register();
const CircleChart = ({chartData}) => {

  const options = {
    plugins: {
      datalabels: {
        clamp: false,
        backgroundColor: function (context) {
          return context.dataset.borderColor;
        },
        display: "auto",
        borderRadius: 4,
        color: "white",
        font: {
          weight: "bold",
          size:15
        },
        padding: 7,
        formatter: (value, dnct1) => {
          let sum = 0;
          let dataArr = dnct1.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += Number(data);
          });
    
          let percentage = ((value * 100) / sum).toFixed(2) + " "+ "%";
          return percentage;
        }
      },
      tooltip: {
        enabled: false
      }
    }
    
  };

    
  return (
    <Pie data={chartData} id='barCircle' options={options} plugins={[ChartDataLabels]}></Pie>
  )
}

export default CircleChart