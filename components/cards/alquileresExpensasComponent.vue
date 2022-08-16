<template>
  <generalCardComponent fillHeight elevation="6">
    <GeneralCardTitleComponent class="primary white--text">
      Alquileres y expensas
    </GeneralCardTitleComponent>
    <v-card-text>
      <v-row>
        <v-col class="col-12">
          <h3 class="black--text font-weight-regular">Monto total</h3>
          <h3 class="black--text font-weight-black">$ 5500</h3>
        </v-col>
        <v-col class="col-12">
          <v-progress-linear color="deep-purple accent-4" value="50" rounded height="12"></v-progress-linear>
        </v-col>
        <v-col class="col-12">
          <v-card outlined class="rounded-xl" color="black">
            <v-card-text>
              <v-row>
                <v-col class="col-12">
                  <h4 class="font-weight-light white--text">Inquilinos con deudas pendientes</h4>
                </v-col>
                <v-col class="col-12 col-md-6">
                  <v-row no-gutters>
                    <v-avatar size="60" tile class="rounded-lg">
                      <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
                    </v-avatar>
                    <v-avatar size="60" tile class="rounded-lg ml-n3">
                      <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
                    </v-avatar>
                    <v-avatar size="60" tile class="rounded-lg ml-n3">
                      <v-img width="60" height="60" contain src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
                        <div class="d-flex fill-width fill-height justify-center align-center"
                          style="background:#f44336b0">
                          <h2 class="white--text">+12</h2>
                        </div>
                      </v-img>
                    </v-avatar>
                  </v-row>
                </v-col>
                <v-col class="col-12 col-md-6">
                  <v-btn height="60" large block class="font-weight-black red--text">VER INQUILINOS</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col> 
      </v-row>

    </v-card-text>
  </generalCardComponent>

</template>

<script>
  export default {

  }

</script>

<style>

</style>
