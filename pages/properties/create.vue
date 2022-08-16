<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:title>
        Agregar apartamento
      </template>
      <template v-slot:subtitle>
        <h4 class="font-weight-semi-regular grey--text text--darken-2">
          Agregue un nuevo apartamento a su edificio para llevar un mayor control del mismo.
        </h4>
      </template>
    </headersGeneralComponent>
    <v-form ref="form">
      <v-row>
        <v-col class="col-12">
          <propertiesFormComponent></propertiesFormComponent>
        </v-col>
        <v-col class="col-12">
          <ownersFormComponent></ownersFormComponent>
        </v-col>
        <v-col class="col-12" v-if="apartment.in_rent">
          <rentalsFormComponent v-model="rental"></rentalsFormComponent>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-col class="col-12 d-flex">
      </v-col>
    </v-row>
    <generalBottomBarComponent app>
      <v-btn text-color="white" class="yellow lighten-1 black--text rounded-lg font-weight-regular" @click="createApartment()">
        Guardar apartamento&nbsp;<v-icon>mdi-home</v-icon>
      </v-btn>
    </generalBottomBarComponent>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        owner: {
          in_property: false,
        },
        rental: {
          habitant: {}
        }
      }
    },
    methods: {
      async createApartment() {
        if (!this.$refs.form.validate()) return
        await this.$store.dispatch('apartments/create')
        //create owner
        await this.$store.dispatch('owners/create')
        if (this.apartment.in_rent) {
          await this.$store.dispatch('rentals/create')
          this.$store.dispatch('rentals/clear')
        }
        this.$store.dispatch('apartments/clear')
        this.$store.dispatch('habitants/clear')
        this.$store.dispatch('owner/clear')
        this.$router.go(-1)
      }
    },
    computed: {
      apartment() {
        return this.$store.getters['apartments/get']
      }
    },
  }

</script>

<style>

</style>
