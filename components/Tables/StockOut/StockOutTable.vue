<template>
  <div>
    <v-data-table
      v-model="selected"
      dense
      :loading="$fetchState.pending"
      :items="items.data"
      :headers="headers"
      item-key="id"
      fixed-header
      class="mt-4"
      :footer-props="footerProps"
      :options.sync="options"
    >
      <template #[`item.transactionDate`]="{ item }">
        <date-format :date-string="item.transactionDate" />
      </template>
      <template #[`item.status`]="{ item }">
        <stock-out-chip :status="item.status" />
      </template>
      <template #[`item.actions`]="{ item }">
        <v-menu bottom left>
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list dense>
            <v-list-item
              v-if="canModify(item)"
              dense
              :to="`/inventory/stock-out/edit/${item._id}`"
            >
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>
            <v-list-item dense :to="`/inventory/stock-out/details/${item._id}`">
              <v-list-item-title>Detail</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="item.status === 0"
              dense
              @click="approveSection(item)"
            >
              <v-list-item-title>Approve</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="item.status !== 2"
              dense
              @click="cancelStock(item)"
            >
              <v-list-item-title>Cancel</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="canModify(item)"
              dense
              @click="deleteItemConfirm(item)"
            >
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogDelete" persistent max-width="300">
      <v-card :loading="loading">
        <v-card-title class="headline"> Are you sure? </v-card-title>
        <v-card-text
          >Will you remove
          {{ selectedItem ? selectedItem.serialNumber : '' }}</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialogDelete = false">
            Disagree
          </v-btn>
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
    <template v-if="dialogApprove">
      <stock-out-transaction-approve-modal
        :dialog-approve.sync="dialogApprove"
        :stock-out-header="selectedItem"
      />
    </template>
    <template v-if="dialogCancel">
      <stock-out-transaction-cancel-modal
        :dialog-cancel.sync="dialogCancel"
        :stock-out-header="selectedItem"
      />
    </template>
  </div>
</template>

<script>
import DateFormat from '@/components/Formatter/DateFormat.vue'
import StockOutTransactionApproveModal from '@/components/Modal/StockOut/StockOutTransactionApproveModal.vue'
import StockOutTransactionCancelModal from '@/components/Modal/StockOut/StockOutTransactionCancelModal.vue'
import {
  getStockOutTransactionResources,
  deleteStockOutTransactionResource,
} from '@/services/StockOutTransaction.js'
import setMessage from '@/mixins/setMessage.js'
import StockOutChip from '~/components/Chip/StockOut/StockOutChip.vue'
export default {
  components: {
    StockOutChip,
    StockOutTransactionApproveModal,
    StockOutTransactionCancelModal,
    DateFormat,
  },
  mixins: [setMessage],
  data: () => ({
    items: [],
    selected: [],
    selectedItem: null,
    dialogDelete: false,
    dialogApprove: false,
    dialogCancel: false,
    search: '',
    limit: 50,
    page: 1,
    loading: false,
    headers: [
      { text: 'No Serial', value: 'serialNumber', sort: true },
      {
        text: 'Transaction Date',
        value: 'transactionDate',
      },
      {
        text: 'Create By',
        value: 'createdBy.username',
      },

      {
        text: 'Type',
        value: 'type',
      },

      {
        text: 'Status',
        value: 'status',
      },

      {
        text: 'Actions',
        value: 'actions',
        sort: false,
      },
    ],
    options: {
      page: 1,
      itemsPerPage: 15,
    },
    footerProps: {
      'items-per-page-options': [5, 10, 15, 50, 100],
    },
  }),
  async fetch() {
    this.items = []
    const { data } = await getStockOutTransactionResources(
      this.options.itemsPerPage,
      this.options.page
    )
    if (data) {
      this.items = data
    }
  },
  watch: {
    options: {
      immediate: true,
      handler(valeu, nowValue) {
        if (valeu !== nowValue) {
          if (process.client) {
            this.$fetch()
          }
        }
      },
    },
    dialogCancel: {
      immediate: true,
      handler(value) {
        if (value === false && process.client) {
          this.$fetch()
        }
      },
    },
  },
  methods: {
    deleteItemConfirm(item) {
      this.selectedItem = item
      this.dialogDelete = true
    },
    /**
     * approveSection
     *
     * - method to show the approve modal
     *
     */
    approveSection(item) {
      this.selectedItem = item
      this.dialogApprove = true
    },
    cancelStock(item) {
      this.selectedItem = item
      this.dialogCancel = true
    },
    async sendDelete() {
      try {
        this.loading = true
        const { data } = await deleteStockOutTransactionResource(
          this.selectedItem._id
        )
        this.SET_MESSAGE({ text: data.message, color: 'success' })
        this.dialogDelete = false
        this.selectedItem = null
        this.$fetch()
        this.loading = false
      } catch (err) {
        this.loading = false
        this.SET_MESSAGE({ text: err.response.data.message, color: 'error' })
      }
    },
    canModify(item) {
      const cannotModifyArray = [1, 2]
      if (cannotModifyArray.includes(item.status)) {
        return false
      }
      return true
    },
  },
}
</script>

<style lang="scss" scoped></style>
