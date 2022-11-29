<template>
  <div>
    <generalCardComponent v-bind="$attrs">
      <generalCardTitleComponent class="primary white--text" v-if="title">
        Visitas
        <v-spacer>
        </v-spacer>
      </generalCardTitleComponent>
      <v-card-subtitle class="primary">
        <v-btn color="secondary black--text rounded-lg font-weight-regular" large :disabled="modalVisits"
          @click="modalVisits = true">
          <v-icon>mdi-plus</v-icon>&nbsp;AGREGAR AUTORIZACION
        </v-btn>
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-card-title class="primary">
        <v-tabs :vertical="$vuetify.breakpoint.smAndDown" v-model="tab" hide-slider slider-color="primary"
          background-color="primary" active-class="active-tab" grow>
          <v-tab ripple :value="0">
            <span class="font-weight-black white--text">AUTORIZACIONES DEL DIA</span>
          </v-tab>
          <v-tab ripple :value="1">
            <span class="font-weight-black white--text">AUTORIZACIONES PASADAS</span>
          </v-tab>
        </v-tabs>
      </v-card-title>

      <v-expand-transition>
        <v-card-text v-show="modalVisits">
          <propertiesVisitsFormComponent @openForm="modalVisits = $event"></propertiesVisitsFormComponent>
        </v-card-text>
      </v-expand-transition>
      <v-divider></v-divider>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <PropertiesVisitsListComponent :items="items"></PropertiesVisitsListComponent>
        </v-tab-item>
        <v-tab-item>
          <GeneralCardComponent>
            <v-card-title>
              <v-row>
                <v-col class="col-md-10 col-12">
                  <FormsFieldsTextComponent v-model="search.in_date" type="date" label="Fecha"></FormsFieldsTextComponent>
                </v-col>
                <v-col class="col-md-2 col-12 d-flex align-end">
                  <v-btn height="48" class="rounded-lg" block color="secondary" @click="searchVisits()">BUSCAR</v-btn>
                </v-col>
              </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <PropertiesVisitsListComponent :items="items"></PropertiesVisitsListComponent>
            </v-card-text>
          </GeneralCardComponent>
        </v-tab-item>
      </v-tabs-items>
    </generalCardComponent>
  </div>
</template>

<script>
  import dateFunctions from '~/plugins/mixins/dateFunctions.js';
  import textFunctions from '~/plugins/mixins/dateFunctions.js';
  import moment from 'moment'
  var qs = require('qs');
  export default {

    mixins: [dateFunctions, textFunctions],
    props: {
      title: {
        type: Boolean,
        default: false
      },
      apartment: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        page: 1,
        modalVisits: false,
        hourMenu: false,
        search:{
          in_date:moment().format('YYYY-MM-DD')
        },
        headers: [{
          text: 'Fecha',
          value: 'createdAt'
        }, {
          text: 'Documento',
          value: 'doc'
        }, {
          text: 'Nombre',
          value: 'name'
        }],
        tab: 0,
      }
    },
    mounted() {
      this.$root.$on('updateVisits', () => {
        this.modalVisits = false
      });
    },
    methods: {
      setCheckout(id) {
        this.$store.dispatch('visits/checkout')
        this.$root.$emit('updateVisits')
      },
      searchVisits() {
        this.$store.dispatch('visits/findAll', {
          pagination: {
            page: 1
          },
          filters: this.search
        })
      }
    },
    computed: {
      items() {
        return this.$store.getters['visits/getList']
      },
      isMobile() {
        return this.$vuetify.breakpoint.xsOnly
      },
    },
    watch:{
      tab(val) {
        if(val == 0) {
          this.$store.dispatch('visits/findAll', {
            pagination: {
              page: 1
            },
          })
        } else {
          this.$store.dispatch('visits/findAll', {
            pagination: {
              page: 1
            },
            filters: this.search
          })
        }
      }
    }
  }

</script>

<style>
  .v-card-text-overflow {
    max-height: 700px;
    overflow-x: auto;
  }

</style>
