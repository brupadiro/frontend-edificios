<template>
  <v-card class="rounded-lg p-relative" outlined :color="color+' lighten-3'">
    <div class="main-bar rounded-xl" :class="color"></div>
    <v-card-text class="pl-12 pt-5">
      <h1 class="black--text mt-2">
        <slot name="title"></slot>
      </h1>
      <p class="mb-0" :class="`${color}--text text-subtitle-1 font-weight-regular text--darken-6`">
        <slot name="subtitle"></slot>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
      props:{
          color: {
              type: String,
              default: 'primary'
          },
      }
  }

</script>

<style>
  .main-bar {
    position: absolute;
    left: 0;
    height: 100%;
    width: 15px;
  }

</style>
