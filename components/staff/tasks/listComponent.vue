<template>
  <div>
    <GeneralCardComponent outlined>
      <GeneralCardTitleComponent>
        Lista de tareas
        <v-spacer></v-spacer>
        <v-btn color="secondary black--text rounded-lg font-weight-regular" @click="modalCreateTask = true">
          <v-icon>mdi-plus</v-icon>&nbsp;nueva tarea
        </v-btn>
      </GeneralCardTitleComponent>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table :loading="taskList.meta.pagination == undefined" loading-text="Cargando..."
          no-data-text="No hay datos disponibles" :headers="headers" hide-default-footer disable-sort
          :items="taskList.data">
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
          <template v-slot:item.file="{ item }">
            <template v-if="item.file">
              <v-avatar size="40" color="primary" class="my-2" open-delay="200" v-ripple @click="showFile(item.file.url)">
                <v-img :src="item.file.url" contain>
                  <v-icon color="white">mdi-magnify</v-icon>
                </v-img>
              </v-avatar>
            </template>
            <template v-else>
              <v-btn depressed color="red" small rounded fab>
                <v-icon color="white">mdi-close</v-icon>
              </v-btn>
            </template>
          </template>

          <template v-slot:item.id="{ item }">
            <v-btn color="secondary" class="font-weight-regular rounded-lg black--text" @click="updateTask(item)">
                <v-icon>mdi-pencil</v-icon>Editar
              </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </GeneralCardComponent>
    <staffTasksCreateComponent v-model="modalCreateTask" :filters="filters"></staffTasksCreateComponent>
    <staffTasksUpdateComponent v-model="modalUpdateTask" :task="task" :filters="filters"></staffTasksUpdateComponent>
    <staffTasksViewComponent v-model="modalViewTask" :task="task"></staffTasksViewComponent>
    <staffTasksShowPictureComponent v-model="modalViewPictureTask" :url="url"></staffTasksShowPictureComponent>
  </div>
</template>

<script>
  import moment from 'moment'

  var qs = require('qs');

  export default {
    props: {
      filters: {},
    },
    data() {
      return {
        areas: {},
        task: {},
        modalCreateTask: false,
        modalUpdateTask: false,
        modalViewTask: false,
        modalViewPictureTask: false,
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
            value: 'area.name'
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
            text: 'Archivo',
            value: 'file'
          },
          {
            text: 'Acciones',
            value: 'id',
            alignment: 'right'
          }
        ],
        url:''
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
    mounted() {
      if (this.filters == undefined) {
        this.headers.unshift({
          text: 'Asignada a',
          value: 'staff.user.name'
        })
      }
      this.$store.dispatch('staffs/tasks/findAll', this.filters)
    },
    methods: {
      updateTask(task) {
        this.task = task
        this.modalUpdateTask = true
      },
      viewTask(task) {
        this.task = task
        this.modalViewTask = true
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
      showFile(url){
          this.url = url
          this.modalViewPictureTask = true
        }

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
