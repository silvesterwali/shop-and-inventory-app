<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card :loading="loading">
        <v-card-title> Are sure want to approve this item ? </v-card-title>
        <v-card-text>
          <p>Serial {{ stockOutHeader.serialNumber }}</p>
          <p>
            the approval will affected stock of each product in current
            transaction
          </p>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn color="red darken-1" text @click.prevent="dialog = false">
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            color="primary darken-1"
            text
            @click.prevent="sendUpdateResouce"
            >Approve</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { updateStockOutTransactionApproveResource } from '@/services/StockOutTransactionApprove.js'
import setMessage from '@/mixins/setMessage.js'
export default {
  mixins: [setMessage],
  props: {
    dialogApprove: {
      type: Boolean,
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
        this.$emit('update:dialogApprove', value)
      },
      get() {
        return this.dialogApprove
      },
    },
  },
  methods: {
    /**
     * sendUpdateResouce
     * @async
     */
    async sendUpdateResouce() {
      this.loading = true
      try {
        const { data } = await updateStockOutTransactionApproveResource(
          this.stockOutHeader._id
        )
        this.SET_MESSAGE({ text: data.message, color: 'success' })
      } catch (err) {
        this.SET_MESSAGE({ text: err.response.data.message, color: 'error' })
      } finally {
        this.loading = false
        this.dialog = false
        this.$router.push('/inventory/stock-out')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
