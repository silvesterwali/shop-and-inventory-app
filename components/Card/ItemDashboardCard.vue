<template>
  <v-card class="p-0">
    <div class="d-flex flex-no-wrap justify-space-arround">
      <v-avatar color="yellow lighten-3" tile size="64" class="mx-1 my-auto">
        <v-icon color="red" aria-hidden="false" x-large>{{ icon }}</v-icon>
      </v-avatar>
      <div>
        <v-card-title class="text-h5"> {{ cardTitle }} </v-card-title>
        <v-card-subtitle>{{ cardSubTitle }}</v-card-subtitle>
      </div>
    </div>
    <v-divider />
    <v-card-actions>
      <v-btn text small :to="url">{{ btnText }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: 'url',
    },
    btnText: {
      type: String,
      default: 'Go Somewhere',
    },
    cardTitle: {
      type: [String, Number],
      default: 'Card title',
    },
    cardSubTitle: {
      type: String,
      default: 'Card title',
    },
    icon: {
      type: String,
      default: 'mdi-cube-outline',
    },
  },
}
</script>

<style lang="scss" scoped></style>
