<template>
  <v-toolbar :elevation="0" color="transparent">
    <v-toolbar-title class="font-weight-bold text-h6">INICIO</v-toolbar-title>
    &nbsp;&nbsp;
    <v-btn outlined @click="dialog = !dialog" color="success" class="font-weight-bold py-5">
      <v-icon>mdi-plus</v-icon>&nbsp;Nuevo
    </v-btn>
    <v-dialog v-model="dialog" width="auto" persistent>
      <v-card max-width="500">
        <v-card-text class="pa-3">
          <v-row>
            <v-col class="col-12">
              <v-btn block color="primary">
                <v-icon>mdi-house</v-icon>&nbsp;AGREGAR APARTAMENTO
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>

<script>
  export default {
    data() {
      return {
        dialog: false
      }
    }
  }

</script>

<style>

</style>
