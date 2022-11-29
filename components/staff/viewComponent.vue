<template>
    <v-dialog v-model="value" max-width="1000" persistent eager>
      <GeneralCardComponent>
        <GeneralCardTitleComponent class="primary white--text">
          {{staff.user.name}}
          <v-spacer></v-spacer>
          <v-btn icon @click="$emit('input',false)">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </GeneralCardTitleComponent>
        <v-divider></v-divider>
        <v-card-text class="pa-3">
          <v-form ref="form">
            <v-row>
              <v-col class="col-md-9 col-12">
                <v-row>
                  <v-col class="col-4">
                    <FormsFieldsSelectComponent :items="['CI', 'PASAPORTE']"  readonly label="Documento"
                      type="number" v-model="staff.doc_type"></FormsFieldsSelectComponent>
                  </v-col>
                  <v-col class="col-8">
                    <FormsFieldsTextComponent label="_" type="number"  readonly v-model="staff.user.username">
                    </FormsFieldsTextComponent>
                  </v-col>
                  <v-col class="col-12 col-sm-6">
                    <label class="font-weight-regular mb-2 grey--text text--darken-4 text-uppercase text-subtitle-2">Hora
                      de entrada</label>
                        <v-btn block class="black--text rounded-lg" color="white" x-large v-on="on">
                          {{ staff.entry_hour }}&nbsp;&nbsp;<v-icon>mdi-clock-outline</v-icon>
                        </v-btn>
                  </v-col>
                  <v-col class="col-12 col-sm-6">
                    <label class="font-weight-regular mb-2 grey--text text--darken-4 text-uppercase text-subtitle-2">Hora
                      de salida</label>
                        <v-btn block class="black--text rounded-lg" color="white" x-large>
                          {{ staff.exit_hour }}&nbsp;&nbsp;<v-icon>mdi-clock-outline</v-icon>
                        </v-btn>
                  </v-col>
                  <v-col class="col-6">
                    <FormsFieldsTextComponent label="Telefono" readonly  type="number" v-model="staff.user.phone">
                    </FormsFieldsTextComponent>
                  </v-col>
                  <v-col class="col-6">
                    <FormsFieldsSelectComponent label="Area" readonly  item-text="name" value="name"
                      :items="['Mantenimiento']" v-model="staff.area"></FormsFieldsSelectComponent>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="col-md-3 col-12">
                <generalUploadSingleFileComponent v-model="staff.photo" readonly></generalUploadSingleFileComponent>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-text>
        <StaffTasksListComponent :filters="filters" v-if="value"></StaffTasksListComponent>
      </v-card-text>


      </GeneralCardComponent>
    </v-dialog>
  
  </template>
  
  <script>
    export default {
      props: {
        staff: {
            type: Object,
            default:{
                user:{
                    name:'',
                    username:'',
                    phone:''
                },
                doc_type:'',
                entry_hour:'',
                exit_hour:'',
                area:'',
                photo:''
            }
        },
        value: {
          type: Boolean,
          default: false
        }
      },
      data() {
        return {
          filters:{ }
        }
      },
      mounted() {
        this.filters.staff = this.staff.id
      }
    }
  
  </script>
  
  <style>
  
  </style>
  