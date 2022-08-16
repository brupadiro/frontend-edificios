<template>
  <div>
    <portal to="header-title">
      <v-toolbar-title class="font-weight-bold text-h6">
        <slot name="title"></slot>
      </v-toolbar-title>
    </portal>
    <portal to="header-extension">
      <slot name="subtitle"></slot>
    </portal>
  </div>

</template>

<script>
  export default {

  }

</script>

<style scoped>
</style>
