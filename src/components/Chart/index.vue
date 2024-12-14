<template>
  <Line :data="chartData" :options="options" />
  <select multiple @change="handleChange">
    <option
      v-for="item in items"
      :value="item.name"
      :selected="isSelected(item.name)"
    >
      {{ item.name }}
    </option>
  </select>
</template>

<script setup>
import { Line } from "vue-chartjs";
import { defineProps, ref, toRefs, onMounted } from "vue";
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

const props = defineProps(["items", "diagram_params"]);

const { items, diagram_params } = toRefs(props);

const selectedItems = ref([]);
const chartData = ref({
  labels: [],
  datasets: [],
});

onMounted(() => {
  selectedItems.value = [items.value[0].name];

  applyChartData();
});

const handleChange = (event) => {
  const selectedValues = Array.from(event.target.selectedOptions).map(
    ({ value }) => value
  );

  selectedItems.value = selectedValues;

  applyChartData();
};

const isSelected = (name) =>
  selectedItems.value.some((selectedItem) => selectedItem === name);

const options = {
  scales: {
    y: {
      beginAtZero: diagram_params.value.begin_at_zero,
      min: diagram_params.value.min,
      max: diagram_params.value.max,
      ticks: {
        stepSize: diagram_params.value.step_size,
      },
    },
  },
};

const applyChartData = () => {
  const { x_axis } = items.value[0];

  chartData.value = {
    labels: x_axis.map(String),
    datasets: items.value
      .filter(({ name }) => isSelected(name))
      .map(({ name, y_axis }) => ({
        label: name,
        backgroundColor: "rgb(32, 145, 197)",
        borderColor: "rgb(32, 145, 197)",
        data: y_axis,
      })),
  };
};
</script>
