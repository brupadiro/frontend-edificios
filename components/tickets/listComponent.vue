<template>
  <v-row>
    <v-col class="col-12">
      <generalCardComponent outlined>
        <v-card-text>
          <v-data-table :headers="headers" hide-default-footer :items="taskList.data">
            <template v-slot:item.priority="{ item }">
              <v-chip :color="getColor(item.priority)" text-color="white">
                <b>{{ item.priority | priority }}</b>
              </v-chip>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip :color="getColor(item.status)" text-color="white">
                <b>{{ item.status | status }}</b>
              </v-chip>
            </template>
            <template v-slot:item.createdAt="{ item }">
              <b>{{ item.createdAt | date }}</b>
            </template>
            <template v-slot:item.id="{ item }">
              <v-btn small rounded color="yellow" v-if="item.status!='Closed'" @click="updateStatus(item)">
                Cerrar ticket
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </generalCardComponent>
    </v-col>
  </v-row>
</template>

<script>
  import moment from 'moment'

  var qs = require('qs');

  export default {
    props: {
      apartment: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        areas: {},
        ticket: {
          description: '',
          area: 'Seleccione una opcion',
          priority: 'High'
        },
        prioritys: [{
          text: 'Baja',
          value: 'Low'
        }, {
          text: 'Media',
          value: 'Medium'
        }, {
          text: 'Alta',
          value: 'High'
        }],
        headers: [{
            text: 'Descripcion',
            value: 'description'
          },
          {
            text: 'Area',
            value: 'area'
          },
          {
            text: 'Prioridad',
            value: 'priority'
          },
          {
            text: 'Estado',
            value: 'status'
          },
          {
            text: 'Fecha de creacion',
            value: 'createdAt'
          },
          {
            text: 'Cambiar estado',
            value: 'id'
          }
        ],
      }
    },
    filters: {
      date(value) {
        return moment(value).format('DD/MM/YYYY') + ' a las ' + moment(value).format('HH:mm')
      },
      priority(value) {
        switch (value) {
          case 'Low':
            return 'Baja'
          case 'Medium':
            return 'Media'
          case 'High':
            return 'Alta'
        }
      },
      status(value) {
        switch (value) {
          case 'Open':
            return 'Abierto'
          case 'Closed':
            return 'Cerrado'
        }
      }
    },
    created() {
      this.$store.dispatch('apartments/findAll')
    },
    mounted() {
      if (this.apartment != undefined)
        this.ticket.apartment = this.apartment.id
    },
    methods: {
      updateStatus(task) {
        this.$axios.put('tasks/' + task.id, {
          data: {
            status: 'Closed'
          }
        }).then(response => {
          this.$root.$emit('tickets')
        })
      },
      getColor(color) {
        switch (color) {
          case 'Low':
          case 'Open':
            return 'green'
          case 'Medium':
            return 'yellow'
          case 'High':
          case 'Closed':
            return 'red'
        }
      },
    },
    computed: {
      taskList() {
        return this.$store.getters['staffs/tasks/getList']
      },
      apartmentsList() {
        return this.$store.getters['apartments/getList']
      },
    }
  }

</script>

<style>

</style>
