<template>
  <v-container>
    <HeadersGeneralComponent>
      <template v-slot:icon>
        <img src="/icons/account.png" alt="icono" width="30" />
      </template>
    <template v-slot:title>
        Autorizaciones
      </template>
    </HeadersGeneralComponent>
    <v-row>
      <v-col class="col-12">
        <PropertiesVisitsComponent elevation="6" :items="items" @update="getVisits()"></PropertiesVisitsComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        items: {}
      }
    },
    created() {
      this.$store.dispatch('apartments/findAll')
    },
  }

</script>
