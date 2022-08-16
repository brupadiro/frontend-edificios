<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:title>
        Contabilidad
      </template>
      <template v-slot:subtitle>
        <v-btn large color="yellow lighten-1 black--text rounded-lg font-weight-regular" @click="paymentsModal = true">
          NUEVA FACTURA&nbsp;&nbsp;<v-icon>mdi-calendar</v-icon>
        </v-btn>
      </template>

    </headersGeneralComponent>
    <v-row>
      <v-col class="col-12">
        <cardsCashFlowComponent></cardsCashFlowComponent>
      </v-col>
      <v-col class="col-12">
        <GeneralCardComponent elevation="6">
          <generalCardTitleComponent class="primary white--text">
            Facturas
          </generalCardTitleComponent>
          <v-card-text>
            <v-data-table hide-default-footer :items="paymentList.data" :headers="headers">
              <template v-slot:item.attributes.createdAt="{ item }">
                {{ item.createdAt | formatDate }}
              </template>
              <template v-slot:item.attributes.type="{ item }">
                {{ item.attributes.type | formatType }}
              </template>
              <template v-slot:item.change_status="{ item }">
                <v-btn color="info" v-show="item.attributes.status == 'pending'" @click="changeStatus(item.id)">
                  VALIDAR PAGO
                </v-btn>
                <v-chip color="success darken-1 font-weight-regular" label block
                  v-show="item.attributes.status == 'payed'">
                  PAGA
                </v-chip>
              </template>
              <template v-slot:item.invoice="{ item }">
                <v-btn color="yellow" @click="generateInvoice(item)">
                  GENERAR FACTURA
                </v-btn>
              </template>

            </v-data-table>
          </v-card-text>
        </GeneralCardComponent>
      </v-col>
    </v-row>
    {{payments}}
    <accountingPaymentsComponent v-model="paymentsModal"></accountingPaymentsComponent>
  </v-container>
</template>

<script>
  import dateFunctions from '~/plugins/mixins/dateFunctions.js'
  import moment from 'moment'
  export default {
    mixins: [dateFunctions],
    data() {
      return {
        paymentsModal: false,
        headers: [{
          text: 'Fecha',
          value: 'createdAt'
        }, {
          text: 'Tipo',
          value: 'attributes.type'
        }, {
          text: 'Nombre / Razon social',
          value: 'attributes.name'
        }, {
          text: 'Moneda',
          value: 'attributes.currency'
        }, {
          text: 'Monto',
          value: 'attributes.amount'
        }, {
          text: 'Cambiar estado',
          value: 'change_status'
        }, {
          text: 'Generar factura',
          value: 'invoice'
        }]
      }
    },
    created() {
      this.getPayments()
    },
    filters: {
      formatType(value) {
        switch (value) {
          case 'expenses':
            return 'Expensas'
          case 'suppliers':
            return 'Pago a proveedores / gastos'
        }
      },
    },
    methods: {
      getPayments() {
        this.$store.dispatch('accounting/findAll')
      },
      changeStatus(id) {
        this.$store.dispatch('accounting/changeStatus', id)
        this.getPayments()
      },
      generateInvoice(item) {

        let data = {
          sender: {
            "company": "Forest Tower",
            "address": "23X8+6MJ, Av Chiverta, 20100 Punta del Este",
            "zip": "20100",
            "city": "Punta del este",
            "country": "Uruguay"
          },
          client: {
            "company": item.attributes.name,
            "address": item.attributes.address,
            "zip": "20100",
            "city": "Punta del Este",
            "country": "Uruguay"
          },
          information: {
            number: item.id,
            "date": moment(item.attributes.createdAt).format('DD/MM/YYYY'),
          },
          "settings": {
            "currency": item.attributes.currency // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
          },
          products: [{
              quantity: "1",
              description: item.attributes.type,
              "tax-rate": 22,
              price: item.attributes.amount,
            },
          ],
          translate: {
            "invoice": "FACTURA", // Default to 'INVOICE'
            "number": "NUMERO", // Defaults to 'Number'
            "date": "FECHA", // Default to 'Date'
            // "due-date": "Verloopdatum", // Defaults to 'Due Date'
            // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
            "products": "ITEMS", // Defaults to 'Products'
            "quantity": "CANTIDAD", // Default to 'Quantity'
            "price": "PRECIO", // Defaults to 'Price'
            "product-total": "Total", // Defaults to 'Total'
            "total": "Total" // Defaults to 'Total'
          },
        }

        this.$store.dispatch('accounting/generateInvoice', data)


      }
    },
    computed: {
      paymentList() {
        return this.$store.getters['accounting/getList']
      }
    }
  }

</script>

<style>

</style>
