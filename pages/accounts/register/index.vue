<template>
  <v-container fill-height>
    <v-row justify="center" align-content="center">
      <v-col class="col-12 d-flex justify-center">
      </v-col>
      <v-col class="col-12 col-md-8 col-lg-7">
        <GeneralCardComponent>
          <v-divider></v-divider>
          <GeneralCardTitleComponent class="d-flex justify-center text-h5">
            Registrate como inquilino
          </GeneralCardTitleComponent>

          <v-divider></v-divider>
          <v-card-text class="pt-0" v-if="!formSubmitted">
            <v-row no-gutters>
              <v-col class="col-12">
                <RentalsFormComponent class="elevation-0"></RentalsFormComponent>
              </v-col>
              <v-col class="col-12">
                <formsFieldsSelectComponent @input="updateApartment" item-text="number" return-object
                  :items="apartmentsList.data" type="number" label="APARTAMENTO">
                </formsFieldsSelectComponent>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text v-else class="text-center d-flex align-center justify-center flex-column class py-12">
          <img width="200" contain src="/logo.png">
          <h2 class="font-weight-regular">Estamos creando tu cuenta!</h2>
          <h2 class="font-weight-regular">Espera hasta que la confirmemos</h2>
          <v-progress-circular indeterminate color="secondary" size="150" width="14" class="mt-4">
          </v-progress-circular>
        </v-card-text>
          <v-divider></v-divider>
          <v-card-actions v-if="!formSubmitted">
            <v-spacer></v-spacer>
            <v-btn color="secondary" class="rounded-lg black--text font-weight-regular" @click="addTenant()">
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
  export default {
    layout: 'empty',
    mixins: [apartmentsMixins],
    data() {
      return {
        formSubmitted: false,
      }
    },
    created() {
      this.$store.dispatch('apartments/findAll', )
    },
    methods: {
      updateApartment(e) {
        this.$store.dispatch('apartments/set', e)
      },
      addTenant() {
        try {
          this.$store.dispatch('rentals/set', {
            apartment: this.apartment.id,
          })
          this.$store.dispatch("rentals/create")
            .then(() => {
              this.$store.dispatch("rentals/clear");
              this.$store.dispatch('users/clear')
              this.$store.dispatch('rentals/clearUser')
              this.getRentals()
              this.formSubmitted = true
            })

        } catch (e) {
          console.error(e)
        }
      }
    },
    computed: {
      apartmentsList() {
        return this.$store.getters['apartments/getList']
      }
    }
  }

</script>

<style>

</style>
