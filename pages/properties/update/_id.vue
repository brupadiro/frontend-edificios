<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:title>
        Editar apartamento
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
          <rentalsFormComponent></rentalsFormComponent>
        </v-col>
        <v-col class="col-12">
          <GeneralCardComponent>
            <v-card-title class="text-subtitle-1 font-weight-regular">
              ARCHIVOS ADJUNTOS
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <generalUploadFilesComponent v-model="files"></generalUploadFilesComponent>
            </v-card-text>
          </GeneralCardComponent>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-col class="col-12 d-flex">
      </v-col>
    </v-row>
    <generalBottomBarComponent>
      <v-btn text-color="white" class="secondary black--text rounded-lg font-weight-regular"
        @click="updateApartment()">
        Guardar apartamento&nbsp;<v-icon>mdi-home</v-icon>
      </v-btn>
    </generalBottomBarComponent>
  </v-container>
</template>

<script>
  var qs = require('qs');
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
        },
      }
    },
    mounted() {
      this.getApartment()
    },
    methods: {
      async getApartment() {
        await this.$store.dispatch('apartments/find', {
          id: this.$route.params.id
        })
        await this.$store.dispatch('habitants/find', {
          apartment: this.$route.params.id
        })
        this.$store.dispatch('rentals/find', {
          apartment: this.$route.params.id
        })
        await this.$store.dispatch('owners/find', {
          apartment: this.$route.params.id
        })
        if (this.apartment.in_rent) {
          await this.$store.dispatch('rentals/find', {
            apartment: this.$route.params.id
          })
        }
      },
      async updateApartment() {
        if (!this.$refs.form.validate()) return
        await this.$store.dispatch('apartments/update', this.files)
        //create owner
        await this.$store.dispatch('owners/update')
        this.upload()
        this.$router.go(-1)
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
        return this.$store.getters['apartments/get']
      }
    },
  }

</script>

<style>

</style>
