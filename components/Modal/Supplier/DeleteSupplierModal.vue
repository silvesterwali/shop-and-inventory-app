<template>
  <v-dialog v-model="dialog" persistent max-width="300">
    <v-card :loading="loading">
      <v-card-title class="headline"> Are you sure? </v-card-title>
      <v-card-text
        >Will you remove {{ supplier ? supplier.name : '' }}</v-card-text
      >
      <v-card-actions>
        <v-btn color="red darken-1" text @click="dialog = false">
          Disagree
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :loading="loading"
          color="green darken-1"
          text
          @click.prevent="sendDelete"
        >
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { deleteSupplierResource } from '~/services/Supplier.js'
import setMessage from '~/mixins/setMessage.js'
export default {
  mixins: [setMessage],
  props: {
    deleteModal: {
      type: Boolean,
      default: false,
    },
    supplier: {
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
    dialog: {
      get() {
        return this.deleteModal
      },
      set(value) {
        this.$emit('update:deleteModal', value)
      },
    },
  },
  methods: {
    async sendDelete() {
      try {
        this.loading = true
        const { data } = await deleteSupplierResource(this.supplier._id)
        this.SET_MESSAGE({ text: data.message, color: 'success' })
        this.dialog = false
      } catch (err) {
        this.SET_MESSAGE({ text: err.response.data.message, color: 'error' })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
