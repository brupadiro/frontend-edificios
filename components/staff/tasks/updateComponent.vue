<template>
  <v-dialog v-model="value" max-width="700">
    <GeneralCardComponent>
      <GeneralCardTitleComponent class="primary white--text">
        Actualizar tarea
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('input', false)">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </GeneralCardTitleComponent>
      <v-card-text>
        <v-form ref="formTask">
          <v-row>
            <v-col class="col-12 col-md-12">
              <formsFieldsSelectComponent :items="statusList" v-model="data.status" label="Estado">
              </formsFieldsSelectComponent>
            </v-col>
            <v-col class="col-12 col">
              <GeneralUploadSingleFileComponent v-model="data.file">
                Subir archivo
              </GeneralUploadSingleFileComponent>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" class="font-weight-regular rounded-lg black--text" @click="updateTask()">Actualizar
          tarea
        </v-btn>
      </v-card-actions>
    </GeneralCardComponent>
  </v-dialog>
</template>

<script>
  import _ from 'lodash'
  export default {
    props: {
        filters: {
            type: Object,
            default: () => ({})
        },
      value: {
        type: Boolean,
        default: false
      },
      task: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        data: {},
        statusList: [{
            text: 'Abierto',
            value: 'Open'
          },
          {
            text: 'Cerrado',
            value: 'Closed'
          },
        ]
      }
    },
    methods: {
      updateTask() {
        this.$store.dispatch('staffs/tasks/updateTask', this.data)
            .then(()=>{
                this.$store.dispatch('staffs/tasks/findAll',this.filters)
                this.$emit('input', false)
            })
      }
    },
    watch:{
        task:{
            handler(){
                this.data = _.cloneDeep(this.task)
            },
            deep:true
        }
    }

  }

</script>

<style>

</style>
