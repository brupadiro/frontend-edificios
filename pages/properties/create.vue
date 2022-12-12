<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:icon>
        <v-app-bar-nav-icon>
          <v-btn icon to="/">
            <v-icon color="white">mdi-arrow-left</v-icon>
          </v-btn>
        </v-app-bar-nav-icon>
      </template>
      <template v-slot:title>
        Agregar apartamento
      </template>
      <template v-slot:subtitle>
        Agregue un nuevo apartamento a su edificio para llevar un mayor control del mismo.
      </template>
    </headersGeneralComponent>
    <v-stepper v-model="step" ref="stepper" class="transparent" flat>
      <GeneralCardComponent class="ma-3 mb-0 rounded-b-0">
        <v-stepper-header>
          <v-stepper-step :complete="step > 1" step="1">
            Datos del apartamento
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 2" step="2">
            Datos del propietario <span v-if="apartment.in_rent">/ inquilino</span>
          </v-stepper-step>

          <v-divider></v-divider>
          <v-stepper-step step="3">
            Archivos adjuntos
          </v-stepper-step>

        </v-stepper-header>
      </GeneralCardComponent>
      <v-stepper-items>
        <v-stepper-content step="1" class="pa-0">
          <v-form ref="formApartments">
            <propertiesFormComponent class="ma-3 mt-0 rounded-t-0"></propertiesFormComponent>
          </v-form>
        </v-stepper-content>
        <v-stepper-content step="2" class="pa-0">
          <v-form ref="formOwners">
            <v-row>
              <v-col class="col-12">
                <ownersFormComponent class="ma-3 mt-0 rounded-t-0"></ownersFormComponent>
              </v-col>
              <v-col class="col-12" v-if="apartment.in_rent">
                <rentalsFormComponent class="ma-3 mt-0 0" v-model="rental"></rentalsFormComponent>
              </v-col>
            </v-row>
          </v-form>
        </v-stepper-content>
        <v-stepper-content class="pa-0" step="3" v-if="true">

          <GeneralCardComponent class="ma-3 mt-0 rounded-t-0">
            <v-card-title class="text-subtitle-1 font-weight-regular">
              ARCHIVOS ADJUNTOS
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-form ref="formFiles">
                <generalUploadFilesComponent class="elevation-0" :value="files" @input="files = $event"></generalUploadFilesComponent>
              </v-form>
            </v-card-text>
          </GeneralCardComponent>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <propertiesActionsBottomBarComponent v-model="step" :files="files"></propertiesActionsBottomBarComponent>
    <!-- error snackbar-->
  </v-container>
</template>

<script>
  export default {

    data() {
      return {
        files: [],
        step: 3,
        rental: {
          habitant: {}
        }
      };
    },
    created() {
      //this.$store.dispatch("apartments/clear");
      this.$store.dispatch("habitants/clear");
      this.$store.dispatch("owners/clear");
      this.$store.dispatch("owners/clearUser");
      this.$store.dispatch("rentals/clearUser");
    },
    methods: {
      async createApartment2() {
        //check if apartment is in rent
      },
      async createRental() {
        if (this.apartment.in_rent) {
          //add habitant
          this.$store.dispatch('habitants/set', {
            apartment: apartment.id,
            type: 'tenant'
          })
          const {
            data: habitant
          } = await this.$store.dispatch("habitants/create");
          //add rental
          this.$store.dispatch('rentals/set', {
            apartment: apartment.id,
            habitants: habitant.id
          })
          await this.$store.dispatch("rentals/create");
          this.$store.dispatch("rentals/clear");
          //check if owner is in property
        }

      },
      async createOwner() {
        if (this.owner.in_property) {
          //add owner as habitant
          this.$store.dispatch('habitants/set', {
            name: this.owner.name,
            doc: this.owner.doc,
            apartment: apartment.id,
            type: 'owner'
          })
          const {
            data: habitant
          } = await this.$store.dispatch("habitants/create");

        }

        //create owner
        await this.$store.dispatch("owners/create", {
          apartment: apartment,
        });
      },
      async createApartment() {
        if (!this.$refs.form.validate())
          return;

        try {
          //create apartment
          const {
            data: apartment
          } = await this.$store.dispatch("apartments/create");
          //check if apartment is in rent
          if (this.apartment.in_rent) {} else if (this.owner.in_property) {
            //add owner as habitant
            this.$store.dispatch('habitants/set', {
              name: this.owner.name,
              doc: this.owner.doc,
              apartment: apartment.id,
              type: 'owner'
            })
            const {
              data: habitant
            } = await this.$store.dispatch("habitants/create");

          }

          //create owner
          await this.$store.dispatch("owners/create", {
            apartment: apartment,
          });
          this.upload(apartment.id)
          this.$store.dispatch("apartments/clear");
          this.$store.dispatch("habitants/clear");
          this.$store.dispatch("owners/clear");
          this.$router.go(-1);

        } catch (error) {
          console.log(error)
          this.errorInForm = true
          setTimeout(() => {
            this.errorInForm = false
          }, 3000);
        }
      },
      async upload(apartmentID) {
        if (this.files.length == 0) return
        var form = new FormData()
        form.append('ref', 'api::apartament.apartament')
        form.append('refId', apartmentID)
        form.append('field', 'files')
        this.files.forEach((file) => {
          if (file instanceof File) {
            form.append(`files`, file, file.name);
          }
        });
        await this.$axios.post('/upload', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      },

    },
    computed: {
      apartment() {
        return this.$store.getters["apartments/get"];
      },
      owner() {
        return this.$store.getters["owners/get"];
      },
    },
  }

</script>

<style>

</style>
