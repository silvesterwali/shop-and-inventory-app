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
                <div>
                  <v-text-field
                    v-model.trim="credential.username"
                    label="Username"
                    placeholder="username"
                    :rules="[
                      (v) => !!v || 'username is required',
                      errorKey('username'),
                    ]"
                  ></v-text-field>
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
                  <v-text-field
                    v-model.trim="credential.passwordConfirmation"
                    label="Password Confirmation"
                    placeholder="Password"
                    :type="showPasswordConfirm ? 'text' : 'password'"
                    :append-icon="
                      showPasswordConfirm ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    :rules="[
                      (v) => !!v || 'passord confirmation is required',
                      errorKey('passwordConfirmation'),
                    ]"
                    @click:append="showPasswordConfirm = !showPasswordConfirm"
                  ></v-text-field>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer /><v-btn
                  type="submit"
                  outlined
                  color="primary"
                  :loading="loading"
                  class="rounded-pill"
                  >Register</v-btn
                >
                <v-spacer />
              </v-card-actions>
              <v-card-actions class="d-flex justify-center">
                <p>
                  If already have account ?
                  <nuxt-link to="/login">Login</nuxt-link>
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
  auth: 'guest',
  name: 'Register',
  mixins: [errorKey],
  layout: 'guest',
  data() {
    return {
      credential: {
        username: null,
        email: null,
        password: null,
        passwordConfirmation: null,
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
        this.loading = false
        this.register()
      }
    },
    async register() {
      try {
        await this.$axios.post('api/auth/register', this.credential)
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
