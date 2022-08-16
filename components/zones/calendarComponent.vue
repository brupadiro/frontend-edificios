<template>
  <div>
    <v-row class="fill-height">
      <v-col class="col-12">
        <GeneralCardComponent>
          <v-sheet height="130">
            <v-toolbar flat class="rounded-t-xl">
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small>
                  mdi-chevron-left
                </v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small>
                  mdi-chevron-right
                </v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-toolbar-title v-if="$refs.calendar" class="font-weight-light">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
            <v-toolbar flat>
              <v-select solo v-model="type" dense hide-details class="font-weight-light" label="Tipo de calendario"
                :items="[{value:'day',text:'Diario'},{value:'month',text:'Mensual'}]">
              </v-select>
            </v-toolbar>
          </v-sheet>
          <v-card-text>
            <v-card outlined>
              <v-card-text>
                <v-row>
                  <v-col class="d-flex justify-center" v-for="zone in zoneList.data" :key="zone.id">
                    <v-icon :color="generateColor(zone.attributes.name)">mdi-circle</v-icon>
                    &nbsp;&nbsp;
                    <span class="font-weight-black black--text">
                      {{ zone.attributes.name }}
                    </span>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-card-text>
          <v-card-subtitle>
            <label class="font-weight-regular mb-2 grey--text text--darken-4 text-uppercase text-subtitle-2">
              Selecciona una fecha...
            </label>
          </v-card-subtitle>
          <v-card-text>
            <v-sheet height="400">
              <v-calendar locale="es" ref="calendar" :events="reservationList" :value="now" color="primary" :type="type"
                @click:date="viewDay">
                <template v-slot:event="{event}">
                  <div class="pl-3 pr-3">
                    <p class="mb-0"><b>Zona:</b> {{event.zone}}</p>
                    <v-divider></v-divider>
                    <p><b>Apto:</b> {{event.apto}}</p>
                  </div>
                </template>
              </v-calendar>
            </v-sheet>
          </v-card-text>
        </GeneralCardComponent>
      </v-col>
    </v-row>
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
  </div>
</template>


<script>
  import _ from 'lodash';
  import moment from 'moment';
  import dateFunctions from '~/plugins/mixins/dateFunctions';
  export default {
    mixins: [dateFunctions],
    props: {
      zone: {
        type: Number,
        default: 0
      },
      value: Array,
      getColorCalendar: Function
    },
    data: () => ({
      now: null,
      focus: "",
      selectedDate: {
        data: {},
        editable: false
      },
      newReservationModal: false,
      reservation: {},
      changedMonths: 0,
      type: "month",
      selectedOpen: false,
      events: [],
      colors: ["blue", "indigo", "deep-purple", "cyan", "green", "orange", "grey darken-1"],
      names: ["Meeting", "Holiday", "PTO", "Travel", "Event", "Birthday", "Conference", "Party"],
    }),
    mounted() {
      this.now = moment().format("YYYY-MM-DD");
    },
    methods: {
      viewDay({
        date
      }) {
        this.focus = date;
        this.now = date
        console.log(date)
        this.type = "day";
        this.$store.dispatch("zones/findAllReservations", {
          filters: {
            date: date,
          },
          populate: "*"
        });
      },
      generateColor(color) {
        return '#' + ( // 1
          parseInt( // 2
            parseInt(color, 36) // 3
            .toExponential() // 4
            .slice(2, -5) // 5
            , 10) & 0xFFFFFF // 6
        ).toString(16).toUpperCase();
      },
      setToday() {
        this.focus = "";
      },
      showReservedHours(event) {
        this.reservation = {
          date: event.date,
          zone: this.zone
        };
        this.$store.dispatch("zones/findAllReservations", {
          filters: {
            date: event.date,
          },
          populate: "*"
        });
        this.selectedOpen = true;
      },
      prev() {
        this.$refs.calendar.prev();
        this.changedMonths--;
        let date = moment(this.now).add(this.changedMonths, "months").endOf("month").format("YYYY-MM-DD");
        this.$emit("prev", date);
      },
      next() {
        this.$refs.calendar.next();
        this.changedMonths++;
        let date = moment(this.now).add(this.changedMonths, "months").endOf("month").format("YYYY-MM-DD");
        console.log(date);
        this.$emit("next", date);
      },
    },
    computed: {
      reservationList() {
        var reservationList = this.$store.getters['zones/getReservationList']
        if (!reservationList.data) return []
        return reservationList.data.map(reservation => {
          let formatHour = (hour) => {
            let formatedHour = moment(hour, 'HH:mm').format("HH:mm");
            return formatedHour;
          }
          return {
            zone: `${reservation.attributes.zone.data.attributes.name}`,
            apto: `${reservation.attributes.apartment.data.attributes.number}`,
            start: `${reservation.attributes.date} ${formatHour(reservation.attributes.from)}`,
            end: `${reservation.attributes.date} ${formatHour(reservation.attributes.to)}`,
            color: this.generateColor(reservation.attributes.zone.data.attributes.name),
          }
        });
      },
      arrayHourToHour() {
        let arrayOfHours = [];
        for (let i = 7; i < 24; i++) {
          arrayOfHours.push({
            from: moment().hours(i).format("HH:00:00.000"),
            to: moment().hours(i + 1).format("HH:00:00.000")
          });
        }
        return arrayOfHours;
      },
      zoneList() {
        return this.$store.getters['zones/getList']
      },
    },
  }

</script>

<style scoped lang="scss">
  .border-bottom {
    border-bottom: 1px solid white;
  }

</style>
