<template>
<polar-area/>
</template>

<script>
import { PolarArea } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale)

export default {
  name: 'PolarAreaChart',
  components: { PolarArea },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      responsive: true,
      maintainAspectRatio: false
    }
  }
}

</script>
