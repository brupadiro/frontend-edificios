<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:title>
        Agregar apartamento
      </template>
      <template v-slot:subtitle>
        <h4 class="font-weight-semi-regular grey--text text--darken-2">
          Agregue un nuevo apartamento a su edificio para llevar un mayor control del mismo.
        </h4>
      </template>
    </headersGeneralComponent>
    <v-form ref="form">
      <v-row>
        <v-col class="col-12">
          <propertiesFormComponent></propertiesFormComponent>
        </v-col>
        <v-col class="col-12">
          <ownersFormComponent></ownersFormComponent>
        </v-col>
        <v-col class="col-12" v-if="apartment.in_rent">
          <rentalsFormComponent v-model="rental"></rentalsFormComponent>
        </v-col>
        <v-col class="col-12">
          <GeneralCardComponent>
            <v-card-title class="text-subtitle-1 font-weight-regular">
              ARCHIVOS ADJUNTOS
            </v-card-title>
            <v-divider></v-divider>
            <generalUploadFilesComponent v-model="files"></generalUploadFilesComponent>
          </GeneralCardComponent>
        </v-col>
      </v-row>
    </v-form>
    <generalBottomBarComponent app>
      <v-btn text-color="white" class="secondary black--text rounded-lg font-weight-regular" @click="createApartment()">
        Guardar apartamento&nbsp;<v-icon>mdi-home</v-icon>
      </v-btn>
    </generalBottomBarComponent>
    <!-- error snackbar-->
    <v-snackbar v-model="errorInForm" :color="red">
      Hubo un error al enviar, por favor revise los datos e intente nuevamente
      <v-btn text @click="errorInForm = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  import {
    mapFields
  } from 'vuex-map-fields';

  export default {
    data() {
      return {
        errorInForm: false,
        rental: {
          habitant: {}
        }
      };
    },
    methods: {
      async createApartment() {
        if (!this.$refs.form.validate())
          return;

        try {
          //create apartment
          const {
            data: apartment
          } = await this.$store.dispatch("apartments/create");
          //check if apartment is in rent
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
          } else if (this.owner.in_property) {
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
        this.files.data.forEach((file) => {
          if (file.attributes instanceof File) {
            form.append(`files`, file.attributes, file.attributes.name);
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
      ...mapFields('apartments', [
        'files',
      ]),
      apartment() {
        return this.$store.getters["apartments/get"];
      },
      owner() {
        return this.$store.getters["owners/get"];
      }
    },
  }

</script>

<style>

</style>
