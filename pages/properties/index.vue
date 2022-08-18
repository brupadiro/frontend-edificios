<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:title>
        Apartamentos
      </template>
    </headersGeneralComponent>
    <v-row>
      <v-col class="col-12">
        <generalCardComponent elevation="6">
          <v-card-title class="text-subtitle-1 font-weight-regular primary">
            <formsFieldsTextButtonComponent class="elevation-6 rounded-lg" background-color="white" @click="search($event)" label="Buscar...">
              <template v-slot:icon>
                <v-icon>mdi-magnify</v-icon>
              </template>
            </formsFieldsTextButtonComponent>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <cardsPropertiesComponent outlined @changePage="search.pagination.page = $event" :data="data" expanded></cardsPropertiesComponent>
          </v-card-text>
          <v-divider></v-divider>
        </generalCardComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        headers: [{
          text: 'Numero de apartamento',
          value: 'attributes.number',
          align: 'center'
        }, {
          text: 'En alquiler',
          value: 'attributes.in_rent',
          align: 'center'
        }, {
          text: 'Habitaciones',
          value: 'attributes.rooms',
          align: 'center'
        }, {
          text: 'Expensas',
          value: 'attributes.expenses_cost',
          align: 'center'
        }, {
          text: 'Metodo de pago (Expensas)',
          value: 'attributes.expenses_payment_method',
          align: 'center'
        },{
          text: 'Acciones',
          value: 'id',
          align: 'center'
        }],
        search: {
          populate:'*',
          pagination: {
            page: 1
          },
          /*
          filters: {
            number: null
          }
          */
        }
      }
    },
    mounted() {
      this.getProperties();
    },
    methods: {
      getProperties() {
        this.$store.dispatch('apartments/findAll', this.search)
      },
      deleteProperty(id) {
        this.$store.dispatch('apartments/delete', id)
      },
    },
    computed: {
      data() {
        return this.$store.getters['apartments/getList'];
      }
    },
    watch:{
        search: {
            handler() {
            this.getProperties();
            },
            deep: true
        }
    }
  }

</script>
