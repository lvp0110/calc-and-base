<template>
  <div class="chart-container">
    <Line :data="chartData" :options="options" />
  </div>
  <RouterLink :to="`/documents/protocol/${protocol_code}`">
  <img src="/pdf_icon.png" alt="" width="30px">Протокол </RouterLink>
  <MultipleSelect
    class="select"
    :items="items"
    :selectedItems="selectedItems"
    :on-change="handleChange"
  />
 
</template>

<script setup>
import { Line } from "vue-chartjs";
import { defineProps, ref, toRefs, onMounted } from "vue";
import MultipleSelect from "../MultipleSelect/index.vue";
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

const props = defineProps(["items", "protocol_code", "diagram_params"]);

const { items, protocol_code, diagram_params } = toRefs(props);

const selectedItems = ref([]);
const chartData = ref({
  labels: [],
  datasets: [],
});

onMounted(() => {
  selectedItems.value = [items.value[0].name];

  applyChartData();
});

const handleChange = (name, checked) => {
  let selectedValues = [...selectedItems.value];

  if (selectedValues.includes(name)) {
    selectedValues = selectedValues.filter((value) => value !== name);
  } else {
    selectedValues.push(name);
  }

  selectedItems.value = selectedValues;

  applyChartData();
};

const isSelected = (name) =>
  selectedItems.value.some((selectedItem) => selectedItem === name);

const options = {
  maintainAspectRatio: false,
  scales: {
    y: {
      //   stacked: true,
      //   grid: {
      //     display: true,
      //   },
      beginAtZero: diagram_params.value.begin_at_zero,
      min: diagram_params.value.min,
      max: diagram_params.value.max,
      ticks: {
        stepSize: diagram_params.value.step_size,
      },
    },
    x: {
      //   grid: {
      //     display: true,
      //   },
    },
  },

  plugins: {
    legend: {
      display: false,
    },
    // title: {
    //   display: false,
    //   text: "Результаты измерений",
    // },
    // tooltip: {
    //   enabled: false,
    // },
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 3,
    },
  },
};

const applyChartData = () => {
  const { x_axis } = items.value[0];

  chartData.value = {
    labels: x_axis.map(String),
    datasets: items.value
      .filter(({ name }) => isSelected(name))
      .map(({ name, color, y_axis }) => ({
        label: name,
        backgroundColor: color,
        borderColor: color,
        data: y_axis,
      })),
  };
};
</script>

<style scoped>
a {
  margin-left: 12px;
  text-decoration: none;
  color: black;
}
.select {
  min-height: 200px;
}

canvas {
  padding: 0px 6px 6px 6px;
}

.chart-container {
  position: relative;
  margin: auto;
  flex-grow: 1;
  width: 100%;
}
</style>
