<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:title>
        Zonas comunes
      </template>
      <template v-slot:subtitle>
        <v-btn large color="secondary black--text rounded-lg font-weight-regular" @click="zonesModal = true">
          AGREGAR ZONA COMUN&nbsp;&nbsp;<v-icon>mdi-calendar</v-icon>
        </v-btn>
      </template>
    </headersGeneralComponent>
    <v-row>
      <v-col class="col-12">
        <GeneralCardComponent elevation="6">
          <GeneralCardTitleComponent class="primary white--text">Hacer una reserva</GeneralCardTitleComponent>
          <v-divider></v-divider>
          <v-card-text>
            <v-list>
              <template  v-for="zone in zoneList.data">
                <v-list-item>
                  <v-list-item-avatar color="grey">
                    <v-img sizes="80,80"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      <h3>{{zone.attributes.name}}</h3>
                    </v-list-item-title>
                    <v-list-item-title>
                     Capacidad: {{zone.attributes.capacity}}
                    </v-list-item-title>

                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn depressed color="secondary font-weight-regular" @click="setZone(zone)">AGENDARSE</v-btn>
                  </v-list-item-action>
                </v-list-item>
                <v-divider></v-divider>
              </template>
            </v-list>
          </v-card-text>
        </GeneralCardComponent>
      </v-col>
    </v-row>
    <zonesCreateDialogComponent v-model="zonesModal"></zonesCreateDialogComponent>
    <zonesReservationDialogComponent v-if="zone" v-model="zoneReservationModal" :zone="zone"></zonesReservationDialogComponent>
  </v-container>
</template>

<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        zonesModal: false,
        zoneReservationModal: false,
        zone: {},
        colorsCalendar: {
          'consulta': '#ffc107',
          'evento': '#4caf50'
        },
        rules: {
          required: [value => !!value || 'Este campo es requerido.'],
          min: value => value.length >= 3 || 'Este campo debe tener al menos 3 caracteres.',
          max: value => value.length <= 250 || 'Este campo debe tener como maximo 250 caracteres.'
        }
      }
    },
    created() {
      this.$store.dispatch('zones/findAll')
    },
    methods: {

      formatDate(date) {
        let newdate = date.split('-')
        return newdate[2] + '/' + newdate[1] + '/' + newdate[0]
      },
      setZone(zone) {
        this.zone = zone
        this.zoneReservationModal = true
      },
    },
    computed: {
      zoneList() {
        return this.$store.getters['zones/getList']
      },
    }
  }

</script>

<style>

</style>
