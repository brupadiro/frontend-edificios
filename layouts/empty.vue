<template>
  <v-app dark>
    <v-app-bar app color="primary" elevation="1">
      <v-toolbar-title>
        <img height="60" src="/logo.png">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/accounts/register/owners" class="white--text font-weight-bold">Registrate ahora</router-link>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>
<script>
  export default {
    name: 'empty',
  }

</script>

<style lang="scss">

</style>
