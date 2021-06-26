<template>
  <v-chip small dark outlined :color="status ? 'green' : 'red'">{{
    status ? 'Yes' : 'No'
  }}</v-chip>
</template>

<script>
export default {
  props: {
    status: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped></style>
