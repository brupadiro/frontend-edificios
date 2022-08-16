<template>
  <v-app-bar bottom class="border-top" fixed elevation="0">
      <v-toolbar-items style="height:50px;width:100%">
        <v-spacer></v-spacer>
        <slot></slot>
      </v-toolbar-items>
  </v-app-bar>

</template>

<script>
  export default {

  }

</script>

<style>
.border-top{
      border-top: 1px solid #0000001c!important;
}
</style>
