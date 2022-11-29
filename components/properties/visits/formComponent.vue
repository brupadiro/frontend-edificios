<template>
  <generalCardComponent>
    <generalCardTitleComponent>
      REGISTRO DE AUTORIZACIONES
    </generalCardTitleComponent>
    <v-divider></v-divider>
    <v-card-text class="py-6">
      <v-form ref="form">
        <v-row>
          <v-col class="col-12" :class="{'col-sm-12':!apartment.id,'col-sm-6':apartment.id}">
            <formsFieldsTextComponent v-model="name" prepend-inner-icon="mdi-account" label="NOMBRE">
            </formsFieldsTextComponent>
          </v-col>
          <v-col class="col-12 col-sm-6" v-show="!apartment.id">
            <formsFieldsSelectComponent v-model="apartment" item-text="number" item-value="id"
              :items="apartmentsList.data" type="number" label="APARTAMENTO"></formsFieldsSelectComponent>
          </v-col>
          <v-col class="col-12 col-sm-6">
            <formsFieldsTextComponent v-model="persons" type="number" prepend-inner-icon="mdi-account"
              label="CANT PERSONAS">
            </formsFieldsTextComponent>
          </v-col>
          <v-col class="col-12 col-sm-6">
            <v-row>
              <v-col class="col-4">
                <FormsFieldsSelectComponent :items="['CI', 'PASAPORTE']" v-model="doc_type" item-text="name"
                  item-value="id" label=".">
                </FormsFieldsSelectComponent>
              </v-col>
              <v-col class="col-8">
                <formsFieldsTextComponent v-model="doc" type="number" prepend-inner-icon="mdi-file-document"
                  label="DOC (SIN PUNTOS NI GUIONES)"></formsFieldsTextComponent>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-sm-6">
            <formsFieldsTextComponent v-model="phone" type="number" prepend-inner-icon="mdi-phone" label="TELEFONO">
            </formsFieldsTextComponent>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-text>
      <GeneralCardComponent outlined>
        <GeneralCardTitleComponent>Fecha de entrada</GeneralCardTitleComponent>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col class="col-12 col-sm-6">
              <formsFieldsTextComponent v-model="in_date" type="date" label="FECHA"></formsFieldsTextComponent>
            </v-col>
            <v-col class="col-12 col-sm-6">
              <label class="font-weight-regular mb-2 grey--text text--darken-4 text-uppercase text-subtitle-2">HORA</label>
              <v-menu ref="entrymenu" v-model="hourEntryMenu" :close-on-content-click="false" :nudge-right="40"
                :return-value.sync="in_hour" transition="scale-transition" offset-y max-width="290px"
                min-width="290px">
                <template v-slot:activator="{on}">
                  <v-btn block class="black--text rounded-lg" color="white" x-large v-on="on">
                    {{ in_hour }}&nbsp;&nbsp;<v-icon>mdi-clock-outline</v-icon>
                  </v-btn>
                </template>
                <v-time-picker v-if="hourEntryMenu" v-model="in_hour" full-width
                  @click:minute="$refs.entrymenu.save(in_hour)"></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
      </GeneralCardComponent>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-row>
        <v-col class="col-12 col-sm-6">
          <v-btn color="red darken-1 white--text" @click="$emit('openForm', false)" x-large block>
            CANCELAR
          </v-btn>
        </v-col>
        <v-col class="col-12 col-sm-6">
          <v-btn color="secondary" class="white--text font-weight-regular" x-large block @click="addVisit()">
            CHECK IN
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </generalCardComponent>

</template>

<script>
  import {
    mapFields
  } from 'vuex-map-fields';
  export default {
    data() {
        return{
            hourEntryMenu: false,
        }
    },
    methods: {
      addVisit() {
        this.$store.dispatch('visits/create')
        this.$root.$emit('updateVisits')
      }
    },
    computed: {
      apartmentsList() {
        return this.$store.getters['apartments/getList']
      },
      ...mapFields('visits', [
        'visit.name',
        'visit.apartment',
        'visit.persons',
        'visit.doc_type',
        'visit.phone',
        'visit.in_hour',
        'visit.in_date',
        'visit.doc',
      ]),


    }
  }

</script>

<style>

</style>
