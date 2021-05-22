<template>
  <div>
    <v-container>
      <v-row no-gutters justify="center" align="center" class="my-10">
        <v-col cols="12" md="5" lg="5" class="my-5">
          <v-form>
            <v-card min-height="400px">
              <v-card-text>
                <div class="mt-n10 mb-4">
                  <v-img
                    height="80"
                    contain
                    src="data:image/png;base64,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"
                  ></v-img>
                </div>
                <div>
                  <v-text-field
                    v-model.trim="credential.email"
                    label="Email"
                    placeholder="Email"
                  ></v-text-field>
                  <v-text-field
                    v-model.trim="credential.password"
                    label="Password"
                    placeholder="Password"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer /><v-btn outlined color="primary" class="rounded-pill"
                  >Login</v-btn
                >
                <v-spacer />
              </v-card-actions>
              <v-card-actions>
                <div class="font-weight-light mx-auto">
                  Jika lupa password silakan lakukan koordinasi
                </div>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'login',
  data: () => ({
    credential: {
      email: null,
      password: null,
    },
    showPassword: false,
  }),
}
</script>

<style lang="scss" scoped></style>
