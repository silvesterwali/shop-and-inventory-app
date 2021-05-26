<template>
  <div>
    <v-form>
      <v-card>
        <v-card-title>Change Your Password</v-card-title>
        <v-card-text>
          <v-row>
            <v-col class="12" md="8" lg="8" sm="8">
              <v-text-field
                v-model="dataForm.currentPassword"
                type="password"
                label="Current Password"
                autocomplete="off"
                placeholder="Current Password"
              ></v-text-field>
              <v-text-field
                v-model="dataForm.password"
                type="password"
                label="New Password"
                autocomplete="off"
                aria-autocomplete="false"
                placeholder="New Password"
              ></v-text-field>

              <v-text-field
                v-model="dataForm.passwordConfirmation"
                type="password"
                autocomplete="off"
                label="Password Confirmation"
                aria-autocomplete="false"
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
                  <v-btn color="primary">Update Password</v-btn>
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
        _id: null,
        userId: this.userId,
        password: null,
        passwordConfirmation: null,
        currentPassword: null,
      },
      errors: null,
    }
  },
}
</script>

<style lang="scss" scoped></style>
