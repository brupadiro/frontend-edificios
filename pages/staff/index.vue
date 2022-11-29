<template>
  <v-container>
    <HeadersGeneralComponent elevation="6">
      <template v-slot:icon>
        <img src="/icons/staff.png" alt="icono" width="30" />
      </template>
      <template v-slot:title>
        Staff
      </template>
      <template v-slot:subtitle>
        <v-btn large color="secondary black--text rounded-lg font-weight-regular" @click="modalStaff = true">
          <v-icon>mdi-plus</v-icon>&nbsp;AGREGAR STAFF
        </v-btn>
      </template>
    </HeadersGeneralComponent>
    <v-row>
      <v-col class="col-12">
        <GeneralCardComponent elevation="6">
          <v-card-title style="background:#333350" class="fill-width rounded-t-xl">
            <v-tabs v-model="tab" hide-slider slider-color="primary" background-color="primary"
              active-class="active-tab" grow>
              <v-tab ripple :value="1">
                <span class="font-weight-black white--text">EMPLEADOS</span>
              </v-tab>
              <v-tab ripple :value="2">
                <span class="font-weight-black white--text">ENTRADAS</span>
              </v-tab>
              <v-tab ripple :value="3">
                <span class="font-weight-black white--text">TAREAS</span>
              </v-tab>
            </v-tabs>
          </v-card-title>
          <v-card-text class="my-3">
            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-data-table hide-default-footer :headers="headers" :loading="staffList.meta.pagination == undefined" loading-text="Cargando..." no-data-text="No hay datos disponibles" :items="staffList.data">
                  <template v-slot:item.photo="{ item }">
                    <v-hover v-slot="{ hover }">
                      <v-avatar size="70" color="primary" class="my-2" open-delay="200" v-ripple @click="showStaff(item)">
                        <v-icon v-if="!item.photo" color="white">mdi-account</v-icon>
                        <v-img v-else :src="item.photo.url" contain :class="{'gradient-avatar':hover}">
                          <v-icon v-show="hover" color="white">mdi-magnify</v-icon>
                        </v-img>
                      </v-avatar>
                    </v-hover>

                  </template>

                </v-data-table>
              </v-tab-item>
              <v-tab-item>
                <staffEntriesComponent :staffItems="staffList.data"></staffEntriesComponent>
              </v-tab-item>
              <v-tab-item>
                <staffTasksListComponent></staffTasksListComponent>

              </v-tab-item>
              <v-tab-item>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </GeneralCardComponent>
      </v-col>
      <v-col class="col-12">
      </v-col>
    </v-row>
    <staffViewComponent :staff="singleStaff" v-model="openViewStaff"></staffViewComponent>
    <staffCreateComponent v-model="modalStaff"></staffCreateComponent>
    <v-snackbar v-model="errorInForm" color="red">
      Hubo un error en el formulario. revise nuevamente los datos
      <v-btn color="white" text @click="errorInForm = false">
        <v-icon color="black">mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-container>
</template>


<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        modalStaff: false,
        openViewStaff: false,
        tab: 0,
        task: {},
        taskList: {},
        singleStaff: {
          user: {}

        },
        errorInForm: false,
        headers: [{
          text: '',
          align: 'left',
          sortable: false,
          value: 'photo'
        }, {
          text: 'Nombre',
          align: 'left',
          sortable: false,
          value: 'user.name'
        }, {
          text: 'Documento',
          align: 'left',
          sortable: false,
          value: 'user.username'
        }, {
          text: 'Hora de entrada',
          align: 'left',
          sortable: false,
          value: 'entry_hour'
        }, {
          text: 'Hora de salida',
          align: 'left',
          sortable: false,
          value: 'exit_hour'
        }, {
          text: 'Telefono',
          align: 'left',
          sortable: false,
          value: 'user.phone'
        }, {
          text: 'Area',
          align: 'left',
          sortable: false,
          value: 'area'
        }],
        focus: null,
        now: null,
        type: "month",
      }
    },
    created() {
      this.now = moment().format("YYYY-MM-DD");
      this.$store.dispatch('staffs/findAll')
        this.$store.dispatch('staffs/tasks/findAll')
    },
    methods: {

      viewDay({
        date
      }) {
        this.focus = date;
        this.now = date
        console.log(date)
        this.type = "day";
      },
      showStaff(item) {
        this.singleStaff = item;
        this.openViewStaff = !this.openViewStaff; 
      }
    },
    computed: {
      staffList() {
        return this.$store.getters['staffs/getList']
      },
      areas() {
        return this.$store.getters['areas/getList']
      }
    },
    watch:{
      tab() {
        this.$store.dispatch('staffs/tasks/findAll')
      }
    }
  }

</script>
<style scoped>
  .gradient-avatar {
    background-color: linear-gradient(to right top, rgba(100, 115, 201, 0.33), rgba(25, 32, 72, 0.7));
    -webkit-transition: background-color 500ms linear;
    -ms-transition: background-color 500ms linear;
    transition: background-color 500ms linear;

  }

</style>
