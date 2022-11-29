<template>
  <v-app dark>
    <generalNavigationComponent></generalNavigationComponent>
    <v-main class="pb-16">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>


  export default {
    //middleware: 'auth',
    created() {
      if(!this.$auth.loggedIn) {
        this.$router.push('/accounts/login')
      }
      if(this.$auth.user.type != 'admin') {
        if(this.$auth.user.type == 'staff') {
          this.$router.push('/accounts/staff')
        } else {
          this.$router.push('/accounts/me')
        }
      } 
    },
    mounted() {
    },
    methods: {
    },
    computed: {
      navigationTypeComponent() {
        if(this.$auth.user.type == 'admin') {
          return 'generalNavigationAdminComponent'
        } else {
          return 'generalNavigationUserComponent'
        }
      }
    }
}

</script>

