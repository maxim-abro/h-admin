<template>
<Doughnut    :chart-options="chartOptions"
             :chart-data="chartData"
             :chart-id="chartId"
             :dataset-id-key="datasetIdKey"
             :plugins="plugins"
             :css-classes="cssClasses"
             :styles="styles"
             :width="width"
             :height="height"
/>
</template>

<script lang='ts'>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'CategoriesChart',
  components: {Doughnut},
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
      }
    }
  }
}
</script>
