<template>
  <v-form @submit.prevent="validateForm">
    <v-row>
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-text-field
          v-model="dataForm.username"
          label="Username"
          :rules="[(v) => !!v || 'Username is required', errorKey('username')]"
        />
      </v-col>
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-text-field
          v-model="dataForm.email"
          label="Email"
          :rules="[
            (v) => !!v || 'email is required',
            (v) => /.+@.+/.test(v) || 'Email is not valid',
            errorKey('email'),
          ]"
        />
      </v-col>
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-text-field
          v-model="dataForm.password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          :rules="[(v) => !!v || 'password is required', errorKey('password')]"
        />
      </v-col>
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-text-field
          v-model="dataForm.password_confirm"
          label="Password Confirmation"
          :type="showPasswordConfirm ? 'text' : 'password'"
          :append-icon="showPasswordConfirm ? 'mdi-eye-off' : 'mdi-eye'"
          :rules="[
            (v) => !!v || 'Password Confirmation',
            errorKey('password_confirmation'),
          ]"
        />
      </v-col>
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-select
          v-model="dataForm.rules"
          placeholder="Rules"
          label="Rules"
          :items="rulesOptions"
          :rules="[(v) => !!v || 'Rules is required']"
          multiple
        />
      </v-col>
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-btn
          type="submit"
          :loading="loading"
          color="primary"
          class="float-right"
          >Submit</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import errorKey from '~/mixins/errorKey.js'
import setMessage from '~/mixins/setMessage.js'
import { createUser } from '~/services/Users.js'
export default {
  mixins: [errorKey, setMessage],
  data() {
    return {
      dataForm: {
        _id: null,
        username: null,
        email: null,
        password: null,
        password_confirm: null,
        rules: [],
      },
      showPassword: false,
      showPasswordConfirm: false,
      errors: null,
      loading: false,
      rulesOptions: ['customer', 'admin'],
    }
  },
  methods: {
    async validateForm() {
      this.loading = true
      try {
        const { data } = await createUser(this.dataForm)
        this.SET_MESSAGE({ text: data.message, color: 'success' })
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
