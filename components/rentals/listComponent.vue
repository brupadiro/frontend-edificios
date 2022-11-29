<template>
  <div>
    <v-card outlined class="rounded-lg">
      <v-card-title>
        Alquileres
        <v-spacer></v-spacer>
        <v-btn color="secondary black--text rounded-lg font-weight-black" @click="openRentalForm=!openRentalForm">
          AGREGAR NUEVO ALQUILER<v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table dense :items-per-page="-1" hide-default-footer disable-sort calculate-widths :headers="headersRentals"
          :items="rentals.data" class="font-weight-bold text-h5">
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
            <V-btn color="primary"  small @click="viewRental(item)">
              <v-icon>mdi-magnify</v-icon>
            </V-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="openRentalForm">

      <RentalsFormComponent>
        <template v-slot:header>
          <GeneralCardTitleComponent class="primary white--text">
            Agregar nuevo alquiler
            <v-spacer></v-spacer>
            <v-btn icon @click="openRentalForm=!openRentalForm">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </GeneralCardTitleComponent>
        </template>
        <template v-slot:actions>
          <v-btn color="secondary white--text rounded-lg font-weight-black" @click="addNewRental()">
            AGREGAR ALQUILER
          </v-btn>
        </template>
      </RentalsFormComponent>

    </v-dialog>
  </div>

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
    methods: {
      async addNewRental() {
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
              this.openRentalForm = false
            })

        } catch (e) {
          console.error(e)
        }
      },
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
