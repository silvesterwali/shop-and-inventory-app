<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card :loading="loading">
        <v-card-title> Are you sure ? </v-card-title>
        <v-card-text>
          <p>You will delete {{ item ? item.title : '' }}</p>
          <p>You cannot undo this action if you press Yes</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="dialog = false">No</v-btn>
          <v-spacer />
          <v-btn color="green darken-1" text>Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import setMessage from '@/mixins/setMessage.js'
export default {
  mixins: [setMessage],
  props: {
    // control the ***dialog*** with this props
    deleteDialog: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    // make sure  that ***deleteDialog*** is using ***sync*** props
    dialog: {
      set(value) {
        this.$emit('update:deleteDialog', value)
      },
      get() {
        return this.deleteDialog
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
