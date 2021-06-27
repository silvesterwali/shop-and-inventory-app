<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card :loading="loading">
        <v-card-title> Are sure want delete this item ? </v-card-title>
        <v-card-subtitle> </v-card-subtitle>
        <v-card-text>
          <p>Product name {{ itemStock.product.name }}</p>
          You cannot undo this actions</v-card-text
        >
        <v-divider />
        <v-card-actions>
          <v-btn
            :loading="loading"
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            color="red darken-1"
            text
            @click.prevent="deleteConfirm"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import setMessage from '@/mixins/setMessage.js'
import { deleteStockOutDetailsTransactionResource } from '~/services/StockOutTransactionDetatil.js'
export default {
  mixins: [setMessage],
  props: {
    dialogDelete: {
      type: Boolean,
      default: false,
    },
    itemStock: {
      type: Object,
      default: null,
    },
    stockOutHeader: {
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
      set(value) {
        this.$emit('update:dialogDelete', value)
      },
      get() {
        return this.dialogDelete
      },
    },
  },
  methods: {
    /**
     * deleteConfirm
     *
     * - method to repsonsible delete specific stock in item
     * @async
     */
    async deleteConfirm() {
      try {
        this.loading = true
        const { data } = await deleteStockOutDetailsTransactionResource(
          this.stockOutHeader._id,
          this.itemStock._id
        )
        this.SET_MESSAGE({ text: data.message, color: 'success' })
      } catch (err) {
        this.SET_MESSAGE({ text: err.response.data.message, color: 'error' })
      } finally {
        this.loading = false
        this.dialog = false
      }
    },
  },
}
</script>
