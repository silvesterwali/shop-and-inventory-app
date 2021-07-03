<template>
  <v-footer absolute app padless inset color="grey lighten-2">
    <v-row no-gutters justify="center" align="center">
      <v-col lg="8" md="8" sm="12">
        <v-card flat tile class="text-center" color="grey lighten-2">
          <v-card-text>
            <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>

          <v-card-text>
            this site is under development, please provide some feedback to
            improve this site
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="">
            {{ new Date().getFullYear() }} —
            <strong>silvesterwalidev@gmail.com</strong>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
  }),
}
</script>

<style lang="scss" scoped></style>
