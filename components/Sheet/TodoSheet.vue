<template>
  <v-sheet elevation="1" class="mb-1 pa-2">
    {{ todo.description }}
  </v-sheet>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped></style>
