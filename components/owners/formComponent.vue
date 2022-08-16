<template>
  <GeneralCardComponent class="rounded-lg" elevation="12">
    <v-card-title class="text-subtitle-1 font-weight-regular">
      DATOS DEL PROPIETARIO
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-md-6">
      <v-row>
        <v-col class="col-12 col-sm-6">
          <formsFieldsTextComponent prepend-inner-icon="mdi-account" v-model="name"
            label="Nombre del propietario">
          </formsFieldsTextComponent>
        </v-col>
        <v-col class="col-12 col-sm-6">
          <formsFieldsTextComponent prepend-inner-icon="mdi-file" v-model="doc" type="number"
            label="Documento de identidad">
          </formsFieldsTextComponent>
        </v-col>
        <v-col class="col-12">
          <v-card outlined class="rounded-lg">
            <v-card-title class="text-subtitle-2 font-weight-regular">
              RESIDE EN LA PROPIEDAD
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-radio-group hide-details :disabled="in_rent" v-model="in_property">
                <v-row>
                  <v-col class="col-md-6">
                    <formsFieldsRadioComponent :value="true" label="SI">
                    </formsFieldsRadioComponent>
                  </v-col>
                  <v-col class="col-md-6">
                    <formsFieldsRadioComponent :value="false" label="NO">
                    </formsFieldsRadioComponent>
                  </v-col>
                </v-row>
              </v-radio-group>
            </v-card-text>
          </v-card>

        </v-col>
      </v-row>
    </v-card-text>
  </GeneralCardComponent>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

  export default {
    computed:{
      ...mapFields('owners',[
        'owner.name',
        'owner.doc',
        'owner.in_property'
      ]),
      in_rent() {
        return this.$store.getters['apartments/get'].in_rent
      }
    },
    watch: {
      owner: {
        handler(val) {
          this.$emit('input', {
            ...val,
            type: 'owner'
          })
        },
        deep: true
      }
    }
  }

</script>

<style>

</style>
