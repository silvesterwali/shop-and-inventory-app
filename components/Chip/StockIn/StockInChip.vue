<template>
  <div>
    <v-chip x-small :color="chip.color">{{ chip.text }}</v-chip>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: [String, Number],
      default: 0,
    },
  },
  computed: {
    chip() {
      const status = parseInt(this.status)
      if (status === 1) {
        return {
          text: 'approved',
          color: 'success',
        }
      } else if (status === 2) {
        return {
          text: 'Cancel',
          color: 'error',
        }
      }
      return {
        text: 'User Pending',
        color: 'yellow',
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
