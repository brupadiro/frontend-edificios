<template>
  <v-container>
    <HeadersGeneralComponent>
      <template v-slot:icon>
        <img src="/icons/logout.png" alt="icono" width="30" />
      </template>
    <template v-slot:title>
        Entradas
      </template>
    </HeadersGeneralComponent>


    <v-row>
      <v-col class="col-12">
        <generalCardComponent class="rounded-lg">
          <v-card-title>
            Entradas
            <v-spacer></v-spacer>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-data-table dense :items-per-page="-1" hide-default-footer disable-sort calculate-widths
              :headers="headersRentals" :items="rentals.data" class="font-weight-bold text-h5">
              <!-- no data slot -->
              <template v-slot:no-data>
                <v-alert :value="true" color="warning" small icon="mdi-alert-circle">
                  No se encontraron alquileres para esta propiedad
                </v-alert>
              </template>
              <template v-slot:item.start_date="{ item }">
                {{item.start_date}}
              </template>
              <template v-slot:item.end_date="{ item }">
                {{item.end_date}}
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn color="primary" small @click="viewRental(item)">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </generalCardComponent>
      </v-col>
    </v-row>

    <v-dialog v-model="openRentalForm">

<RentalsFormComponent>
  <template v-slot:header>
    <GeneralCardTitleComponent class="primary white--text">
      Ver inquilino
      <v-spacer></v-spacer>
      <v-btn icon @click="openRentalForm=!openRentalForm">
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </GeneralCardTitleComponent>
  </template>
</RentalsFormComponent>

</v-dialog>


  </v-container>
</template>

<script>
  export default {
    props:{
      apartment:{
        type:Object,
        required:true,
        default:()=>({})
      }
    },
    data() {
      return {
        openRentalForm: false,
        headersRentals: [{
            text: 'Nombre',
            value: 'user.name'
          },
          {
            text: 'Documento',
            value: 'user.username'
          },
          {
            text: 'Entrada',
            value: 'start_date'
          },
          {
            text: 'Salida',
            value: 'end_date'
          },
          {
            text: 'Acciones',
            value: 'actions',
            align:'center'
          },
        ],
      }
    },
    created() {
        this.$store.dispatch('rentals/findAll',{
            populate:'*'
        })
    },
    methods: {
      viewRental(item){
        console.log(item)
        this.$store.dispatch('rentals/set',item)
        this.$store.dispatch('rentals/setUser',item.user)
        this.openRentalForm = true
      }
    },

    computed: {
      rentals() {
        return this.$store.getters['rentals/getAll']
      }

    }
  }

</script>

<style>

</style>
