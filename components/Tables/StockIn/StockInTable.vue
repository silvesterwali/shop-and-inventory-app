<template>
  <div>
    <index-card-page>
      <template #card-title>Stok Masuk</template>
      <template #card-subtitle>
        <div>
          <span> List Stock Masuk </span>

          <v-btn
            small
            class="mt-n5 float-right"
            color="primary"
            to="/inventory/stock-in/create"
            >Stock Masuk Baru</v-btn
          >
        </div>
      </template>
      <template #card-text>
        <v-divider class="mb-2" />

        <v-data-table
          v-model="selected"
          dense
          :loading="$fetchState.pending"
          :items="items.data"
          :headers="headers"
          item-key="id"
          :page.sync="page"
          :items-per-page="limit"
          hide-default-footer
        >
          <template #[`item.status`]="{ item }">
            <stock-in-chip :status="item.status" />
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
                  :to="`/inventory/stock-in/edit/${item._id}`"
                >
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item
                  dense
                  :to="`/inventory/stock-in/details/${item._id}`"
                >
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
      </template>
      <template #card-action>
        <v-spacer></v-spacer>
        <v-pagination
          v-model="page"
          class="my-4"
          :length="items.totalPages"
        ></v-pagination>
        <v-spacer />
      </template>
    </index-card-page>
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
      <approve-stock-in-modal
        :dialog-approve.sync="dialogApprove"
        :incoming-stock="selectedItem"
      />
    </template>
    <template v-if="dialogCancel">
      <cancellation-stock-in-modal
        :dialog-cancel.sync="dialogCancel"
        :incoming-stock="selectedItem"
      />
    </template>
  </div>
</template>

<script>
import IndexCardPage from '@/components/CardPage/IndexCardPage.vue'
import StockInChip from '@/components/Chip/StockIn/StockInChip.vue'
import ApproveStockInModal from '@/components/Modal/StockIn/ApproveStockInModal.vue'
import CancellationStockInModal from '@/components/Modal/StockIn/CancellationStockInModal.vue'
import setMessage from '@/mixins/setMessage.js'
import {
  getIncomingStockResources,
  deleteIncomingStockResource,
} from '~/services/StockInTransaction.js'
export default {
  components: {
    IndexCardPage,
    StockInChip,
    ApproveStockInModal,
    CancellationStockInModal,
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
        value: 'createdBy.email',
      },

      {
        text: 'Supplier',
        value: 'supplier.name',
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
  }),
  async fetch() {
    this.items = []
    const { data } = await getIncomingStockResources(this.limit, this.page)
    if (data) {
      this.items = data
    }
  },
  computed: {
    totalPage() {
      if (this.items.length === 0) {
        return 1
      }

      const currentPage = Math.ceil(this.items.totalRows / this.limit)
      if (currentPage <= 0) {
        return 1
      }

      return isNaN(currentPage) ? 1 : currentPage
    },
  },
  watch: {
    page: {
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
        const { data } = await deleteIncomingStockResource(
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
