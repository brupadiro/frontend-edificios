<template>
  <v-dialog v-model="value" max-width="700">
    <GeneralCardComponent>
      <GeneralCardTitleComponent class="primary white--text">
        Ver tarea
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('input', false)">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </GeneralCardTitleComponent>
      <v-card-text>
        <v-form ref="formTask">
          <v-row>
            <v-col class="col-12 col-md-12">
              <formsFieldsSelectComponent :items="statusList" readonly v-model="data.status" label="Estado">
              </formsFieldsSelectComponent>
            </v-col>
            <v-col class="col-12 col">
              <GeneralUploadSingleFileComponent readonly v-model="data.file">
                Subir archivo
              </GeneralUploadSingleFileComponent>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
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
