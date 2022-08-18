<template>
  <div>
    <v-btn-toggle rounded background-color="primary" class="elevation-12" dense color="primary">
      <v-btn icon outlined @click="singlePropertyModal = true">
        <v-icon color="white" class="icon-shadow">mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon outlined :to="`/properties/update/${data.id}`">
        <v-icon color="white" class="icon-shadow">mdi-pencil</v-icon>
      </v-btn>
    </v-btn-toggle>
    <v-dialog v-model="singlePropertyModal" width="1000" persistent>
      <GeneralCardComponent>
        <v-card-title style="background:#333350" class="fill-width">
          <v-tabs v-model="tab" hide-slider slider-color="primary" active-class="active-tab" grow>
            <v-tab ripple :value="1">
              <span class="font-weight-black white--text">FICHA</span>
            </v-tab>
            <v-tab ripple :value="2">
              <span class="font-weight-black white--text">VISITAS</span>
            </v-tab>
            <v-tab ripple :value="3" v-if="data.attributes.invoices && data.attributes.invoices.data.length>0">
              <span class="font-weight-black white--text">FACTURAS PENDIENTES</span>
            </v-tab>
          </v-tabs>
        </v-card-title>
        <v-card-text>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card class="rounded-xl v-card-text-overflow" flat>
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
                          <v-row no-gutters>
                            <v-chip class="margin-right-5"
                              color="grey lighten-1 black--text mr-2 mb-2 font-weight-regular" label dark
                              v-for="amenity in data.attributes.amenities.data" :key="amenity.id">
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
                              <v-btn color="yellow lighten-1 black--text rounded-lg font-weight-regular" block
                                class="text-capitalize">
                                <v-icon color="white">mdi-send</v-icon>&nbsp; Contactar
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <propertiesVisitsComponent :apartment="data" outlined class="mt-3"></propertiesVisitsComponent>
            </v-tab-item>
            <v-tab-item>
              <AccountingPaymentsComponent v-if="data.attributes.invoices" outlined class="mt-3" :data="data.attributes.invoices">
              </AccountingPaymentsComponent>
            </v-tab-item>

          </v-tabs-items>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary rounded-lg" @click="singlePropertyModal = false">
            CERRAR
          </v-btn>
        </v-card-actions>
      </GeneralCardComponent>
    </v-dialog>
  </div>
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
      }
    },
    data() {
      return {
        tab: 0,
        singlePropertyModal: false
      }
    },
    created() {
      this.getOwner()
    },
    methods: {
      getOwner() {
        this.$store.dispatch('owners/find', {
          apartment: this.data.id
        })
      }
    },
    computed: {
      owner() {
        return this.$store.getters['owners/get']
      }
    }
  }

</script>

<style>

</style>
