<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:title>
        Ticket de soporte
      </template>
    </headersGeneralComponent>
    <v-row>
      <v-col class="col-12">
        <generalCardComponent>
          <generalCardTitleComponent>
            Mi ticket
          </generalCardTitleComponent>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col class="col-12">
                <formsFieldsTextareaComponent label="Descripcion del problema" v-model="ticket.description">
                </formsFieldsTextareaComponent>
              </v-col>
              <v-col class="col-12">
                <FormsFieldsSelectComponent label="Area" item-text="attributes.name" value="attributes.name"
                  :items="areas.data" v-model="ticket.area"></FormsFieldsSelectComponent>
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
            Mis tickets
          </generalCardTitleComponent>
          <v-divider></v-divider>
          <v-card-text>
            <v-data-table :headers="headers" hide-default-footer :items="tickets.data">
              <template v-slot:item.attributes.priority="{ item }">
                <v-chip :color="getColor(item.attributes.priority)" text-color="white">
                  <b>{{ item.attributes.priority | priority }}</b>
                </v-chip>
              </template>
              <template v-slot:item.attributes.status="{ item }">
                <v-chip :color="getColor(item.attributes.status)" text-color="white">
                  <b>{{ item.attributes.status | status }}</b>
                </v-chip>
              </template>
              <template v-slot:item.attributes.createdAt="{ item }">
                  <b>{{ item.attributes.createdAt | date }}</b>
              </template>
            </v-data-table>
          </v-card-text>
        </generalCardComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import moment from 'moment'
  export default {
    filters:{
      date(value){
        return moment(value).format('DD/MM/YYYY') + ' a las ' + moment(value).format('HH:mm')
      },
      priority(value){
        switch(value){
          case 'Low':
            return 'Baja'
          case 'Medium':
            return 'Media'
          case 'High':
            return 'Alta'
        }
      },
      status(value){
        switch(value){
          case 'Open':
            return 'Abierto'
          case 'Closed':
            return 'Cerrado'
        }
      }
    },
    data() {
      return {
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
        areas: {},
        tickets: {
          data: []
        },
        headers: [{
            text: 'Descripcion',
            value: 'attributes.description'
          },
          {
            text: 'Area',
            value: 'attributes.area'
          },
          {
            text: 'Prioridad',
            value: 'attributes.priority'
          },
          {
            text: 'Estado',
            value: 'attributes.status'
          },
          {
            text: 'Fecha de creacion',
            value: 'attributes.createdAt'
          }
        ]
      }
    },
    created() {
      this.getAreas()
      this.getTickets()
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
        this.$axios.get('/tickets', {
            params: {
              apartment: 66
            }
          })
          .then(response => {
            this.tickets = response.data
          })
      },
    addTicket() {
      this.ticket.apartment=66
      this.$axios.post('/tickets', {data:this.ticket})
        .then(response => {
          this.getTickets()
        })
    },
    },
  }

</script>

<style>

</style>
