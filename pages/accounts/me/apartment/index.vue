<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:title>
        Mi apartamento
      </template>
    </headersGeneralComponent>


    <cardsSinglePropertyCardSheetComponent :readOnly="readOnly" class="elevation-6" :data="apartment">
      <template v-slot:toolbar>
        <v-toolbar color="primary" flat>
          <v-toolbar-title>
            <v-icon color="white">mdi-home</v-icon>
            <span class="ml-2 font-weight-regular white--text">Ficha</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="secondary" class="rounded-lg" to="/accounts/me/apartment/update">
            Editar ficha
            &nbsp;
            <v-icon class="mb-1">ion-ios-create</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
    </cardsSinglePropertyCardSheetComponent>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      readOnly: true
    }
  },
  created(){
        this.$store.dispatch('apartments/find', {
            id: 66
        })
          this.$store.dispatch('owners/find', {
            apartment: 66
          })
          this.$store.dispatch('rentals/findAll', {
            filters: {
              apartment: 66
            },
            populate: '*'
          })
  },
  computed:{
    apartment(){
      return {attributes:this.$store.getters['apartments/get']}
    }
  }
}

</script>
