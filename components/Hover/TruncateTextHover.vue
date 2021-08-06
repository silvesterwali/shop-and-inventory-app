<template>
  <div @mouseover="show = true" @mouseleave="show = false">
    <span v-if="show">
      {{ textString }}
    </span>
    <span v-else>
      {{ truncateText(textString, length) }}
    </span>
  </div>
</template>

<script>
import truncateText from '~/mixins/truncateText'
export default {
  mixins: [truncateText],
  props: {
    textString: {
      type: String,
      default: '',
    },
    /**
     * length of truncate of default truncate text
     *
     */
    length: {
      type: Number,
      default: 15,
    },
  },
  data() {
    return {
      show: false,
    }
  },
}
</script>

<style lang="scss" scoped></style>
