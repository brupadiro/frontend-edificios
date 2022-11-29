<template>
  <v-app dark>
    <v-app-bar app color="primary" elevation="1">
      <v-toolbar-title>
        <img height="72" src="/logo.png">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>
      </v-toolbar-title>
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
