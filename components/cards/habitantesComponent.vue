<template>
  <generalCardComponent fillHeight elevation="6">
    <GeneralCardTitleComponent class="primary white--text">
      Habitantes por mes
    </GeneralCardTitleComponent>
    <v-card-text>
      <generalGraphComponent type="bar" :labels="labels" :data="[
        { values: [18, 40, 30, 35, 8, 52] }
    ]" :colors="['red']"></generalGraphComponent>
    </v-card-text>
  </generalCardComponent>
</template>

<script>
  import moment from 'moment';
  export default {
    data() {
      return {
        labels: [],
      }
    },
    created() {
        this.setMonths()
    },
    methods:{
        setMonths() {
            for (let i = 0; i < 6; i++) {
                this.labels.push(moment().locale('es').subtract(6-i, 'months').format('MMMM'));
            }
        }
    }

  }

</script>

<style>

</style>
