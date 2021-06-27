<template>
  <v-list-item two-line>
    <v-list-item-content>
      <v-list-item-title>{{ title }}</v-list-item-title>
      <v-divider />
      <v-list-item-subtitle>{{ subtitle }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped></style>
