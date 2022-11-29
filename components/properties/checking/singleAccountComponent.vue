<template>
  <v-card>
    <v-card-title v-if="!readOnly">
      <v-row>
        <v-col class="col-md-10 col-12">
          <v-form ref="form">
            <v-row>
              <v-col class="col-md-6 col-12">
                <FormsFieldsTextComponent :label="`Monto (${currency})`" :rules="rules.required" v-model="amount"
                  type="number" prepend-inner-icon="mdi-currency-usd"></FormsFieldsTextComponent>

              </v-col>
              <v-col class="col-md-6 col-12">
                <FormsFieldsSelectComponent v-model="type" label="Tipo"
                  :items="[{value: 'deposit',text: 'Deposito' }, {value: 'withdrawal',text: 'Retiro'}]">
                </FormsFieldsSelectComponent>
              </v-col>
              <v-col class="col-12">
                <FormsFieldsTextComponent v-model="concept" placeholder="Opcional..." label="Concepto">
                </FormsFieldsTextComponent>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
        <v-col class="col-md-2 col-12">
          <v-btn block class="black--text rounded-lg font-weight-regular mt-md-7" color="success" height="55" x-large
            @click="addMoovment('USD')">
            <v-icon color="white">mdi-content-save</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-card outlined>

        <v-toolbar dense color="primary" elevation="0">
          <v-toolbar-title class="font-weight-bold white--text text-subtitle-2">
            Movimientos
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn small color="warning" class="black--text font-weight-regular rounded-lg" :loading="loadingInvoice" :disabled="total>=0" @click="generateInvoice()">
            Generar boleta
          </v-btn>
          &nbsp;&nbsp;
          <v-btn color="red" x-small fab class="elevation-2" @click="deleteAccount()">
            <v-icon color="white">mdi-delete</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="py-0" v-if="moovments.length>0">
          <v-list dense class="py-0">
            <template v-for="(moovment,index) in moovments">
              <v-list-item :key="moovment.id">
                <v-list-item-avatar color="primary">
                  <v-icon color="green" v-if="moovment.type =='deposit'">mdi-arrow-right</v-icon>
                  <v-icon color="red" v-else>mdi-arrow-left</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle class="font-weight-light black--text">
                    <span v-if="moovment.concept">{{moovment.concept}}</span>
                    <span v-else>Sin concepto</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action-text class="font-weight-bold text-subtitle-2 black--text">
                  {{currency | currency}} {{moovment.amount}}
                </v-list-item-action-text>
              </v-list-item>
              <v-divider v-show="index!=moovments.length" :key="`d${moovment.id}`"></v-divider>
            </template>
          </v-list>
        </v-card-text>
        <v-card-text v-else class="py-2">
          <v-alert type="warning" class="black--text font-weight-bold mb-0">Esta cuenta aun no tiene movimientos
          </v-alert>
        </v-card-text>
        <v-toolbar dense color="primary" elevation="0">
          <v-toolbar-title>
            <v-icon color="white">mdi-bank</v-icon>
            <span class="font-weight-bold white--text text-subtitle-2">Total</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-chip class="font-weight-bold text-subtitle-2" v-if="total>0" color="success">{{currency | currency}}
            {{total}}</v-chip>
          <v-chip class="font-weight-bold text-subtitle-2" v-else-if="total<0" color="red">{{currency | currency}}
            {{total}}</v-chip>
          <v-chip class="font-weight-bold text-subtitle-2" v-else color="warning">{{currency | currency}} {{total}}
          </v-chip>
        </v-toolbar>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
  import {
    mapFields
  } from 'vuex-map-fields';
  import moment from 'moment'
  export default {
    filters: {
      currency(value) {
        if (value == 'USD') {
          return 'US$'
        }
        return '$'
      }
    },
    props: {
      readOnly: {
        type: Boolean,
        default: false
      },
      apartment: {
        type: Object,
        required: true
      },
      currency: {
        type: String,
        default: 'USD'
      },
      value: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        loadingInvoice: false,
        rules: {
          required: [(value) => !!value || 'Este campo es requerido'],
          min: [value => value > 0 || 'El valor debe ser mayor a 0']
        }
      }
    },
    methods: {
      addMoovment() {
        if (!this.$refs.form.validate()) return
        this.$store.dispatch('checkingaccounts/add', {
          apartment: this.apartment.id,
          currency: this.currency,
        })
      },
      async generateInvoice() {

        let moovments = this.moovments.filter((m) => {
          return m.type == 'withdrawal'
        }).map((m) => {
          return {
            quantity: "1",
            description: m.concept ?? "Sin concepto",
            price: m.amount.toString(),
            "tax-rate":"0"
          }
        })
        var debtor = this.rentals[this.rentals.length-1]?.user ?? this.owner.user
        let invoice = {
          apartment: this.apartment.id,
          currency: this.currency,
          total: this.total,
          products: moovments,
          client:{
            "company": debtor.name,
            "address":`<b>Apartamento ${this.apartment.number} - ${this.apartment.building.name}</b>`,
            'custom1':`<b>Tel</b>: ${debtor.phone}`,
            'custom2':`<b>DOC</b>: ${debtor.username}`,
          },
          date: moment().format('DD/MM/YYYY')
        }
        this.loadingInvoice = true


        this.$store.dispatch('accounting/set',{
          name:this.owner.user.name,
          type:'debts',
          amount:-(this.total),
          status:'pending',
          currency:this.currency,
          doc:this.owner.user.username,
        })
        let ownerinvoice = await this.$store.dispatch('accounting/add')
        this.$store.dispatch('apartments/addInvoices',{
            id:this.apartment.id,
            invoice:ownerinvoice
          })

        this.$store.dispatch('accounting/generateInvoice', invoice)
          .then(()=>{
            this.loadingInvoice = false
          })
      },
      deleteAccount() {
        this.$store.dispatch('checkingaccounts/delete', {
          apartment: this.apartment.id,
          currency: this.currency,
        })
      }
    },
    computed: {

      ...mapFields('checkingaccounts', [
        'moovment.amount',
        'moovment.type',
        'moovment.concept',
      ]),

      moovments() {
        if (Array.isArray(this.value))
          return this.value.filter(account => account.currency === this.currency)
        return []
      },
      total() {
        return this.moovments.reduce((total, moovment) => {
          if (moovment.type === 'deposit') {
            return total + moovment.amount
          } else {
            return total - moovment.amount
          }
        }, 0)
      },
      rentals() {
        return this.$store.getters['rentals/getAll']
      },
      owner() {
        return this.$store.getters['owners/get']
      }
    }
  }

</script>
