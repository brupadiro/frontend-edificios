<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:icon>
        <img src="/icons/square-rounded.png" alt="icono" width="30" />
      </template>
      <template v-slot:title>
        Reservas
      </template>
      <template v-slot:subtitle>
        <v-btn large color="secondary black--text rounded-lg font-weight-regular" @click="zonesModal = true">
          AGREGAR ZONA COMUN&nbsp;&nbsp;<v-icon>mdi-calendar</v-icon>
        </v-btn>
      </template>
    </headersGeneralComponent>
    <v-row>
      <v-col class="col-12">
        <GeneralCardComponent>
          <v-card-title class="primary">
            <v-tabs :vertical="$vuetify.breakpoint.smAndDown" v-model="tab" hide-slider slider-color="primary"
              background-color="primary" active-class="active-tab" grow>
              <v-tab ripple :value="0">
                <span class="font-weight-black white--text">Reservas</span>
              </v-tab>
              <v-tab ripple :value="1">
                <span class="font-weight-black white--text">Listado</span>
              </v-tab>
            </v-tabs>

          </v-card-title>
          <v-tabs-items v-model="tab">
            <v-card-text class="py-2">
              <v-tab-item>
                <zonesReservationComponent>
                  <template v-slot:calendarTitle>
                    Calendario de reservas
                  </template>
                  <template v-slot:listTitle>
                    Reservar en zona común
                  </template>
                </zonesReservationComponent>
              </v-tab-item>
              <v-tab-item>

                <v-data-table hide-default-footer :headers="reservationHeaders" :items="reservationList">
                  <template v-slot:item.confirmed="{item}">
                    <v-btn small color="secondary" @click="confirmReservation(item.id)" v-if="!item.confirmed">
                      Confirmar
                    </v-btn>
                    <img v-else src="/icons/check.png" width="40">
                  </template>
                  <template v-slot:item.notes="props">
                    <v-edit-dialog save-text="Guardar" cancel-text="Cerrar" class="px-0"	 
                    :return-value.sync="props.item.notes" large persistent @save="save(props.item)" @cancel="cancel(props.item)"
                      @open="open" @close="close">
                      <v-text-field hide-details solo flat readonly  v-model="props.item.notes">
                        <template v-slot:append>
                          <v-btn icon>
                            <img width="20px" src="/icons/edit.png">
                          </v-btn>
                        </template>
                      </v-text-field>
                        
                      <template v-slot:input>
                        <div class="pa-4 text-subtitle-1 font-weight-regular white--text primary">
                          Actualizar notas de reserva
                        </div>
                        <div class="px-4">
                          <FormsFieldsTextareaComponent v-model="props.item.notes" single-line counter autofocus>
                          </FormsFieldsTextareaComponent>
                          </div>
                          <v-divider class="mt-3"></v-divider>
                      </template>
                    </v-edit-dialog>
                    </template>
                </v-data-table>
              </v-tab-item>
            </v-card-text>
          </v-tabs-items>
        </GeneralCardComponent>
      </v-col>
    </v-row>
    <zonesDialogsCreateComponent v-model="zonesModal"></zonesDialogsCreateComponent>
  </v-container>
</template>

<script>
  import moment from 'moment';
  import qs from 'qs';
  export default {
    data() {
      return {
        tab: 0,
        zonesModal: false,
        reservationHeaders: [{
            text: 'Zona',
            value: 'zone'
          },
          {
            text: 'Apto',
            value: 'apto',
            align: 'center'
          },
          {
            text: 'Desde',
            value: 'start'
          },
          {
            text: 'Hasta',
            value: 'end'
          },
          {
            text: 'Notas',
            value: 'notes',
            align: 'center'
          },
          {
            text: 'Confirmada',
            value: 'confirmed',
            align: 'center'
          },
        ]
      }
    },
    mounted() {

    },
    methods: {
      confirmReservation(id) {
        this.$store.dispatch('zones/reservations/update', {
          id: id,
          data:{
            confirmed:true
          }
        })
        let filters = qs.parse(this.$route.query.filters)
        this.$store.dispatch('zones/reservations/findAll', filters)
      },

      save (e) {
        var reservation = JSON.parse(JSON.stringify(e))
        delete reservation.id
        delete reservation.zone
        this.$store.dispatch('zones/reservations/update', {
          id: e.id,
          data:reservation
        })
      },
      cancel (e) {
        e.notes = ""
      },
      open () {
      },
      close () {
        console.log('Dialog closed')
      },

    },
    computed: {
      reservationList() {
        var reservationList = _.cloneDeep(this.$store.getters['zones/reservations/getList']);
        var laundryReservationList = _.cloneDeep(this.$store.getters['zones/laundry/getList']);
        reservationList.data = [...reservationList.data, ...laundryReservationList.data];
        // Use array.filter() to remove any reservations with no data
        if (!reservationList.data) return []
        // Use array.map() to transform the reservations into the desired format
        return reservationList.data.map(r => {
          let formatHour = (hour) => {
            // Use moment.utc() to create a moment object with the time in UTC
            return moment.utc(hour, 'HH:mm').format("HH:mm:ss");
          }
          return {
            apto: `${r.apartment.number}`,
            start: `${r.date} ${formatHour(r.from)}`,
            end: `${r.date} ${formatHour(r.to)}`,
            zone: r.zone ? `${r.zone.name}` : `Lavanderia`,
            confirmed: r.confirmed,
            notes:r.notes,
            id: r.id,
          };
        });
      },

    }
  }

</script>

<style lang="scss">
.v-small-dialog__content{
  padding:0!important;
  border-radius: 15px;
}
.v-small-dialog__actions{
    display: flex;
    justify-content: space-between;
    button:last-child{
      background: #03a9f4;
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
      padding:0 10px!important;
      font-size:12px;
      height: 30px;
      font-weight:600;
      color:white!important;
    }
    button:first-child{
      padding:0 10px!important;
      font-size:12px;
      height: 30px;
      font-weight:600;
      border:1px solid black;
    }

}
</style>
