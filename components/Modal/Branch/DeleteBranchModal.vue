<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card :loading="loading">
        <v-card-title> Are you sure ? </v-card-title>
        <v-card-text>
          <p>You will remove {{ branch ? branch.name : '' }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :loading="loading"
            color="red darken-1"
            text
            @click="dialog = false"
            >Cancel</v-btn
          >
          <v-spacer />
          <v-btn
            :loading="loading"
            color="green darken-1"
            text
            @click.prevent="sendDelete"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import setMessage from '@/mixins/setMessage.js'
import { deleteBranchResource } from '~/services/Branch.js'
export default {
  mixins: [setMessage],
  props: {
    // control the ***dialog*** with this props
    deleteDialog: {
      type: Boolean,
      default: false,
    },
    branch: {
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
  methods: {
    async sendDelete() {
      this.loading = true
      try {
        const { data } = await deleteBranchResource(this.branch._id)
        this.SET_MESSAGE({ text: data.message, color: 'success' })
      } catch (err) {
        this.SET_MESSAGE({ text: err.response.data.message, color: 'error' })
      } finally {
        this.dialog = false
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
