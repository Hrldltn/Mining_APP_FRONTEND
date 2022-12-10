import React from 'react';
import {Bar } from 'react-chartjs-2';


const BarChart = ({chartData}) => {
  return (
    <Bar data={chartData}  id='barChar' ></Bar>
  )
}

export default BarChart