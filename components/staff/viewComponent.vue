<template>
  <v-dialog v-model="value" max-width="1000" persistent eager>
    <GeneralCardComponent>
      <GeneralCardTitleComponent class="primary white--text">
        {{user.name}}
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
                <v-col class="col-4">
                  <FormsFieldsSelectComponent :items="['CI', 'PASAPORTE']" label="Documento" type="number"
                    v-model="doc_type"></FormsFieldsSelectComponent>
                </v-col>
                <v-col class="col-8">
                  <FormsFieldsTextComponent label="_" type="number" v-model="username">
                  </FormsFieldsTextComponent>
                </v-col>
                <v-col class="col-12 col-sm-6">
                  <label class="font-weight-regular mb-2 grey--text text--darken-4 text-uppercase text-subtitle-2">Hora
                    de entrada</label>
                  <v-btn block class="black--text rounded-lg" color="white" x-large v-on="on">
                    {{ entry_hour }}&nbsp;&nbsp;<v-icon>mdi-clock-outline</v-icon>
                  </v-btn>
                </v-col>
                <v-col class="col-12 col-sm-6">
                  <label class="font-weight-regular mb-2 grey--text text--darken-4 text-uppercase text-subtitle-2">Hora
                    de salida</label>
                  <v-btn block class="black--text rounded-lg" color="white" x-large>
                    {{ exit_hour }}&nbsp;&nbsp;<v-icon>mdi-clock-outline</v-icon>
                  </v-btn>
                </v-col>
                <v-col class="col-6">
                  <FormsFieldsTextComponent label="Telefono" type="number" v-model="phone">
                  </FormsFieldsTextComponent>
                </v-col>
                <v-col class="col-6">
                  <FormsFieldsSelectComponent label="Area" item-text="name" item-value="id" :items="areasList.data"
                    v-model="area">
                  </FormsFieldsSelectComponent>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="col-md-3 col-12">
              <generalUploadSingleFileComponent @input="photo = $event" :value="photo"></generalUploadSingleFileComponent>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-text>
        <StaffTasksListComponent :filters="filters" v-if="value"></StaffTasksListComponent>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary black--text rounded-lg font-weight-regular" :loading="loading" class="rounded-lg"
          @click="updateStaff()">
          EDITAR STAFF&nbsp;&nbsp;
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
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        filters: {},
        loading: false
      }
    },
    methods: {
      updateStaff() {
        this.loading = true
        this.$store.dispatch('staffs/update')
          .then(() => {
            this.$store.dispatch('staffs/findAll')
            this.loading = false
          })
      }
    },
    computed: {
      areasList() {
        return this.$store.getters['areas/getList']
      },
      ...mapFields('staffs', [
        'staff.entry_hour',
        'staff.exit_hour',
        'staff.area',
        'staff.file',
        'staff.photo',
        'staff.user.name',
        'staff.user.phone',
        'staff.user.username',
        'staff.user.doc_type',
        'staff.user',
        'staff.id'
      ])

    },
    watch: {
      "id": {
        handler: function (val) {
          if (val) {
            this.filters.staff = val
          }
        },
        deep: true
      }
    }
  }

</script>

<style>

</style>
