<template>
  <div>
    <v-chip x-small dark :color="chip.color">{{ chip.text }}</v-chip>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: 'Request',
    },
  },
  computed: {
    chip() {
      switch (this.status) {
        case 'Pending':
          return {
            color: 'yellow lighten-2',
            text: this.status,
          }
        case 'In Progress':
          return {
            color: 'light-green accent-4',
            text: this.status,
          }
        case 'Cancelled':
          return {
            color: 'red accent-4',
            text: this.status,
          }
        case 'Done':
          return {
            color: 'green accent-3',
            text: this.status,
          }
      }
      return {
        color: 'teal lighten-4',
        text: this.status,
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
