<template>
  <div>
    <v-container>
      <v-row no-gutters justify="center" align="center" class="my-10">
        <v-col cols="12" md="5" lg="5" class="my-5">
          <v-form ref="formRegister" @submit.prevent="validate">
            <v-card min-height="400px" elevation="1" tile :loading="loading">
              <v-card-text>
                <div class="mt-n10 mb-4">
                  <v-img
                    height="80"
                    contain
                    :src="require('~/assets/brand.png')"
                  ></v-img>
                </div>
                <v-alert
                  v-show="errors && errors.message"
                  tile
                  dense
                  outlined
                  type="error"
                >
                  {{ errors && errors.message }}
                </v-alert>
                <div>
                  <v-text-field
                    v-model.trim="credential.email"
                    label="Email"
                    placeholder="Email"
                    :rules="[
                      (v) => !!v || 'email is required',
                      (v) => /.+@.+/.test(v) || 'Email is not valid',
                      errorKey('email'),
                    ]"
                  ></v-text-field>
                  <v-text-field
                    v-model.trim="credential.password"
                    label="Password"
                    placeholder="Password"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    :rules="[
                      (v) => !!v || 'password is required',
                      errorKey('password'),
                    ]"
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                  <p>
                    Forgot your password?
                    <nuxt-link to="/forgot-password">Here</nuxt-link>
                  </p>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer /><v-btn
                  type="submit"
                  outlined
                  color="primary"
                  :loading="loading"
                  class="rounded-pill"
                  >Login</v-btn
                >
                <v-spacer />
              </v-card-actions>
              <v-card-actions class="d-flex justify-center">
                <p>
                  Don't have any account ?
                  <nuxt-link to="/register">Register</nuxt-link>
                </p>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import errorKey from '@/mixins/errorKey.js'
export default {
  name: 'Login',
  mixins: [errorKey],
  layout: 'guest',
  auth: 'guest',
  data() {
    return {
      credential: {
        email: null,
        password: null,
      },
      showPassword: false,
      showPasswordConfirm: false,
      errors: null,
      loading: false,
    }
  },
  methods: {
    validate() {
      this.errors = null
      if (this.$refs.formRegister.validate()) {
        this.loading = true
        this.login()
      }
    },
    async login() {
      try {
        await this.$auth.loginWith('local', { data: this.credential })
        this.$router.push('/')
      } catch (err) {
        this.errors = err.response.data
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
