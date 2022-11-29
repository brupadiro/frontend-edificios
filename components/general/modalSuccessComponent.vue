<template>
  <v-dialog width="300" v-model="value" persistent>
    <v-card class="rounded-xl" height="220">
      <v-card-text class="pa-3 d-flex align-center">
        <v-row no-gutters>
          <v-col class="col-12 col-md-12 text-center">
            <v-icon size="60" :color="`${color} darken-1`">
              <slot name="icon"></slot>
            </v-icon>
          </v-col>
          <v-col class="col-12 col-md-12">
            <p class="text-h5 text-center">
              <slot name="title"></slot>
            </p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <slot name="buttonCancel"></slot>
        <v-btn rounded color="primary" class="font-weight-black white--text" @click="action()">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      value: Boolean,
      action: Function,
      color: {
        type: String,
        default: 'success'
      },
    }
  }

</script>
