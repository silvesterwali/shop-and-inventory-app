<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card :loading="loading">
        <v-card-title> Are you sure ? </v-card-title>
        <v-card-text>lorem inpusm dolor</v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" text>No</v-btn>
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
    dialogProps: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    // make sure  that ***dialogProps*** is using ***sync*** props
    dialog: {
      set(value) {
        this.emit('update:dialogProps', value)
      },
      get() {
        return this.dialogProps
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
