<template>
  <v-btn fab depressed small class="rounded-xl" @click="$emit('input',false)" color="grey lighten-3">
    <v-icon>mdi-close</v-icon>
  </v-btn>

</template>

<script>
export default {
    methods:{
        close() {
        }
    }
}
</script>