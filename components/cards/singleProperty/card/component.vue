<template>
  <GeneralCardComponent>
    <slot></slot>
    <v-card-title class="primary">
      <v-tabs :vertical="$vuetify.breakpoint.smAndDown" v-model="tab" hide-slider slider-color="primary"
        background-color="primary" active-class="active-tab" grow>
        <v-tab ripple :value="1">
          <span class="font-weight-black white--text">FICHA</span>
        </v-tab>
        <v-tab ripple :value="2">
          <span class="font-weight-black white--text">VISITAS</span>
        </v-tab>
        <v-tab ripple :value="2">
          <span class="font-weight-black white--text">RESERVAS</span>
        </v-tab>
        <v-tab ripple :value="3" v-if="data.attributes.invoices && data.attributes.invoices.data.length>0">
          <span class="font-weight-black white--text">FACTURAS</span>
        </v-tab>
        <v-tab ripple :value="4">
          <span class="font-weight-black white--text">CUENTA CORRIENTE</span>
        </v-tab>
      </v-tabs>
    </v-card-title>
    <v-card-text>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <cardSinglePropertyCardSheetComponent :readOnly="readOnly" :data="data"></cardSinglePropertyCardSheetComponent>
        </v-tab-item>
        <v-tab-item>
          <propertiesVisitsComponent :apartment="data" outlined class="mt-3"></propertiesVisitsComponent>
        </v-tab-item>
        <v-tab-item class="pa-4">
          <zonesReservationComponent></zonesReservationComponent>
        </v-tab-item>
        <v-tab-item v-if="data.attributes.invoices && data.attributes.invoices.data.length>0">
          <AccountingPaymentsComponent v-if="data.attributes.invoices" outlined class="mt-3"
            :data="data.attributes.invoices">
          </AccountingPaymentsComponent>
        </v-tab-item>
        <v-tab-item class="py-4">
          <propertiesCheckingAccountsComponent :readOnly="readOnly" :apartment="data"></propertiesCheckingAccountsComponent>
        </v-tab-item>

      </v-tabs-items>
    </v-card-text>
    <v-divider></v-divider>
  </GeneralCardComponent>

</template>

<script>
    import _ from 'lodash'
    import moment from 'moment'
    export default {
      props: {
        readOnly:{
          type:Boolean,
          default:false
        },
        data: {
          type: Object,
          required: true,
          default: {
            attributes: {
              amenities: {
                data: []
              }
            }
          }
        },
        getData: {
          type: Boolean,
          default: false
        },
      },
      data() {
        return {
          headersRentals: [{
              text: 'Inquilino',
              value: 'name',
            },
            {
              text: 'Documento',
              value: 'doc',
            },
            {
              text: 'Desde',
              value: 'attributes.start_date',
            },
            {
              text: 'Hasta',
              value: 'attributes.end_date',
            },
          ],
          tab: 0,
          openRentalForm: false,
        }
      },
      mounted() {
      },
      methods: {
        getOwner() {
          this.$store.dispatch('owners/find', {
            apartment: this.data.id
          })
        },
        async addNewRental() {
          try {
            this.$store.dispatch('habitants/set', {
              apartment: this.data.id,
              type: 'tenant'
            })
            const {
              data: habitant
            } = await this.$store.dispatch("habitants/create");
            //add rental
            this.$store.dispatch('rentals/set', {
              apartment: this.data.id,
              habitants: habitant.id
            })
            await this.$store.dispatch("rentals/create");
            this.$store.dispatch("rentals/clear");
            this.$store.dispatch("habitants/clear");
            this.getRentals()
            this.openRentalForm = false
  
          } catch (e) {
            console.log(e)
          }
        },
        getRentals() {
          this.$store.dispatch('rentals/findAll', {
            filters: {
              apartment: this.data.id,
            },
            populate: '*'
          })
        }
      },
      watch: {
        getData: {
          handler: function (val) {
            if (val) {
              this.getOwner()
              this.getRentals()
            }
          },
          immediate: true
        }
      }
    }
  
  </script>
  
<style>

</style>
