<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:title>
        Calendario de reservas
      </template>
    </headersGeneralComponent>
    <v-row>
      <v-col class="col-12">
        <GeneralCardComponent elevation="6">
          <v-card-text>
            <zonesCalendarComponent  :zone="search.zone">
            </zonesCalendarComponent>
          </v-card-text>
        </GeneralCardComponent>
      </v-col>
    </v-row>
    <zonesCreateDialogComponent v-model="zonesModal"></zonesCreateDialogComponent>
    <generalModalSuccessComponent :action="()=>{
      this.createAgendaModal = false
      }" v-model="createAgendaModal">
      <template v-slot:icon>
        mdi-check
      </template>
      <template v-slot:title>
        <p class="text-h6 mb-0">
          <strong>Agenda agregada correctamente!</strong>
        </p>
      </template>
    </generalModalSuccessComponent>
  </v-container>
</template>

<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        zonesModal: false,
        search: {
          consulta: {},
          type: null
        },
        modalAgenda: false,
        agendas: [],
        zone: {},
        dataSuccess: 'Agenda agregada correctamente!',
        modalReschedule: false,
        modalCalendar: false,
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
      addAgenda() {
        if (!this.$refs.form.validate()) return
        if (this.agenda.hora)
          this.agenda.hora = this.agenda.hora + ':00.00'
        this.$axios.post('/agendas', this.agenda).then(data => {
          this.getAgendas()
          this.modalAgenda = false
          this.createAgendaModal = true
        })

      },
      checkStatus(status) {
        switch (status) {
          case 'finished':
            return 'Finalizado'
          case 'postponed':
            return 'Post-puesto'
          case 'ausent':
            return 'Ausente'
          default:
            return 'Pendiente'
        }
      },
      updateStatus(agenda, status) {
        agenda.status = status
        this.$axios.put('/agendas/' + agenda.id, agenda).then(data => {
          this.getAgendas()
          this.modalAgenda = false
          this.createAgendaModal = true
        })
      },
      deleteAgenda(agenda) {
        this.$axios.delete('/agendas/' + agenda.id).then(data => {
          this.getAgendas()
        })

      },
      formatDate(date) {
        let newdate = date.split('-')
        return newdate[2] + '/' + newdate[1] + '/' + newdate[0]
      },
      reSchedule() {
        this.agenda.status = 'postponed'
        this.$axios.put('/agendas/' + this.agenda.id, this.agenda).then(data => {
          this.getAgendas()
          this.modalReschedule = false
        })

      }
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
