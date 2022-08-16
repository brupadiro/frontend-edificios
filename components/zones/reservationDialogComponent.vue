<template>
  <v-dialog max-width="700" :value="value" persistent>
    <GeneralCardComponent elevation="6">
      <generalCardTitleComponent>
        RESERVAR
        <v-spacer></v-spacer>
        <v-btn fab depressed small class="rounded-xl" color="grey lighten-3" @click="$emit('input', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </generalCardTitleComponent>
      <v-divider class="py-3"></v-divider>
      <v-card-text>
        <v-card outlined>
          <v-card-text>
            <v-row>
              <v-col class="col-12">
                <formsFieldsSelectComponent v-model="reservation.apartment" item-text="attributes.number"
                  item-value="id" :items="apartmentsList.data" type="number" label="APARTAMENTO">
                </formsFieldsSelectComponent>
              </v-col>
              <v-col class="col-12">
                <v-card outlined>
                <v-sheet max-height="400">
                  <v-date-picker v-model="reservation.date" no-title scrollable locale="es" full-width
                    :allowed-dates="allowedDates" class="elevation-0"></v-date-picker>
                </v-sheet>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-expand-transition hide-on-leave="true">
        <v-card-text v-show="reservation.date!=null && reservation.apartment != null">
          <v-card outlined>
            <v-card-text>
              <v-row>
                <v-col class="d-flex justify-center">
                  <v-icon color="#4caf50">mdi-circle</v-icon>
                  &nbsp;&nbsp;
                  <span class="font-weight-black black--text">Disponible</span>
                </v-col>
                <v-col class="d-flex justify-center">
                  <v-icon color="red darken-1">mdi-circle</v-icon>
                  &nbsp;&nbsp;
                  <span class="font-weight-black black--text">No disponible</span>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text>
              <v-row>
                <v-col class="col-12 yellow lighten-1">
                  <v-row>
                    <v-col class="col-5">
                      HORA
                    </v-col>
                    <v-col class="col-4 pl-0">
                      DISPONIBILIDAD
                    </v-col>
                    <v-col class="col-3">
                    </v-col>
                  </v-row>

                </v-col>
                <v-col class="col-12 grey lighten-5">
                  <v-row v-for="(hour,index) in arrayHourToHour" :key="index" class="border-bottom py-3" no-gutters>
                    <v-col class="col-5 d-flex align-center">
                      <span>{{ hour.from | formatHour }} - {{hour.to | formatHour }}</span>
                    </v-col>
                    <v-col class="col-4 d-flex align-center">
                      <span>LIBRE</span>
                    </v-col>
                    <v-col class="col-3">
                      <v-btn color="success darken-1" @click="createReservation(hour)"
                        v-show="!checkEmptyReservation(hour)" block depressed>
                        RESERVAR&nbsp;<v-icon>mdi-calendar</v-icon>
                      </v-btn>
                      <v-btn color="red darken-1" class="white--text" v-show="checkEmptyReservation(hour)" block
                        depressed>
                        RESERVAR&nbsp;<v-icon>mdi-calendar</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-expand-transition>
    </GeneralCardComponent>
    <generalModalSuccessComponent :action="()=>{
      this.newReservationModal = false
      }" v-model="newReservationModal">
      <template v-slot:icon>
        mdi-check
      </template>
      <template v-slot:title>
        <p class="text-h6 mb-0">
          <strong>Reserva agregada correctamente!</strong>
        </p>
      </template>
    </generalModalSuccessComponent>
  </v-dialog>
</template>


<script>
  import _ from 'lodash';
  import moment from 'moment';
  import dateFunctions from '~/plugins/mixins/dateFunctions';
  export default {
    mixins: [dateFunctions],
    props: {
      zone: {
        type: Object,
      },
      value: Boolean,
      getColorCalendar: Function
    },
    data: () => ({
      now: null,
      newReservationModal: false,
      reservation: {},
      selectedDate: null,
      date: null
    }),
    mounted() {
      this.now = moment().format("YYYY-MM-DD");
      this.$store.dispatch('apartments/findAll')
    },
    methods: {

      allowedDates(date) {
        return moment(date).isSameOrAfter(this.now);
      },
      showReservedHours() {
        this.$store.dispatch("zones/findAllReservations", {
          filters: {
            date: this.reservation.date,
            zone: this.zone.id
          }
        });
      },
      async createReservation(hours) {
        this.reservation.from = moment(hours.from, "HH:mm").format("HH:mm:ss.sss");
        this.reservation.to = moment(hours.to, "HH:mm").format("HH:mm:ss.sss");
        this.reservation.zone = this.zone
        await this.$store.dispatch("zones/addReservation", this.reservation);
        this.reservation = {};
        this.newReservationModal = true;
        this.showReservedHours()
      },
      checkEmptyReservation(hours) {
        if (!this.reservationList.data || this.zone.attributes == null) return
        let reservationList = this.reservationList.data.filter(reservation => {
          return reservation.attributes.from == hours.from && reservation.attributes.to == hours.to;
        })
        let numberOFPeoples = _.sumBy(reservationList, function (o) {
          return o.attributes.persons;
        });
        if (numberOFPeoples > this.zone.attributes.capacity) {
          return true;
        }
        return false
      },
    },
    computed: {
      reservationList() {
        return this.$store.getters['zones/getReservationList']
      },
      apartmentsList() {
        return this.$store.getters['apartments/getList']
      },
      arrayHourToHour() {
        let arrayOfHours = [];
        for (let i = 7; i < 24; i++) {
          if (moment().isSameOrAfter(moment(i, "HH")) && this.reservation.date == moment().format("YYYY-MM-DD")) continue
          arrayOfHours.push({
            from: moment(i, "HH").format("HH:mm:00.000"),
            to: moment(i + 1, "HH").format("HH:mm:00.000")
          });
        }
        return arrayOfHours;
      }
    },
    watch: {
      "reservation.date":function() {
        this.showReservedHours()
      }
    }
  }

</script>

<style scoped lang="scss">
  .border-bottom {
    border-bottom: 1px solid white;
  }

</style>
