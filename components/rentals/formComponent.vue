<template>
  <GeneralCardComponent>
    <v-card-title class="text-subtitle-1 font-weight-regular">
      DATOS DEL INQUILINO
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-md-6">
      <v-row>
        <v-col class="col-12 col-sm-6">
          <formsFieldsTextComponent prepend-inner-icon="mdi-account" v-model="name" label="Nombre del inquilino">
          </formsFieldsTextComponent>
        </v-col>
        <v-col class="col-12 col-sm-6">
          <formsFieldsTextComponent prepend-inner-icon="mdi-file" v-model="doc" type="number"
            label="Documento de identidad">
          </formsFieldsTextComponent>
        </v-col>
        <v-col class="col-12">
          <formsFieldsSelectComponent prepend-inner-icon="mdi-file" v-model="warranty_type"
            :items="['Aseguradora','Deposito','Inmueble']" type="number" label="Tipo de garantia">
          </formsFieldsSelectComponent>
        </v-col>
        <v-col class="col-12">
          <v-card outlined class="rounded-lg">
            <v-card-title class="text-subtitle-2 font-weight-regular">
              PERIODO DE ALQUILER
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col class="col-md-6">
                  <formsFieldsTextComponent prepend-inner-icon="mdi-calendar" type="date" v-model="start_date"
                    label="Desde">
                  </formsFieldsTextComponent>
                </v-col>
                <v-col class="col-md-6">
                  <formsFieldsTextComponent prepend-inner-icon="mdi-calendar" type="date" v-model="end_date"
                    label="Hasta">
                  </formsFieldsTextComponent>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

        </v-col>
      </v-row>
    </v-card-text>
  </GeneralCardComponent>
</template>

<script>
  import {
    mapFields
  } from 'vuex-map-fields';
  export default {
    props: {},
    computed: {
      ...mapFields('rentals', [
        'rental.warranty_type',
        'rental.start_date',
        'rental.end_date',
      ]),
      ...mapFields('habitants', [
        'habitant.name',
        'habitant.doc',
      ]),

    },
    watch: {
      owner: {
        handler(val) {
          this.$emit('input', {
            ...val,
            type: 'tenant'
          })
        },
        deep: true
      }
    }
  }

</script>

<style>

</style>
