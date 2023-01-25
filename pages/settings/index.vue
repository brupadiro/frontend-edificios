<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:icon>
        <img src="/icons/cog.png" alt="icono" width="30" />
      </template>
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
            <GeneralCardTitleComponent class="primary font-weight-regular white--text mb-3">
              Areas del edificio
            </GeneralCardTitleComponent>
            <v-card-text>
              <v-input>
                <formsFieldsTextButtonComponent  button-color="secondary" notification-text="Area agregada!"
                  button-label="Agregar" v-model="amenity.name" @click="addArea()" label="Nombre del area">
                  <template v-slot:icon>
                    <v-icon>mdi-content-save</v-icon>
                  </template>
                </formsFieldsTextButtonComponent>
              </v-input>
            </v-card-text>
            <v-card-text>
              <v-chip-group multiple v-model="building.areas" column>
                <formsFieldsCheckboxComponent v-for="area in areas.data" close @click:close="deleteArea(area.id)"
                  notification-text="Amenitie eliminado" :key="'a'+area.id">
                  {{area.name}}
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
                <formsFieldsTextButtonComponent notification-text="Amenitie agregado!"
                  button-label="Agregar" button-color="secondary" v-model="amenity.name" @click="addAmenity()" label="Nombre del amenitie">
                  <template v-slot:icon>
                    <v-icon>mdi-content-save</v-icon>
                  </template>
                </formsFieldsTextButtonComponent>
              </v-input>
            </v-card-text>
            <v-card-text>
              <v-chip-group multiple v-model="building.amenities" column>
                <formsFieldsCheckboxComponent v-for="amenity in amenities.data" close
                  @click:close="deleteAmenitie(amenity.id)" notification-text="Amenitie eliminado"
                  :key="'a'+amenity.id">
                  {{amenity.name}}
                </formsFieldsCheckboxComponent>
              </v-chip-group>
            </v-card-text>
          </generalCardComponent>
        </v-col>
        <v-col class="col-12">
          <generalCardComponent>
            <GeneralCardTitleComponent class="primary font-weight-regular white--text mb-3">
              Usuarios
            </GeneralCardTitleComponent>
            <v-card-text>
              <v-form ref="form">
                <v-row>
                  <v-col class="col-12 col-md-9">
                    <v-row>
                      <v-col class="col-md-4 col-12">
                        <formsFieldsTextComponent label="CI" v-model="user.username"></formsFieldsTextComponent>
                      </v-col>
                      <v-col class="col-md-4 col-12">
                        <formsFieldsTextComponent label="Nombre" v-model="user.name"></formsFieldsTextComponent>
                      </v-col>
                      <v-col class="col-md-4 col-12">
                        <formsFieldsTextComponent label="Password" type="Password" v-model="user.password">
                        </formsFieldsTextComponent>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col class="col-12 col-md-3">
                    <v-btn color="secondary" block class="mt-8 rounded-lg font-weight-regular black--text" large @click="addUser()">
                      Guardar&nbsp;<v-icon>mdi-account</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

              </v-form>
            </v-card-text>
            <v-data-table :headers="headers" hide-default-footer :items="users">
              <template v-slot:item.id="{ item }">
                <v-icon small @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
            <v-card-text>
            </v-card-text>
          </generalCardComponent>
        </v-col>
      </v-row>
    </v-form>
    <v-snackbar color="success" v-model="dataSnackbar">
      Datos guardados con exito
    </v-snackbar>
  </v-container>

</template>

<script>
  export default {
    data() {
      return {
        building: {},
        amenity: {},
        user: {},
        headers: [{
          text: "CI",
          value: "username"
        }, {
          text: "Nombre",
          value: "name",
        }, {
          text: "Acciones",
          value: "id",
          align: 'center'
        }],
        dataSnackbar: false,
      }
    },
    created() {
      this.getAmenities()
      this.getAreas()
      this.getUsers()
    },
    methods: {
      saveSettings() {
        this.$axios.put('/buildings/' + this.$auth.user.building.id, {
          data: this.building
        }).then(response => {
          this.dataSnackbar = true
        })
      },
      getAmenities() {
        this.$store.dispatch('amenities/find')
      },
      getAreas() {
        this.$store.dispatch('areas/findAll')
      },
      getUsers() {
        this.$store.dispatch('users/findAll', {
          type: 'admin',
        })
      },
      addUser() {
        if (!this.$refs.form.validate()) return
        this.$store.dispatch('users/set', this.user)
        this.$store.dispatch('users/create', {
          type: 'admin'
        }).then(() => {
          this.user = {}
          this.getUsers()
        })
      },
      searchUsers() {

      },
      deleteItem() {
        this.$store.dispatch('users/delete', {
          id: this.user.id
        })
      },
      addAmenity() {
        this.$store.dispatch('amenities/add', this.amenity)
      },
      addArea() {
        this.$store.dispatch('areas/add', this.amenity)
      },
      deleteAmenitie(id) {
        this.$store.dispatch('amenities/delete', id)
      },
      deleteArea(id) {
        this.$store.dispatch('areas/delete', id)
      },
    },
    computed: {
      users() {
        return this.$store.getters['users/getList']
      },
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
