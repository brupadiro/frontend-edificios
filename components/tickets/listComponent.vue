<template>
  <v-row>
    <v-col class="col-12">
      <generalCardComponent>
        <generalCardTitleComponent>
          Nuevo ticket
        </generalCardTitleComponent>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col class="col-12">
              <formsFieldsTextareaComponent label="Descripcion del problema" v-model="ticket.description">
              </formsFieldsTextareaComponent>
            </v-col>

            <v-col class="col-12" v-show="!apartment.id">
              <formsFieldsSelectComponent v-model="ticket.apartment" item-text="number" item-value="id"
                :items="apartmentsList.data" type="number" label="APARTAMENTO">
              </formsFieldsSelectComponent>
            </v-col>

            <v-col class="col-12">
              <FormsFieldsSelectComponent label="Area" item-text="name" value="name" :items="areas.data"
                v-model="ticket.area"></FormsFieldsSelectComponent>
            </v-col>
            <v-col class="col-12">
              <formsFieldsSelectComponent :items="prioritys" v-model="ticket.priority" label="Prioridad">
              </formsFieldsSelectComponent>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="addTicket()" class="rounded-lg">
            Enviar ticket
          </v-btn>
        </v-card-actions>
      </generalCardComponent>
    </v-col>
    <v-col class="col-12">
      <generalCardComponent>
        <generalCardTitleComponent>
          Tickets
        </generalCardTitleComponent>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table :headers="headers" hide-default-footer :items="tickets.data">
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
        tickets: {
          data: []
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
      this.getTickets()
      this.$store.dispatch('apartments/findAll')
    },
    mounted() {
      if (this.apartment != undefined)
        this.ticket.apartment = this.apartment.id
    },
    methods: {

      getAreas() {
        this.$axios.get('/areas')
          .then(response => {
            this.areas = response.data
            this.areas.data.unshift({
              attributes: {
                name: 'Seleccione una opcion'
              }
            })
          })
      },
      addTicket() {
        this.$axios.post('/tickets', {
            data: this.ticket
          })
          .then(response => {
            this.getTickets()
          })
      },
      updateStatus(ticket) {
        this.$axios.put('tickets/' + ticket.id, {
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
      getTickets() {
        var params = {
          filters: {}
        }
        if (this.$auth.user.type != 'admin') {
          params.filters.apartment = this.$auth.user.data.apartment.id
        }
        this.$axios.get('/tickets', {
            params: params,
            paramsSerializer: params => {
              return qs.stringify(params, {
                arrayFormat: 'brackets'
              })
            }
          })
          .then(response => {
            this.tickets = response.data
          })
      },

    },
    computed: {
      apartmentsList() {
        return this.$store.getters['apartments/getList']
      },
    }
  }

</script>

<style>

</style>
