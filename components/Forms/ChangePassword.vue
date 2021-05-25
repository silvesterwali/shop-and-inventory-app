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
                placeholder="Current Password"
              ></v-text-field>
              <v-text-field
                v-model="dataForm.password"
                type="password"
                label="New Password"
                placeholder="New Password"
              ></v-text-field>

              <v-text-field
                v-model="dataForm.passwordConfirmation"
                type="password"
                label="Password Confirmation"
                placeholder="Password Confirmation"
              ></v-text-field>
              <p>
                Make sure it's at least 15 characters OR at least 8 characters
                including a number and a lowercase letter
              </p>

              <div class="d-flex justify-space-between">
                <div class="d-flex align-center">
                  <v-btn>Update Password</v-btn>
                </div>
                <div class="d-flex align-center">
                  <a class="font-weight-medium">i forgot my password</a>
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
export default {
  name: 'ChangePassword',
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
    }
  },
}
</script>

<style lang="scss" scoped></style>
