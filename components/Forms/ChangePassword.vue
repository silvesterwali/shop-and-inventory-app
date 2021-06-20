<template>
  <div>
    <v-form ref="passwordForm" @submit.prevent="validateForm">
      <v-card>
        <v-card-title>Change Your Password</v-card-title>
        <v-card-text>
          <v-row>
            <v-col class="12" md="8" lg="8" sm="8">
              <v-text-field
                v-model="dataForm.currentPassword"
                type="password"
                label="Current Password"
                :rules="[
                  (v) => !!v || 'Current password required',
                  errorKey('currentPassword'),
                ]"
                autocomplete="off"
                placeholder="Current Password"
              ></v-text-field>
              <v-text-field
                v-model="dataForm.password"
                type="password"
                label="New Password"
                :rules="[
                  (v) => !!v || 'New Password required',
                  errorKey('password'),
                ]"
                autocomplete="off"
                placeholder="New Password"
              ></v-text-field>

              <v-text-field
                v-model="dataForm.passwordConfirmation"
                type="password"
                autocomplete="off"
                label="Password Confirmation"
                aria-autocomplete="false"
                :rules="[
                  (v) => !!v || 'Password Confirmation required',
                  errorKey('passwordConfirmation'),
                ]"
                placeholder="Password Confirmation"
              ></v-text-field>
              <p>
                Make sure it's at least 15 characters OR at least 8 characters
                including a number and a lowercase letter
              </p>

              <div class="d-flex justify-space-between">
                <div class="d-flex align-center">
                  <a class="font-weight-medium">i forgot my password</a>
                </div>
                <div class="d-flex align-center">
                  <v-btn type="submit" :loading="loading" color="primary"
                    >Update Password</v-btn
                  >
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import errorKey from '@/mixins/errorKey.js'
import { authUpdatePassword } from '~/services/Password.js'
export default {
  name: 'ChangePassword',
  mixins: [errorKey],
  props: {
    userId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      dataForm: {
        password: null,
        passwordConfirmation: null,
        currentPassword: null,
      },
      errors: null,
      loading: false,
    }
  },
  methods: {
    validateForm() {
      this.errors = null
      if (this.$refs.passwordForm.validate()) {
        this._authUpdatePassword()
      }
    },
    async _authUpdatePassword() {
      try {
        this.loading = true
        await authUpdatePassword(this.userId, this.dataForm)
        this.dataForm.password = null
        this.dataForm.passwordConfirmation = null
        this.dataForm.currentPassword = null
        this.$refs.passwordForm.reset()
        this.loading = false
      } catch (err) {
        this.errors = err.response.data
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
