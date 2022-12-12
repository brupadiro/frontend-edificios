<template>
  <generalCardComponent elevation="6">
    <GeneralCardTitleComponent class="primary white--text">
      CashFlow
    </GeneralCardTitleComponent>
    <v-card-text class="my-3">
      <v-row>
        <v-col class="col-md-12 col-12">
          <GeneralCardMiniComponent>
            <template v-slot:title>
              $ {{inPayments[inPayments.length-1]}}
            </template>
            <template v-slot:subtitle>
              Ingresos
            </template>
          </GeneralCardMiniComponent>
        </v-col>
        <v-col class="col-md-6 col-12">
          <GeneralCardMiniComponent color="red">
            <template v-slot:title>
              $ {{outPayments[outPayments.length-1]}}
            </template>
            <template v-slot:subtitle>
              Gastos
            </template>

          </GeneralCardMiniComponent>
        </v-col>
        <v-col class="col-md-6 col-12">
          <GeneralCardMiniComponent color="orange">
            <template v-slot:title>
              $ {{pendingPayments[pendingPayments.length-1]}}
            </template>
            <template v-slot:subtitle>
              Pendientes de cobro
            </template>

          </GeneralCardMiniComponent>
        </v-col>

      </v-row>
    </v-card-text>
    <v-card-text>
      <generalGraphComponent type="axis-mixed" :data="graphData" :labels="labels" :colors="['#ffc446','#ff6240','#333350']">
      </generalGraphComponent>

    </v-card-text>
  </generalCardComponent>
</template>

<script>
  import _ from 'lodash';
  import moment from 'moment'
  export default {
    data() {
      return {
        labels: []

      }
    },
    created() {
      this.$store.dispatch('accounting/findAll')
      this.setMonths()
    },
    methods: {
      setMonths() {
        for (let i = 1 ; i <= 6; i++) {
          this.labels.push(moment().locale('es').subtract(6 - i, 'months').format('MMMM'));
        }
      },
      sumAmountsByMonth(payments) {
        payments = _.groupBy(payments, 'createdAt')
        payments = _.mapValues(payments, monthArray => {
          return _.reduce(monthArray, (sum, item) => sum + item.amount, 0);
        })
        
        payments =  _.values(payments)
        const lengthArray =  6 - (payments.length)
        console.log(lengthArray)
        return [..._.times(lengthArray, _.constant(0)), ...payments]

      }

    },
    computed: {
      payments() {
        const payments = _.cloneDeep(this.$store.getters['accounting/getList'] || {})
        return payments
      },
      inPayments() {
        if (!this.payments.data) return 0
        let inPayments = this.payments.data.filter((p) => {
          return p.type != 'suppliers' && p.status == 'pending'
        }).map((p) => {
          p.createdAt = moment(p.createdAt).format('MM/YYYY')
          return p
        })
        return this.sumAmountsByMonth(inPayments)
      },
      outPayments() {
        if (!this.payments.data) return 0
        let outPayments = this.payments.data.filter((p) => {
          return p.type == 'suppliers'
        }).map((p) => {
          p.createdAt = moment(p.createdAt).format('MM/YYYY')
          return p
        })
        return this.sumAmountsByMonth(outPayments)
      },
      pendingPayments() {
        if (!this.payments.data) return 0
        let pendingPayments = this.payments.data.filter((p) => {
          return p.type != 'suppliers' && p.status == 'pending'
        }).map((p) => {
          p.createdAt = moment(p.createdAt).format('MM/YYYY')
          return p
        })
        return this.sumAmountsByMonth(pendingPayments)
      },
      graphData() {
        return [{
            chartType: 'bar',
            name: 'Pendientes',
            values: this.pendingPayments
          },
          {
            chartType: 'bar',
            name: 'Gastos',
            values: this.outPayments
          },
          {
            chartType: 'bar',
            name: 'Ingresos',
            values: this.inPayments
          }
        ]
      }

    }
  }

</script>

<style>

</style>
