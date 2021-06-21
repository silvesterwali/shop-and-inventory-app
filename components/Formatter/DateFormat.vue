<template>
  <span>{{ date }}</span>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    dateString: {
      type: String,
      default: null,
    },
  },
  computed: {
    date() {
      if (this.dateString === null) {
        return moment().format('YYYY-MM-DD')
      }
      return moment(this.dateString).format('YYYY-MM-DD')
    },
  },
}
</script>

<style lang="scss" scoped></style>
