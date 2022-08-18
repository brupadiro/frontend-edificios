<template>
  <GeneralCardComponent v-bind="$attrs">
    <generalCardTitleComponent v-if="title" class="primary white--text">
      Facturas
    </generalCardTitleComponent>
    <v-card-text>
      <v-data-table hide-default-footer :items="data.data" :headers="headers">
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
          <v-chip color="success darken-1 font-weight-regular" label block v-show="item.attributes.status == 'payed'">
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

</template>

<script>
  import dateFunctions from '~/plugins/mixins/dateFunctions.js'
  import moment from 'moment'
  export default {
    mixins: [dateFunctions],
    props: {
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
        } else if(value == 'rent') {
          return 'Renta'
        }else if(value == 'suppliers') {
          return 'Proveedores'
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
    methods: {
      changeStatus(id) {
        this.$store.dispatch('accounting/changeStatus', id)
        this.$store.dispatch('accounting/findAll')
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
            "currency": item.attributes
              .currency // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
          },
          products: [{
            quantity: "1",
            description: item.attributes.type,
            "tax-rate": 22,
            price: item.attributes.amount,
          }, ],
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
    }

  }

</script>

<style>

</style>
