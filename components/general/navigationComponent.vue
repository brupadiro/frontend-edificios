<template>
  <div>
    <v-navigation-drawer :value="!mobileMenu" color="primary" app class="navigation-drawer">
      <template v-slot:prepend>
        <v-img src="/logo.png" width="100%" contain position="center center" class="mt-3"></v-img>
        <v-divider></v-divider>
      </template>
      <v-list>
        <template v-for="(item, i) in items">
          <v-list-group v-if="item.subItems" :key="i" append-icon="" no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-btn text color="white" block height="50" class="btn-navigation"
                  active-class="btn-navigation-active primary white--text">
                  <img :src="`/icons/${subItem.icon}.png`">
                  <span>{{item.title}}</span>
                </v-btn>
              </v-list-item-content>
            </template>
            <v-list-item class="pl-12" link v-for="(subItem,si) in item.subItems" :key="'s'+si">
              <v-list-item-content>
                <v-btn text color="secondary" block height="50" class="btn-navigation"
                  active-class="btn-navigation-active  white--text" :to="subItem.to" exact>
                  <img :src="`/icons/${subItem.icon}.png`">
                  <span>{{subItem.title}}</span>
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item :key="i+'n'" v-else>
            <v-list-item-content>
              <v-btn text color="white" block height="50" class="btn-navigation font-weight-bold"
                active-class="btn-navigation-active  white--text" :to="item.to">
                <img :src="`/icons/${item.icon}.png`" width="30px">
                <span>{{item.title}}</span>
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-btn text color="white" block height="50" class="btn-navigation"
                active-class="btn-navigation-active  white--text" to="/accounts/logout">
                <img :src="`/icons/logout.png`" width="30px">
                <span>Salir</span>
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-bottom-navigation app v-show="mobileMenu" background-color="primary" class="rounded-t-xl">
      <template v-for="(item, i) in bottomItems">

        <v-bottom-sheet v-if="item.subItems" :key="i" class="rounded-t-xl">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" icon color="primary" v-on="on">
              <img :src="`/icons/${item.icon}.png`" width="30px">
            </v-btn>
          </template>
          <v-list color="primary">
            <v-list-item v-for="(subItem,i) in item.subItems" :key="i">
              <v-list-item-content>
                <v-btn color="white" outlined block height="50" class="btn-navigation"
                  active-class="btn-navigation-active  white--text" :to="subItem.to" exact>
                  <img :src="`/icons/${subItem.icon}.png`" width="30px">
                  <span>{{subItem.title}}</span>
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-bottom-sheet>
        <template v-else>
          <v-btn :key="i+'n'" color="primary" icon :to="item.to">
            <img :src="`/icons/${item.icon}.png`" width="30px">
          </v-btn>
        </template>
      </template>
    </v-bottom-navigation>

  </div>
</template>

<script>
  import navigationMixin from '~/plugins/mixins/navigationMixin'
  export default {
    mixins: [navigationMixin],
    data() {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    },
    methods: {
      checkTabType(item) {
        if (item.subItems) {
          return 'v-list-group'
        } else {
          return 'v-list-item'
        }
      }

    },
    computed: {
      mobileMenu() {
        return this.$vuetify.breakpoint.mdAndDown
      }
    }
  }

</script>

<style lang="scss">
  .navigation-drawer {
    border-top-right-radius: 35px;
    border-bottom-right-radius: 35px;
  }

  .btn-navigation {
    border: 1px solid #80808024;
    border-radius: 15px !important;
    padding: 0 !important;

    .v-btn__content {
      width: 100%;
      justify-content: start;
      height: 100%;
      align-items: center;
      margin-left: 40px;
    }

    span {
      text-transform: capitalize;
      font-weight: 500;
      margin-left: 10px;
    }
  }

  .btn-navigation-active {
    span {
      color: white;
    }
  }

</style>
