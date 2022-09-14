<template>
  <v-card outlined class="rounded-lg">
    <v-card-title de class="primary py-2">
      <v-tabs height="40" :vertical="$vuetify.breakpoint.smAndDown" v-model="tab" hide-slider slider-color="primary"
        background-color="primary" active-class="active-tab" grow>
        <v-tab ripple :value="1">
          <span class="font-weight-black white--text">CUENTA EN USD</span>
        </v-tab>
        <v-tab ripple :value="2">
          <span class="font-weight-black white--text">CUENTA EN UYU</span>
        </v-tab>
      </v-tabs>
    </v-card-title>
    <v-tabs-items v-model="tab">
      <v-tab-item :value="0">
        <propertiesCheckingSingleAccountComponent v-model="accounts" currency="USD"></propertiesCheckingSingleAccountComponent>
      </v-tab-item>
      <v-tab-item :value="1">
        <propertiesCheckingSingleAccountComponent v-model="accounts" currency="UYU"></propertiesCheckingSingleAccountComponent>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        tab: 0,
        checkingAccountNumber: '',
        checkingAccountBank: '',
        checkingAccountNumberUYU: '',
        checkingAccountBankUYU: '',
        rules: [
          (v) => !!v || 'Campo requerido',
        ],
        accounts: [],
        uyuAccountExist: false,
        usdAccountExist: false,
      }
    },
    created() {
      this.getAccounts()
    },
    methods: {
      getAccounts() {
        this.$axios.get('/checking-accounts').then(response => {
          this.accounts = response.data.data
        })
      },
    },
    computed: {
    },
  }

</script>

<style>

</style>
