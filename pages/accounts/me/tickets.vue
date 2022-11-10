<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:title>
        Ticket de soporte
      </template>
    </headersGeneralComponent>
    <ticketsListComponent :apartment="$auth.user.data.apartment"></ticketsListComponent>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        prioritys: [{
          text: 'Baja',
          value: 'Low'
        }, {
          text: 'Media',
          value: 'Medium'
        }, {
          text: 'Alta',
          value: 'High'
        }],
        areas: {},
        tickets: {
          data: []
        },
      }
    },
    created() {},
    methods: {},
  }

</script>

<style>

</style>
