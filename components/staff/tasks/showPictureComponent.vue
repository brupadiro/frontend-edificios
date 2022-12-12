<template>
  <v-dialog v-model="value" max-width="700">
    <GeneralCardComponent>
      <GeneralCardTitleComponent class="primary white--text">
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('input', false)">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </GeneralCardTitleComponent>
      <v-card-text>
        <v-img :src="url" contain width="100%" height="400"></v-img> 
      </v-card-text>
    </GeneralCardComponent>
  </v-dialog>

</template>

<script>
export default {
    props:{
        value: {
            type: Boolean,
            default: false
        },
        url: {
            type: String
        }
    }
}
</script>