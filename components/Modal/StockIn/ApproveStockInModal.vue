<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card :loading="loading">
        <v-card-title> Are sure want to approve this item ? </v-card-title>
        <v-card-text>
          <p>Serial {{ incomingStock.serialNumber }}</p>
          <p>
            the approval will affected stock of each product in current
            transaction
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error darken-1" text @click.prevent="dialog = false">
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            color="green darken-1"
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
import setMessage from '@/mixins/setMessage.js'
import { updateStockIncreaseResource } from '~/services/StockInTransactionApprove.js'
export default {
  mixins: [setMessage],
  props: {
    dialogApprove: {
      type: Boolean,
      default: null,
    },
    incomingStock: {
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
     * - this method will responsible to send data
     *  to endpoint to approve adn increase
     *  stock in according passing incoming stock
     * @async
     */
    async sendUpdateResouce() {
      try {
        const { data } = await updateStockIncreaseResource(
          this.incomingStock._id
        )
        this.SET_MESSAGE({ text: data.message, color: 'success' })
      } catch (err) {
        this.SET_MESSAGE({ text: err.response.data.message, color: 'error' })
      } finally {
        this.loading = false
        this.dialog = false
        this.$router.push('/inventory/stock-in')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
