<template>
  <div>
    <v-card-text class="v-card-text-overflow">
      <v-list v-if="items.meta.pagination.total>0">
        <v-list-item class="elevation-2 rounded-lg my-3" v-for="item in items.data" :key="item.id">
          <v-list-item-avatar size="80" color="indigo darken-1" class="pa-2">
            <v-img src="/icons/person.png" contain></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <h3>{{item.name}}</h3>
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-icon>mdi-note-text</v-icon>&nbsp;
              <b class="black--text">{{item.doc_type}}: {{item.doc}}</b>
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="item.phone">
              <v-icon>mdi-phone</v-icon>&nbsp;
              <b class="black--text">{{item.phone}}</b>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-icon>mdi-calendar</v-icon>&nbsp;
              {{ item.createdAt | formatDate }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-icon>mdi-clock</v-icon>&nbsp;
              Hora de salida: {{ item.out_hour | formatHour }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn v-show="!item.out_hour" :fab="isMobile" rounded color="yellow" class="font-weight-regular rounded-lg"
              @click="setCheckout(item.id)">
              <v-icon v-if="isMobile" size="30">ion-ios-exit</v-icon>
              <span v-else>CHECK OUT</span>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item class="elevation-2 rounded-lg my-3">
          <v-list-item-avatar>
            <v-icon size="60" color="primary">ion-ios-information-circle</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <h3>Aun no tienes visitas registradas</h3>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions v-if="items.meta" class="d-flex justify-center">
      <v-pagination :length="items.meta.pagination.pageCount" v-model="page"></v-pagination>
    </v-card-actions>
  </div>
</template>

<script>
  export default {
    props:{
        items: {
            type: Object,
            required: true
        }
    }
  }

</script>

<style>

</style>
