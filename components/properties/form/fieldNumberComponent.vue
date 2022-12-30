<template>
  <div>
    <formsFieldsTextComponent prepend-inner-icon="mdi-numeric" :error-messages="errorApartmentExists"
      @input="checkIfApartmentExists($event)" type="number" v-model="number" label="Numero de apartamento">
    </formsFieldsTextComponent>
    <span v-if="errorApartmentExists.length>0" class="error--text">{{errorApartmentExists[0]}}</span>
  </div>
</template>
<script>
  export default {
    props: {
      value: null,
    },
    data() {
      return {
        errorApartmentExists: [],
        number: null,
      }
    },
    methods: {
      async checkIfApartmentExists(number) {
        const exists = await this.$store.dispatch('apartments/checkIfExists', number)
        this.errorApartmentExists = exists && !this.id ? ['Ya existe un apartamento con ese numero'] : []
      }

    },
      watch: {
        number(newValue) {
          this.$emit('input', newValue);
        },
        value(value) {
          this.number = value
        },

      }
  }

</script>

<style>

</style>
