<template>
  <div>
    <v-btn
      v-if="!addAction"
      text
      x-small
      title="Back"
      :to="returnUrl"
      depressed
      right
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn
      v-if="addAction"
      depressed
      fab
      x-small
      color="primary"
      :to="createUrl"
      right
    >
      <v-icon>mdi-plus </v-icon>
    </v-btn>
  </div>
</template>

<script>
/**
 * use this only for toolbar
 *
 */
export default {
  props: {
    /**
     * returnUrl
     * - return to specific page
     */
    returnUrl: {
      type: String,
      default: '/',
    },
    /**
     * createUrl
     * - go to specific page
     *
     */
    createUrl: {
      type: String,
      default: '/',
    },
    /**
     * addAction
     * - controll if the page need adding button
     */
    addAction: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
