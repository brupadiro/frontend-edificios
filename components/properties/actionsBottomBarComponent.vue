<template>
  <generalBottomBarComponent :color="bottomBarColor" app>
    <!-- create button previous step -->
    <v-btn fab color="yellow" class="white--text rounded-lg mr-3" @click="$emit('input',value-=1)"
      :disabled="value === 1">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn text-color="white" class="secondary black--text rounded-lg font-weight-regular" @click="changeStep()">
      <template v-if="value<4">
        <span>Siguiente</span>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
      <template v-else>
        Guardar apartamento
        <v-icon>mdi-home</v-icon>
      </template>
    </v-btn>
    <v-snackbar v-model="errorInForm" color="red">
      Hubo un error al enviar, por favor revise los datos e intente nuevamente
      <v-btn text @click="errorInForm = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>

  </generalBottomBarComponent>

</template>


<script>
  import apartmentsMixins from '~/plugins/mixins/forms/apartments.js'

  export default {
    props: {
      files: {
        type: Array,
        default: () => {
          return {
            data: []
          }
        }
      },
      value: {
        type: Number,
        required: true
      },
    },
    mixins: [apartmentsMixins],
    methods: {
      async changeStep() {
        if (this.value == 1) {
          await this.generateFunction("Apartments");
          return
        } else if (this.value == 2) {
          await this.generateFunction("Owners");
          return
        } else if (this.value == 3) {
          await this.generateFunction("Files");
          this.$router.go(-1)
          return
        } 
      },
    },
    computed: {
      bottomBarColor() {
        if (this.$vuetify.breakpoint.smAndDown) {
          return 'primary'
        } else {
          return 'grey lighten-4'
        }

      }
    },
    watch: {
      step(val) {
        this.$emit('input', val)
      }
    }
  }

</script>
