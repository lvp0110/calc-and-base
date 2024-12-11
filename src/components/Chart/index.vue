<template>
  <Line :data="chartData" :options="options" />
</template>

<script setup>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

const options = {
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: 1.1,
      ticks: {
        stepSize: 0.2,
      },
    },
  },
};

const chartData = {
    labels: ['100', '125', '200', '250', '315', '400', '500', '630', '800', '1000', '1250', '1600', '2000', '2500', '3150', '4000', '5000'],
  datasets: [
    {
      label: "Bonacoustic Perfo Point Block 8/16",
      backgroundColor: "rgb(32, 145, 197)",
      borderColor: "rgb(32, 145, 197)",
      data: [0.58, 0.67, 0.90, 0.93, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 0.96, 0.88, 0.80, 0.69, 0.61, 0.46, 0.38],

    },
  ],
};
</script>
