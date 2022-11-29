<template>
  <v-card outlined>
    <v-card-subtitle class="font-weight-bold black--text">
      <slot></slot>
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-card-text>
      <div class="d-flex justify-center" v-if="!readonly">
        <v-sheet color="indigo lighten-4" width="100%" height="150"
          class="rounded d-flex justify-center align-center dotted-border p-relative" @click="selectPhoto">
          <v-icon size="80" v-if="!value">mdi-file-plus-outline</v-icon>
          <v-img :src="getUrl()" v-else width="100%" height="80" contain></v-img>
        </v-sheet>
        <input type="file" style="display:none;" ref="uploadFile" @change="onFileChange" />
      </div>
      <div class="d-flex justify-center" v-else>
        <v-sheet color="indigo lighten-4" width="100%" height="150"
          class="rounded d-flex justify-center align-center dotted-border p-relative">
          <v-icon size="80" v-if="!value">mdi-file-plus-outline</v-icon>
          <v-img :src="getUrl()" v-else width="100%" height="80" contain></v-img>
        </v-sheet>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      value: null,
      readonly: {
        default: false,
        type: Boolean
      }
    },
    data() {
      return {
        showPreview: false
      }
    },
    mounted() {},
    methods: {
      getUrl() {
        if (this.value) {
          if (this.value.url) {
            return this.value.url
          } else {
            return URL.createObjectURL(this.value);
          }

        }
      },
      selectPhoto(event) {
        this.$refs.uploadFile.click()
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length)
          return
        this.$emit('input', files[0])

      },
    },
  }

</script>

<style scoped>
  .dotted-border {
    border: 1px solid;
    border-style: dotted;
  }

</style>
