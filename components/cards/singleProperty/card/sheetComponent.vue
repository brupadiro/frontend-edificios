<template>
  <GeneralCardComponent class="rounded-xl v-card-text-overflow">
    <slot name="toolbar"></slot>
    <v-card-text class="text-h6 font-weight-bold black--text">
      <v-row>
        <v-col class="col-12 col-md-8 col-xl-8">
          <v-row>
            <v-col class="col-12">
              <v-divider></v-divider>
            </v-col>
            <v-col class="col-12">
              <v-row no-gutters>
                <v-row no-gutters>
                  <v-btn fab class="rounded-lg" depressed>
                    <v-icon size="30">
                      mdi-home
                    </v-icon>
                  </v-btn>
                  &nbsp;
                  &nbsp;
                  <div>
                    <h3>N {{data.attributes.number}}</h3>
                  </div>
                </v-row>
                <v-row no-gutters>
                  <v-btn fab class="rounded-lg" depressed>
                    <v-icon size="30">
                      mdi-square-outline
                    </v-icon>
                  </v-btn>
                  &nbsp;
                  &nbsp;
                  <div>
                    <h3>{{data.attributes.square_meters}} m</h3>
                    <p class="font-weight-light text-subtitle-2">Metros cubiertos</p>
                  </div>
                </v-row>
                <v-row no-gutters>
                  <v-btn fab class="rounded-lg" depressed>
                    <v-icon size="30">
                      mdi-square-outline
                    </v-icon>
                  </v-btn>
                  &nbsp;
                  &nbsp;
                  <div>
                    <h3>{{data.attributes.rooms}}</h3>
                    <p class="font-weight-light text-subtitle-2">Habitaciones</p>
                  </div>
                </v-row>
              </v-row>
            </v-col>
            <v-col class="col-12">
              <v-divider></v-divider>
            </v-col>
            <v-col class="col-12">
              <h5>Amenities</h5>
            </v-col>
            <v-col class="col-12">
              <v-row no-gutters v-if="data.attributes.amenities">
                <v-chip class="margin-right-5" color="grey lighten-1 black--text mr-2 mb-2 font-weight-regular" label
                  dark v-for="amenity in data.attributes.amenities.data" :key="amenity.id">
                  {{amenity.attributes.name}}
                </v-chip>
              </v-row>
            </v-col>
            <!--
                        <v-col class="col-12">
                          <h5>Imagenes de la propiedad</h5>
                        </v-col>
                        <v-col class="col-12">
                          <v-row no-gutters>
                            <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" class="mr-2 rounded-lg"
                              max-height="70" max-width="80" alt=""></v-img>
                            <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" class="mr-2 rounded-lg"
                              max-height="70" max-width="80" alt=""></v-img>
                            <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" class="mr-2 rounded-lg"
                              max-height="70" max-width="80" alt=""></v-img>
                            <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" class="mr-2 rounded-lg"
                              max-height="70" max-width="80" alt=""></v-img>
                          </v-row>
                        </v-col>

                        -->
          </v-row>
        </v-col>
        <v-col class="col-12 col-md-4 col-xl-4">
          <v-card class="rounded-xl full-width" elevation="4" color="#333350">
            <v-card-title>
              <v-avatar>
                <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
              </v-avatar>
              &nbsp;
              <div class="pt-4">
                <h6 class="white--text font-weight-regular">{{owner.name}}</h6>
                <p class="text-subtitle-2 white--text">Propietario</p>
              </div>
            </v-card-title>
            <v-divider color="white"></v-divider>
            <v-card-text>
              <v-row no-gutters>
                <v-col class="col-12 col-sm-6">
                  <p class="white--text">Documento</p>
                </v-col>
                <v-col class="col-12 col-sm-6 text-right">
                  <p class="white--text">{{owner.doc}}</p>
                </v-col>
                <v-col class="col-12 col-sm-6">
                  <p class="white--text">Expensas</p>
                </v-col>
                <v-col class="col-12 col-sm-6 text-right">
                  <p class="white--text text-h6 font-weight-black">{{data.attributes.expenses_currency}}
                    {{data.attributes.expenses_cost}}</p>
                </v-col>
                <v-col class="col-12">
                  <v-btn color="secondary rounded-lg font-weight-regular" block class="text-capitalize">
                    CONTACTAR&nbsp; <v-icon color="white">ion-ios-send</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text>
      <v-card outlined class="rounded-lg">
        <v-card-title>
          Alquileres
          <v-spacer></v-spacer>
          <v-btn v-if="!readOnly" color="secondary white--text rounded-lg font-weight-black"
            @click="openRentalForm=!openRentalForm">
            AGREGAR NUEVO ALQUILER
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text v-if="openRentalForm">
          <RentalsFormComponent>
            <template v-slot:actions>
              <v-btn color="secondary white--text rounded-lg font-weight-black" @click="addNewRental()">
                AGREGAR ALQUILER
              </v-btn>
            </template>
          </RentalsFormComponent>
        </v-card-text>
        <v-card-text>
          <v-data-table hide-default-footer disable-sort calculate-widths :headers="headersRentals"
            :items="rentals.data" class="font-weight-bold text-h5">

            <template v-slot:item.name="{ item }">
              {{item.attributes.user.data.name}}
            </template>
            <template v-slot:item.doc="{ item }">
              {{item.attributes.user.data.doc}}
            </template>
            <template v-slot:item.attributes.start_date="{ item }">
              {{item.attributes.start_date | formatDate}}
            </template>
            <template v-slot:item.attributes.end_date="{ item }">
              {{item.attributes.end_date | formatDate}}
            </template>
          </v-data-table>

        </v-card-text>
      </v-card>
    </v-card-text>
  </GeneralCardComponent>
</template>

<script>
  export default {
    props: {
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
      readOnly: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.$root.$on('toggleFullScreen', () => {
        this.openRentalForm = false
      })
    },
    filters:{
      formatHabitants: (user, type) => {
        let data = user.data.attributes[type]
        return data ? data : ''
      }
    },
    data() {
      return {
        openRentalForm: false,
        headersRentals: [{
            text: 'Nombre',
            value: 'attributes.user.data.attributes.name'
          },
          {
            text: 'Documento',
            value: 'attributes.user.data.attributes.doc'
          },
          {
            text: 'Fecha de inicio',
            value: 'attributes.start_date'
          },
          {
            text: 'Fecha de fin',
            value: 'attributes.end_date'
          },
          {
            text: 'Acciones',
            value: 'actions',
            sortable: false
          },
        ],

      }
    },
    computed: {
      owner() {
        return this.$store.getters['owners/get']
      },
      rentals() {
        return this.$store.getters['rentals/getAll']
      }

    }
  }

</script>
