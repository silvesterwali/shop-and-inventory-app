<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card :loading="loading">
        <v-card-title> Are sure want to cancel ? </v-card-title>
        <v-card-text>
          <p>Serial {{ stockOutHeader.serialNumber }}</p>
          <p>All item in this transaction will be cancel also</p>
          <v-form ref="form" @submit.prevent="sendUpdateResouce">
            <v-textarea
              v-model="dataForm.cancelNote"
              rows="2"
              label="Cancel Note"
              :rules="[(v) => !!v || 'require']"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error darken-1" text @click.prevent="dialog = false">
            Close
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            color="primary darken-1"
            text
            @click.prevent="sendUpdateResouce"
            >Send Cancellation</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { updateStockOutTransactionCancelResource } from '@/services/StockOutTransactionCancel.js'
import setMessage from '@/mixins/setMessage.js'
export default {
  mixins: [setMessage],
  props: {
    dialogCancel: {
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
      dataForm: {
        cancelNote: null,
      },
    }
  },
  computed: {
    dialog: {
      set(value) {
        this.$emit('update:dialogCancel', value)
      },
      get() {
        return this.dialogCancel
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
      if (!this.$refs.form.validate) {
        return false
      }
      this.loading = true
      try {
        const { data } = await updateStockOutTransactionCancelResource(
          this.stockOutHeader._id,
          this.dataForm
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
