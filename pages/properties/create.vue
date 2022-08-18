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
      <v-btn text-color="white" class="yellow lighten-1 black--text rounded-lg font-weight-regular"
        @click="createApartment()">
        Guardar apartamento&nbsp;<v-icon>mdi-home</v-icon>
      </v-btn>
    </generalBottomBarComponent>
  </v-container>
</template>

<script>
  import {
    mapFields
  } from 'vuex-map-fields';

  export default {
    data() {
      return {
        owner: {
          in_property: false,
        },
        rental: {
          habitant: {}
        }
      };
    },
    methods: {
      async createApartment() {
        if (!this.$refs.form.validate())
          return;
        await this.$store.dispatch("apartments/create");
        //create owner
        await this.$store.dispatch("owners/create");
        if (this.apartment.in_rent) {
          await this.$store.dispatch("rentals/create");
          this.$store.dispatch("rentals/clear");
        }
        this.upload()
        this.$store.dispatch("apartments/clear");
        this.$store.dispatch("habitants/clear");
        this.$store.dispatch("owner/clear");
        this.$router.go(-1);
      },
      async upload() {
        if (this.files.length == 0) return
        var form = new FormData()
        form.append('ref', 'api::apartament.apartament')
        form.append('refId', this.apartment.id)
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
      }
    },
  }

</script>

<style>

</style>
