<template>
  <div>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="false">Data User</v-stepper-step>
        <v-divider />
        <v-stepper-step step="2" :complete="false">Personal</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1"></v-stepper-content>
        <v-stepper-content step="2"></v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
    }
  },
}
</script>

<style lang="scss" scoped></style>
