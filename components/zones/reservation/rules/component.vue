<template>
  <v-card outlined class="rounded-lg">
    <v-card-title>Reglas de reserva</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pb-0">
      <zonesReservationRulesFieldComponent @input="addRule($event)">
      </zonesReservationRulesFieldComponent>
    </v-card-text>
    <v-card-text class="pb-0">
      <v-row>
        <v-col class="col-12" v-for="(rule,index) in rulesList" :key="'r'+index">
          <zonesReservationRulesFieldComponent update :value="rule" @input="ruleList[index]=$event">
          </zonesReservationRulesFieldComponent>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      value: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        rulesList: this.value,
        zoneRule: {
          rule: {
            attributes: {}
          }
        }
      }
    },
    methods: {
      addRule(rule) {
        this.rulesList.push(rule)
      },
    },
    watch: {
      value:{
        handler(value) {
          console.log(value)
        },
        deep: true
      },
      rule: {
        handler(val) {
          console.log(val)
        },
        deep: true
      }
    }
  }

</script>

<style>

</style>
