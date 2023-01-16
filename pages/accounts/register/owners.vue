<template>
  <v-container fill-height>
    <v-row justify="center" align-content="center">
      <v-col class="col-12 d-flex justify-center">
      </v-col>
      <v-col class="col-12 col-md-8 col-lg-7">
        <GeneralCardComponent>
          <GeneralCardTitleComponent class="primary white--text text-center d-block">
            Registrate como propietario en<br>Forest
          </GeneralCardTitleComponent>
          <v-stepper class="rounded-xl transparent" elevation="0" v-model="step">
            <v-stepper-header class="elevation-0">
              <v-stepper-step :complete="step > 1" step="1">
                <span class="font-weight-regular ">Datos del propietario</span>
              </v-stepper-step>
              <v-divider class="black"></v-divider>
              <v-stepper-step :complete="step > 2" step="2" class="font-weight-regular">
                <span class="font-weight-regular">Confirmacion</span>
              </v-stepper-step>
            </v-stepper-header>
            <v-divider></v-divider>
            <v-stepper-items>
              <v-stepper-content step="1">
                <OwnersFormComponent class="elevation-0"></OwnersFormComponent>
                <v-card-text>
                  <v-card flat>
                    <v-card-text>
                      <propertiesFormFieldNumberComponent v-model="numberApartment" type="number" label="APARTAMENTO">
                      </propertiesFormFieldNumberComponent>
                    </v-card-text>
                  </v-card>
                </v-card-text>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-card-text class="text-center d-flex align-center justify-center flex-column class py-12">
                  <img width="200" contain src="/logo.png">
                  <h2 class="font-weight-regular">Estamos creando tu cuenta!</h2>
                  <h2 class="font-weight-regular">Espera hasta que la confirmemos</h2>
                  <v-progress-circular indeterminate color="secondary" size="150" width="14" class="mt-4">
                  </v-progress-circular>
                </v-card-text>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
          <v-card-text class="px-14">
            Nota:Tu documento sera tu contraseña para ingresar a la plataforma.
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" class="rounded-lg black--text font-weight-regular" @click="addOwner()">
              Guardar&nbsp;<v-icon>ion-ios-save</v-icon>
            </v-btn>
          </v-card-actions>
        </GeneralCardComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import apartmentsMixins from '~/plugins/mixins/forms/apartments.js'
  import {
    mapFields
  } from 'vuex-map-fields';

  export default {
    layout: 'empty',
    auth: false,
    mixins: [apartmentsMixins],
    data() {
      return {
        numberApartment: null,
        formSubmitted: false,
        step: 1
      }
    },
    created() {
      this.$store.dispatch('apartments/findAll', )
    },
    methods: {
      async addOwner() {
        await this.$store.dispatch("owners/register",{number:this.numberApartment})
        return
        this.$store.dispatch("apartments/create")
          .then(async (data) => {
            this.$store.dispatch('owners/set', {
              apartment: data.data.id,
            })
            await this.$store.dispatch("owners/create")
          }).then(async () => {
            this.$store.dispatch("owners/clear");
            this.$store.dispatch('owners/clearUser')
          })
          .then(async () => {
            const dataLogin = await this.$store.dispatch('users/login', this.account)
            this.$store.dispatch('users/clear')
            return dataLogin
          })
          .then((data) => {
            console.log(data.data)
          }).catch((error) => {
            this.$store.dispatch("owners/clear");
            this.$store.dispatch('owners/clearUser')
            this.$store.dispatch('users/clear')
          })
      }
    },
    computed: {
      ...mapFields('apartments', [
        'apartment.number'
      ]),

      account() {
        return this.$store.getters['users/get']
      },
      apartmentsList() {
        return this.$store.getters['apartments/getList']
      }
    }
  }

</script>

<style>

</style>
