<template>
  <v-dialog persistent :value="value" width="700">
    <GeneralCardComponent width="100%">
      <GeneralCardTitleComponent class="primary white--text">
        Nueva factura
        <v-spacer></v-spacer>
        <generalCloseButtonComponent @input="$emit('input',$event)"></generalCloseButtonComponent>
      </GeneralCardTitleComponent>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form">
          <FormsFieldsSelectComponent v-model="type" label="Tipo" :items="[
                        {text:'Cobro de expensas',value:'expenses',},
                        {text:'Cobro de renta',value:'rental'},
                        {text:'Pago a proveedores',value:'suppliers'}
                        ]">
          </FormsFieldsSelectComponent>
          <FormsFieldsSelectComponent v-model="status" label="Estado" :items="[
                {text:'Pagado',value:'payed',},
                {text:'Pendiente',value:'pending'}
            ]">
          </FormsFieldsSelectComponent>
          <v-row>
            <v-col class="col-md-3">
              <formsFieldsSelectComponent :items="['USD','UYU']" value="USD" v-model="currency" label="Moneda">
              </formsFieldsSelectComponent>
            </v-col>
            <v-col class="col-md-9">
              <formsFieldsTextComponent prepend-inner-icon="mdi-currency-usd" type="number" v-model="amount"
                label="Costo">
              </formsFieldsTextComponent>
            </v-col>
            <v-col class="col-md-6">
              <formsFieldsTextComponent prepend-inner-icon="mdi-account" type="text" v-model="name"
                label="Nombre/Razon social">
              </formsFieldsTextComponent>
            </v-col>
            <v-col class="col-md-6">
              <formsFieldsTextComponent prepend-inner-icon="mdi-number" type="number" v-model="doc"
                label="CI/RUT">
              </formsFieldsTextComponent>
            </v-col>
            <v-col class="col-md-12">
              <formsFieldsTextComponent prepend-inner-icon="mdi-map"  v-model="address"
                label="Direccion">
              </formsFieldsTextComponent>
            </v-col>
            <v-col class="col-md-12">
              <formsFieldsTextComponent v-model="comments"
                label="Comentarios">
              </formsFieldsTextComponent>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="yellow lighten-1 black--text rounded-lg font-weight-regular" class="rounded-lg" @click="addPayment()">
        Agregar factura&nbsp;&nbsp;<v-icon>mdi-content-save</v-icon>
        </v-btn>
      </v-card-actions>
    </GeneralCardComponent>
  </v-dialog>

</template>

<script>
  import {
    mapFields
  } from 'vuex-map-fields';

  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    methods:{
      addPayment() {
        this.$store.dispatch('accounting/add')
        this.$store.dispatch('accounting/findAll')
        this.$emit('input', false)
      }
    },
    computed: {
      ...mapFields('accounting', [
        'payment.name',
        'payment.type',
        'payment.amount',
        'payment.status',
        'payment.doc',
        'payment.currency',
      ]),
    }
  }

</script>

<style>

</style>
