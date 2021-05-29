<template>
  <v-card min-height="350" :loading="loading">
    <v-card-title> <slot name="card-title"></slot></v-card-title>
    <v-card-subtitle><slot name="card-subtitle"></slot></v-card-subtitle>
    <v-card-text>
      <slot name="card-text"></slot>
    </v-card-text>
    <v-card-actions>
      <slot name="card-action"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    }
  },
}
</script>

<style lang="scss" scoped></style>
