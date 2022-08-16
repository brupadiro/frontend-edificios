<template lang="html">
  <section class="charts">
    <v-frappe-chart  :type="type" :labels="labels" :data="data" :colors="colors"  />
  </section>
</template>

<script lang="js">
  import {
    VFrappeChart
  } from 'vue-frappe-chart'

  export default {
    components: {
      VFrappeChart
    },
    props: {
      type: {
        default: 'bar',
        type: String
      },
      labels: Array,
      data: {
        type: Array,
        default: () => [{
          values: []
        }],
      },
        colors:Array
    }
  }

</script>

<style scoped lang="scss">
  .echarts {
    width: 100%;
  }

</style>
