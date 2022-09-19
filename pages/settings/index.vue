<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:title>
        Configuracion
      </template>
      <template v-slot:subtitle>
        Configuracion e informacion del edificio
      </template>
    </headersGeneralComponent>
    <v-form ref="form">
      <v-row>
        <v-col class="col-12">
          <generalCardComponent>
            <v-card-title class="primary font-weight-regular white--text mb-3">
              Datos del edificio
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col class="col-12">
                  <formsFieldsTextComponent label="Nombre del edificio"></formsFieldsTextComponent>

                </v-col>
                <v-col class="col-12">
                  <formsFieldsTextComponent prepend-inner-icon="mdi-map-marker" label="Direccion">
                  </formsFieldsTextComponent>

                </v-col>
                <v-col class="col-12">
                  <formsFieldsSelectComponent :items="['Maldonado']" prepend-inner-icon="mdi-map" label="Localidad">
                  </formsFieldsSelectComponent>

                </v-col>

              </v-row>
            </v-card-text>
          </generalCardComponent>
        </v-col>
        <v-col class="col-12">
          <generalCardComponent>
            <GeneralCardTitleComponent class="primary font-weight-regular white--text mb-3">
              Areas del edificio
            </GeneralCardTitleComponent>
            <v-card-text>
              <v-input>
                <formsFieldsTextButtonComponent class="elevation-6 rounded-lg" notification-text="Amenitie agregado!" button-label="Agregar"
                  v-model="amenity.name" @click="addArea()" label="Nombre del area">
                  <template v-slot:icon>
                      <v-icon>mdi-content-save</v-icon>
                  </template>
                </formsFieldsTextButtonComponent>
              </v-input>
            </v-card-text>
            <v-card-text>
              <v-chip-group multiple v-model="building.areas" column>
                <formsFieldsCheckboxComponent v-for="area in areas.data" close @click:close="deleteArea(area.id)" notification-text="Amenitie eliminado" :key="'a'+area.id">
                  {{area.attributes.name}}
                </formsFieldsCheckboxComponent>
              </v-chip-group>
            </v-card-text>
          </generalCardComponent>
        </v-col>
        <v-col class="col-12">
          <generalCardComponent>
            <GeneralCardTitleComponent class="primary font-weight-regular white--text mb-3">
              Amenities del edificio
            </GeneralCardTitleComponent>
            <v-card-text>
              <v-input>
                <formsFieldsTextButtonComponent class="elevation-6 rounded-lg" notification-text="Amenitie agregado!" button-label="Agregar"
                  v-model="amenity.name" @click="addAmenity()" label="Nombre del amenitie">
                  <template v-slot:icon>
                      <v-icon>mdi-content-save</v-icon>
                  </template>
                </formsFieldsTextButtonComponent>
              </v-input>
            </v-card-text>
            <v-card-text>
              <v-chip-group multiple v-model="building.amenities" column>
                <formsFieldsCheckboxComponent v-for="amenity in amenities.data" close @click:close="deleteAmenitie(amenity.id)" notification-text="Amenitie eliminado" :key="'a'+amenity.id">
                  {{amenity.attributes.name}}
                </formsFieldsCheckboxComponent>
              </v-chip-group>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text-color="white" @click="saveSettings()">
                Guardar
              </v-btn>
            </v-card-actions>
          </generalCardComponent>
        </v-col>

      </v-row>
    </v-form>
  </v-container>

</template>

<script>
  export default {
    data() {
      return {
        building: {},
        amenity: {}
      }
    },
    created() {
      this.getAmenities() 
      this.getAreas()
    },
    methods: {
      getAmenities() {
        this.$store.dispatch('amenities/find')
      },
      getAreas() {
        this.$store.dispatch('areas/find')
      },
      addAmenity() {
        this.$store.dispatch('amenities/add', {
          data: this.amenity
        })
      },
      addArea() {
        this.$store.dispatch('areas/add', {
          data: this.amenity
        })
      },
      deleteAmenitie(id) {
        this.$store.dispatch('amenities/delete', id)
      },
      deleteArea(id) {
        this.$store.dispatch('areas/delete', id)
      },
    },
    computed: {
      amenities() {
        return this.$store.getters['amenities/getList']
      },
      areas() {
        return this.$store.getters['areas/getList']
      }
     
    }
  }

</script>

<style>

</style>
