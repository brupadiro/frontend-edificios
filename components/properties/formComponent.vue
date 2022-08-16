<template>
  <GeneralCardComponent>
    <v-card-title class="text-subtitle-1 font-weight-regular">
      DATOS DEL APARTAMENTO
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-md-6">
      <v-row>
        <v-col class="col-12">
          <formsFieldsTextComponent prepend-inner-icon="mdi-numeric" type="number" v-model="number"
            label="Numero de apartamento">
          </formsFieldsTextComponent>
        </v-col>
        <v-col class="col-4">
          <formsFieldsTextComponent prepend-inner-icon="ion-ios-bed" v-model="rooms" type="number" label="Habitaciones">
          </formsFieldsTextComponent>
        </v-col>
        <v-col class="col-4">
          <formsFieldsTextComponent prepend-inner-icon="mdi-toilet" type="number" v-model="bathrooms" label="Banos">
          </formsFieldsTextComponent>
        </v-col>
        <v-col class="col-4">
          <formsFieldsTextComponent prepend-inner-icon="ion-md-expand" type="number" v-model="square_meters"
            label="Metros cuadrados">
          </formsFieldsTextComponent>
        </v-col>
        <v-col class="col-12">
          <v-card outlined class="rounded-lg">
            <v-card-title class="text-subtitle-2 font-weight-regular">
              EXPENSAS
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col class="col-md-3">
                  <formsFieldsSelectComponent :items="['USD','UYU']" value="USD" v-model="expenses_currency"
                    label="Moneda">
                  </formsFieldsSelectComponent>
                </v-col>
                <v-col class="col-md-9">
                  <formsFieldsTextComponent prepend-inner-icon="mdi-currency-usd" type="number" v-model="expenses_cost"
                    label="Costo">
                  </formsFieldsTextComponent>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text>
              <v-radio-group hide-details v-model="expenses_payment_method">
                <v-row>
                  <v-col class="col-md-6">
                    <formsFieldsRadioComponent value="Card" label="Tarjeta">
                    </formsFieldsRadioComponent>
                  </v-col>
                  <v-col class="col-md-6">
                    <formsFieldsRadioComponent value="Cash" label="Efectivo">
                    </formsFieldsRadioComponent>
                  </v-col>
                </v-row>
              </v-radio-group>
            </v-card-text>
          </v-card>

        </v-col>

        <v-col class="col-12">
          <v-card outlined class="rounded-lg">
            <v-card-title class="text-subtitle-2 font-weight-regular">
              AMENITIES
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-chip-group multiple v-model="amenities">
                <v-chip filter active-class="primary" class="font-weight-bold text-uppercase" label
                  close-icon="cursor-pointer" :value="amenity.id" v-for="amenity in amenitiesList.data"
                  :key="'a'+amenity.id">
                  {{amenity.attributes.name}}&nbsp;
                </v-chip>
              </v-chip-group>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="col-12">
          <v-card outlined class="rounded-lg">
            <v-card-title class="text-subtitle-2 font-weight-regular">
              PROPIEDAD EN ALQUILER
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-radio-group hide-details v-model="in_rent">
                <v-row>
                  <v-col class="col-md-6">
                    <formsFieldsRadioComponent :value="true" label="SI">
                    </formsFieldsRadioComponent>
                  </v-col>
                  <v-col class="col-md-6">
                    <formsFieldsRadioComponent :value="false" label="NO">
                    </formsFieldsRadioComponent>
                  </v-col>
                </v-row>
              </v-radio-group>
            </v-card-text>
          </v-card>

        </v-col>

      </v-row>
    </v-card-text>
  </GeneralCardComponent>
</template>

<script>
  import {
    mapFields
  } from 'vuex-map-fields';
  export default {
    data() {
      return {
        selected: false,
      }
    },
    created() {
      this.getPropertyData()
        this.$store.dispatch('amenities/find')
    },
    methods: {
      async getPropertyData() {},
      amenitySelected(value) {
        return this.amenitiesList.includes(value);
      },
      selectAmenity(value) {
        console.log("aca")
        if (this.amenitySelected(value)) {
          this.amenities = this.amenities.filter(amenity => amenity !== value);
        } else {
          this.amenities.push(value);
        }
      }
    },
    computed: {
      amenitiesList() {
        return this.$store.getters['amenities/getList']
      },
      ...mapFields('apartments', [
        'apartment.number',
        'apartment.rooms',
        'apartment.bathrooms',
        'apartment.square_meters',
        'apartment.payment_method',
        'apartment.amenities',
        'apartment.expenses_payment_method',
        'apartment.expenses_currency',
        'apartment.expenses_cost',
        'apartment.in_rent',
        'apartment.test',
      ]),

    },
  }

</script>

<style>

</style>
