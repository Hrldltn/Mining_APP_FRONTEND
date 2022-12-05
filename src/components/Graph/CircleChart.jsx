import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
const CircleChart = ({chartData}) => {
  return (
    <Doughnut data={chartData} id='barCircle'></Doughnut>
  )
}

export default CircleChart