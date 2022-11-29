<template>
  <v-dialog v-model="value" max-width="700">
    <GeneralCardComponent>
      <GeneralCardTitleComponent class="primary white--text">
        Nueva tarea
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('input', false)">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </GeneralCardTitleComponent>
      <v-card-text>
        <v-form ref="formTask">
          <v-row>
            <v-col class="col-12 col-md-12">
              <FormsFieldsSelectComponent v-model="staff" :rules="rules.required" v-if="!filters.staff" :items="staffList.data"
                item-value="id" item-text="user.name" prepend-inner-icon="mdi-account" label="ASIGNADA A">
              </FormsFieldsSelectComponent>
            </v-col>
            <v-col class="col-12 col-md-12" v-show="!apto.id">
              <formsFieldsSelectComponent v-model="apartment" item-text="number" item-value="id"
                :items="apartmentsList" type="number" label="APARTAMENTO">
              </formsFieldsSelectComponent>
            </v-col>

            <v-col class="col-12 col-md-6">
              <FormsFieldsSelectComponent label="Area" item-text="name"  item-value="id" :items="areasList.data"
                v-model="area">
              </FormsFieldsSelectComponent>
            </v-col>
            <v-col class="col-12 col-md-6">
              <formsFieldsSelectComponent :items="prioritys" :rules="rules.required" v-model="priority"
                label="Prioridad">
              </formsFieldsSelectComponent>
            </v-col>
            <v-col class="col-12 col-md-12">
              <FormsFieldsTextComponent type="date" label="Fecha" :rules="rules.required" v-model="date">
              </FormsFieldsTextComponent>
            </v-col>

            <v-col class="col-12">
              <formsFieldsTextareaComponent label="Descripcion del problema" v-model="description">
              </formsFieldsTextareaComponent>
            </v-col>



          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" class="font-weight-regular rounded-lg white--text" @click="addTask()">Agregar
          tarea
        </v-btn>
      </v-card-actions>
    </GeneralCardComponent>
  </v-dialog>
</template>

<script>
  import {
    mapFields
  } from 'vuex-map-fields'
  export default {
    props: {
      filters:{
        type: Object,
        default: () => ({})
      },
      value: Boolean,
      apto: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        rules: {
          required: [value => !!value || 'Campo requerido']
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

      }
    },
    created() {
      this.$store.dispatch('apartments/findAll')
      this.$store.dispatch('areas/findAll')
    },
    methods: {
      async addTask() {
        //date

        if (!this.$refs.formTask.validate()) {
          this.errorInForm = true
          return
        }
        if(this.filters.staff) {
          this.staff = this.filters.staff
        }
        await this.$store.dispatch('staffs/tasks/create')
        await this.$store.dispatch('staffs/tasks/findAll',this.filters)
        this.$emit('input', false)
      },

    },
    computed: {
      apartmentsList() {
        var apartments = JSON.parse(JSON.stringify(this.$store.getters['apartments/getList'].data))
        apartments.unshift({
          number: 'Seleccionar apartamento',
          id: null
        })
        return apartments
      },
      areasList() {
        return this.$store.getters['areas/getList']
      },
      staffList() {
        return this.$store.getters['staffs/getList']
      },
      ...mapFields('staffs/tasks', [
        'task.date',
        'task.description',
        'task.staff',
        'task.apartment',
        'task.priority',
        'task.area',
      ])
    }
  }

</script>

<style>

</style>
