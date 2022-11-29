<template>
  <GeneralCardComponent v-bind="$attrs">
    <generalCardTitleComponent v-if="title" class="primary white--text">
      Facturas
    </generalCardTitleComponent>
    <v-card-text>
      <v-data-table :items-per-page="-1" hide-default-footer disable-sort :items="data.data" :headers="headers">
        <template v-slot:no-data>
          No hay facturas disponibles
        </template>

        <template v-slot:item.createdAt="{ item }">
          {{ item.createdAt | formatDate }}
        </template>
        <template v-slot:item.type="{ item }">
          {{ item.type | formatType }}
        </template>
        <template v-slot:item.change_status="{ item }">
          <v-btn color="info" v-show="item.status == 'pending'" :disabled="readonly" @click="changeStatus(item.id)">
            VALIDAR PAGO
          </v-btn>
          <v-chip color="success darken-1 font-weight-regular" label block v-show="item.status == 'payed'">
            PAGA
          </v-chip>
        </template>
        <template v-slot:item.invoice="{ item }">
          <v-btn color="secondary" @click="generateInvoice(item)">
            IMPIRMIR FACTURA
          </v-btn>
        </template>

      </v-data-table>
    </v-card-text>
  </GeneralCardComponent>

</template>

<script>
  import dateFunctions from '~/plugins/mixins/dateFunctions.js'
  import moment from 'moment'
  export default {
    mixins: [dateFunctions],
    props: {
      readonly: {
        type: Boolean,
        default: false
      },
      title: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object,
        default: () => {
          return {
            data: [],
            meta: {
              current_page: 1,
              from: 1,
              last_page: 1,
              path: '',
              per_page: 10,
              to: 1,
              total: 0
            }
          }
        }
      },
    },
    filters: {
      formatType(value) {
        if (value == 'expenses') {
          return 'Expensas'
        } else if (value == 'rent') {
          return 'Renta'
        } else if (value == 'suppliers') {
          return 'Proveedores'
        } else if (value == 'others') {
          return 'Otros'
        }
      }
    },
    data() {
      return {
        paymentsModal: false,
        headers: [{
          text: 'Fecha',
          value: 'createdAt'
        }, {
          text: 'Tipo',
          value: 'type'
        }, {
          text: 'Nombre / Razon social',
          value: 'name'
        }, {
          text: 'Moneda',
          value: 'currency'
        }, {
          text: 'Monto',
          value: 'amount'
        }, {
          text: 'Cambiar estado',
          value: 'change_status'
        }, {
          text: 'Imprimir factura',
          value: 'invoice'
        }]
      }
    },
    methods: {
      changeStatus(id) {
        this.$store.dispatch('accounting/changeStatus', id)
        this.$store.dispatch('accounting/findAll')
      },
      generateInvoice(item) {
        let invoice = {
          currency: item.currency,
          products: [{
            quantity: "1",
            description: item.type,
            "tax-rate": 22,
            price: item.amount,
          }],
          client:{
            name: item.name,
          },
          date: moment(item.createdAt).format('DD/MM/YYYY')
        }
        this.$store.dispatch('accounting/generateInvoice', invoice)
      }
    }

  }

</script>

<style>

</style>
