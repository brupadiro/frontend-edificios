<template>
  <v-container fill-height>
    <v-row justify="center" align-content="center">
      <v-col class="col-12 col-md-8 col-lg-6">
        <GeneralCardComponent color="primary">
          <v-card-title class="d-flex justify-center">
            <v-avatar size="250">
              <v-img src="/icons/desktop.png" contain></v-img>
            </v-avatar>
          </v-card-title>
          <v-divider></v-divider>
          <GeneralCardTitleComponent class="d-flex justify-center white--text text-h5">
            Entra ahora en Forest
          </GeneralCardTitleComponent>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col class="col-12">
                  <FormsFieldsTextComponent v-model="user.username" prepend-inner-icon="mdi-doc" :rules="rules.required"
                    label-color="white--text" label="Documento" type="number" required>
                  </FormsFieldsTextComponent>
                </v-col>
                <v-col class="col-12">
                  <formsFieldsPasswordComponent v-model="user.password" :rules="rules.required" label-color="white--text" label="Password"
                    required>
                  </formsFieldsPasswordComponent>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" class="secondary white--text rounded-lg font-weight-regular" @click="login()" large block>
              Entrar&nbsp;<v-icon>mdi-login</v-icon>
            </v-btn>
          </v-card-actions>
        </GeneralCardComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    auth: false,
    layout: 'empty',
    data: () => ({
      rules: {
        required: [value =>  !!value || 'Required.'],
        email: [value => /.+@.+\..+/.test(value) || 'E-mail must be valid'],
        min: [v => v.length >= 8 || 'Min 8 characters']
      },
      user: {
        username: '',
        password: ''
      },
    }),
    methods: {
      async login() {
        await this.$store.dispatch('users/login', this.user)
      }
    }
  }

</script>

<style>

</style>
