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
              <v-col class="col-12" v-show="!apartment.id">
                <formsFieldsSelectComponent v-model="reservation.apartment" item-text="number" item-value="id"
                  :items="apartmentsList.data" type="number" label="APARTAMENTO">
                </formsFieldsSelectComponent>
              </v-col>
              <v-col class="col-12" v-show="!apartment.id">
                <formsFieldsSelectComponent :items="[{value:true,text:'Si'},{value:false,text:'No'}]"
                  v-model="reservation.owner" label="ES PROPIETARIO">
                </formsFieldsSelectComponent>
              </v-col>
              <v-col class="col-12">
                <formsFieldsTextComponent v-model="reservation.persons" item-text="number" item-value="id" type="number"
                  label="CANTIDAD DE PERSONAS">
                </formsFieldsTextComponent>
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
      <v-card-subtitle>
        <v-btn @click="termsModal = true" outlined block>Terminos y condiciones de la reserva</v-btn>
        <v-dialog v-model="termsModal" width="600" >
          <GeneralCardComponent >
            <GeneralCardTitleComponent>Terminos y condiciones de la reserva</GeneralCardTitleComponent>
            <v-divider></v-divider>
            <v-card-text>
Los parrilleros generales se reservarán en la recepción con una
Anticipación no mayor a 72 horas antes del día de la reserva. Se
Abonara en el momento la suma de $750 (Propietarios) $1500 (Inquilinos).
Dicho monto np se devolverá en el caso de no uso. La mencionada cifra está
destinada a cubrir gastos de limpieza general del lugar. La que se hará a primera
hora del día siguiente al evento.
2) Se deberá dejar un deposito en garantía de $1000 por cualquier
Rotura o faltante que se genere por el uso. En los casos que se
Requiera, se descontará del mismo el importe de los artículos
Faltantes.
3) A fin de lograr una distribución más equitativa del uso de parrilleros
se dará prioridad a quienes no lo hallan utilizado en el plazo de la
última semana.
4) Se dará prioridad a los propietarios que cumplan años, debiendo
acreditar el mismo con documento de identidad.
5) Las reservas se podrán realizar en el horario de 15 a 23 hs.
6) En alta temporada se podrá reservar un solo parrillero por unidad por
Turno.
7) Se deberá presentar con anticipación lista de invitados en recepción,
pudiendo ingresar solo quienes figuren en la misma.
8) El Horario de los turnos es de 11 a 17 hs. Y de 20 a 03 hs            </v-card-text>
            <v-card-actions>
              <v-btn color="secondary" @click="termsModal = false">Cerrar</v-btn>
            </v-card-actions>
          </GeneralCardComponent>
        </v-dialog>
      </v-card-subtitle>
      <v-expand-transition hide-on-leave="true">
        <v-card-text>
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
                <v-col class="col-12 secondary">
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
                <v-col class="col-12 grey lighten-5" v-if="reservoirByTurn">
                  <v-row class="border-bottom py-3" no-gutters>
                    <v-col class="col-5 d-flex align-center">
                      <span>12:00 - 17:00</span>
                    </v-col>
                    <v-col class="col-4 d-flex align-center">
                      <span>LIBRE</span>
                    </v-col>
                    <v-col class="col-3">
                      <v-btn color="success darken-1"
                        @click="createReservation( {from: '12:00:00.000', to: '13:00:00.000'})"
                        v-show="!checkEmptyReservation( {from: '12:00:00.000', to: '13:00:00.000'})" block depressed>
                        RESERVAR&nbsp;<v-icon>mdi-calendar</v-icon>
                      </v-btn>
                      <v-btn color="red darken-1" class="white--text"
                        v-show="checkEmptyReservation( {from: '12:00:00.000', to: '13:00:00.000'})" block depressed>
                        RESERVAR&nbsp;<v-icon>mdi-calendar</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row class="border-bottom py-3" no-gutters>
                    <v-col class="col-5 d-flex align-center">
                      <span>20:00 - 01:00</span>
                    </v-col>
                    <v-col class="col-4 d-flex align-center">
                      <span>LIBRE</span>

                    </v-col>
                    <v-col class="col-3">
                      <v-btn color="success darken-1"
                        @click="createReservation( {from: '21:00:00.000', to: '22:00:00.000'})"
                        v-show="!checkEmptyReservation( {from: '21:00:00.000', to: '22:00:00.000'})" block depressed>
                        RESERVAR&nbsp;<v-icon>mdi-calendar</v-icon>
                      </v-btn>
                      <v-btn color="red darken-1" class="white--text"
                        v-show="checkEmptyReservation( {from: '21:00:00.000', to: '22:00:00.000'})" block depressed>
                        RESERVAR&nbsp;<v-icon>mdi-calendar</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col class="col-12 grey lighten-5" v-else>
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
      getColorCalendar: Function,
      apartment: {
        type: Object,
        default: () => ({})
      }
    },
    data: () => ({
      now: null,
      newReservationModal: false,
      termsModal: false,
      reservation: {
        persons: 1,
        owner:true
      },
      selectedDate: null,
      date: null,
    }),
    created() {
      if (this.apartment) {
        this.reservation.apartment = this.apartment.id
      }
    },
    mounted() {
      this.now = moment().format("YYYY-MM-DD");
      this.$store.dispatch('apartments/findAll')
    },
    methods: {
      allowedDates(date) {
        var currentDate = this.now
        const ruleBeforeTo = this.zone.rules.find((rule) => rule.rule.type === 'before_to');
        if (ruleBeforeTo) {
          currentDate = moment().add(ruleBeforeTo.value, ruleBeforeTo.rule.subtype).format("YYYY-MM-DD")
        }
        return moment(date).isSameOrAfter(currentDate);
      },
      showReservedHours() {
        this.$store.dispatch("zones/reservations/findAll", {
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


        const rulePrePayment = this.zone.rules.find((rule) => rule.rule.type === 'prepayment');
        if (!rulePrePayment) {
          this.generateInvoiceToApartment()
        }
        if (!this.reservation.apartment) {
          return
        }

        await this.$store.dispatch("zones/reservations/add", this.reservation);
        this.reservation = {
          apartment: this.reservation.apartment,
          persons: 1
        };
        this.newReservationModal = true;
        this.showReservedHours()
      },
      async generateInvoiceToApartment() {
          this.reservation.pending_payment = true
          var amount = 0
          if (this.reservation.owner) {
            amount = 1500
          } else {
            amount = 750
          }

          this.$store.dispatch('accounting/set', {
            type: 'expenses',
            amount: amount,
            status: 'pending',
            currency: 'UYU',
            address: '',
            comments: '',
            name: 'test',
            doc: '1',
          })
          let invoice = await this.$store.dispatch('accounting/add')
          if (this.apartment) {
            this.$store.dispatch('apartments/addInvoices', {
              id: this.reservation.apartment,
              invoice: invoice
            })
          }
      },

      checkEmptyReservation(hours) {
        if (!this.reservationList.data || this.zone == null) return
        let reservationList = this.reservationList.data.filter(reservation => {
          return reservation.from == hours.from && reservation.to == hours.to;
        })
        let numberOFPeoples = _.sumBy(reservationList, function (o) {
          return o.persons;
        });
        if (numberOFPeoples > this.zone.capacity) {
          return true;
        }
        return numberOFPeoples
      },
    },
    computed: {
      reservationList() {
        return this.$store.getters['zones/reservations/getList']
      },
      apartmentsList() {
        return this.$store.getters['apartments/getList']
      },
      arrayHourToHour() {
        let arrayOfHours = [];
        for (let i = 7; i < 24; i++) {
          if (moment().isSameOrAfter(moment(i, "HH")) && this.reservation.date == moment().format("YYYY-MM-DD"))
            continue
          arrayOfHours.push({
            from: moment(i, "HH").format("HH:mm:00.000"),
            to: moment(i + 1, "HH").format("HH:mm:00.000")
          });
        }
        return arrayOfHours;
      },
      reservoirByTurn() {
        console.log(this.zone)
        if (!this.zone || !this.zone.rules) return false
        return this.zone.rules.find((rule) => rule.rule.type === 'period') != undefined;
      }
    },
    watch: {
      "reservation.date": function () {
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
