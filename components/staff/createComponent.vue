<template>
  <v-dialog v-model="value" max-width="1000">
    <GeneralCardComponent>
      <GeneralCardTitleComponent class="primary white--text">
        Agregar staff
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('input',false)">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </GeneralCardTitleComponent>
      <v-divider></v-divider>
      <v-card-text class="pa-3">
        <v-form ref="form">
          <v-row>
            <v-col class="col-md-9 col-12">
              <v-row>
                <v-col class="col-12">
                  <FormsFieldsTextComponent label="Nombre" :rules="rules.required" v-model="name">
                  </FormsFieldsTextComponent>
                </v-col>
                <v-col class="col-4">
                  <FormsFieldsSelectComponent :items="['CI', 'PASAPORTE']" :rules="rules.required" label="Documento"
                    type="number" v-model="doc_type"></FormsFieldsSelectComponent>
                </v-col>
                <v-col class="col-8">
                  <FormsFieldsTextComponent label="_" type="number" :rules="rules.required" v-model="username">
                  </FormsFieldsTextComponent>
                </v-col>
                <v-col class="col-12 col-sm-6">
                  <label class="font-weight-regular mb-2 grey--text text--darken-4 text-uppercase text-subtitle-2">Hora
                    de entrada</label>
                  <v-menu ref="entrymenu" v-model="hourEntryMenu" :close-on-content-click="false" :nudge-right="40"
                    :return-value.sync="entry_hour" transition="scale-transition" offset-y max-width="290px"
                    min-width="290px">
                    <template v-slot:activator="{on}">
                      <v-btn block class="black--text rounded-lg" color="white" x-large v-on="on">
                        {{ entry_hour }}&nbsp;&nbsp;<v-icon>mdi-clock-outline</v-icon>
                      </v-btn>
                    </template>
                    <v-time-picker v-if="hourEntryMenu" v-model="entry_hour" full-width
                      @click:minute="$refs.entrymenu.save(entry_hour)"></v-time-picker>
                  </v-menu>
                </v-col>
                <v-col class="col-12 col-sm-6">
                  <label class="font-weight-regular mb-2 grey--text text--darken-4 text-uppercase text-subtitle-2">Hora
                    de salida</label>
                  <v-menu ref="exitmenu" v-model="hourExitMenu" :close-on-content-click="false" :nudge-right="40"
                    :return-value.sync="exit_hour" transition="scale-transition" offset-y max-width="290px"
                    min-width="290px">
                    <template v-slot:activator="{on}">
                      <v-btn block class="black--text rounded-lg" color="white" v-on="on" x-large
                        @click="hourExitMenu = !hourExitMenu">
                        {{ exit_hour }}&nbsp;&nbsp;<v-icon>mdi-clock-outline</v-icon>
                      </v-btn>
                    </template>
                    <v-time-picker v-if="hourExitMenu" v-model="exit_hour" full-width
                      @click:minute="$refs.exitmenu.save(exit_hour)"></v-time-picker>
                  </v-menu>
                </v-col>
                <v-col class="col-6">
                  <FormsFieldsTextComponent label="Telefono" :rules="rules.required" type="number" v-model="phone">
                  </FormsFieldsTextComponent>
                </v-col>
                <v-col class="col-6">
                  <FormsFieldsSelectComponent label="Area" :rules="rules.required" item-text="name" value="name"
                    :items="['Mantenimiento']" v-model="area"></FormsFieldsSelectComponent>
                </v-col>
              </v-row>

            </v-col>
            <v-col class="col-md-3 col-12">
              <generalUploadSingleFileComponent v-model="file"></generalUploadSingleFileComponent>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary black--text rounded-lg font-weight-regular" class="rounded-lg" @click="addStaff()">
          AGREGAR STAFF&nbsp;&nbsp;
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </v-card-actions>
    </GeneralCardComponent>
  </v-dialog>

</template>

<script>
  import {
    mapFields
  } from 'vuex-map-fields';

  export default {
    props: {
      value: Boolean
    },
    data() {
      return {
        hourEntryMenu: false,
        hourExitMenu: false,
        rules: {
          required: [value => !!value || 'Campo requerido']
        }
      }
    },
    methods: {
      async addStaff() {
        if (!this.$refs.form.validate()) return
        this.$store.dispatch("staffs/create")
          .then(async () => {
            this.$store.dispatch("staffs/clear")
            this.$store.dispatch("staffs/clearUser")
            await this.$store.dispatch("staffs/findAll");
          })
      },
    },
    computed: {
      ...mapFields('staffs', [
        'staff.entry_hour',
        'staff.exit_hour',
        'staff.area',
        'staff.file',
        'user.name',
        'user.phone',
        'user.username',
        'user.doc_type',
        'staff.user'
      ])
    }
  }

</script>

<style>

</style>
