<template>
  <div>
    <card-toolbar-page>
      <template #title>Items</template>
      <template #action>
        <!-- card subtitle -->

        <div>
          <v-btn fab x-small to="/inventory/stock-out" depressed right>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <template v-if="stockOutHeader.status === 0">
            <v-btn
              v-if="!openDialog"
              fab
              x-small
              color="primary"
              right
              @click.prevent="openDialog = true"
            >
              <v-icon>mdi-plus </v-icon>
            </v-btn>
          </template>
        </div>
      </template>
      <template #content>
        <v-divider />
        <!-- card-text -->
        <v-progress-linear indeterminate height="6" :active="loading" />

        <v-simple-table>
          <template #default>
            <thead>
              <tr>
                <th class="text-left">Product</th>
                <th class="text-left">Qty</th>
                <th class="text-left">Unit</th>
                <th class="text-left">Price</th>
                <th class="text-left">Discount</th>
                <th class="text-left">Total</th>
                <th class="text-left">Description</th>
                <th v-if="stockOutHeader.status == 0" class="text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody v-if="items.length > 0">
              <tr v-for="(item, index) in items" :key="index">
                <td>{{ item.product.name }}</td>
                <td>{{ item.qty }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.discount }}</td>
                <td>{{ item.total }}</td>
                <td>{{ item.description }}</td>
                <td v-if="stockOutHeader.status == 0">
                  <div class="d-flex flex-row">
                    <v-icon
                      small
                      color="primary"
                      @click.prevent="editItem(item)"
                      >mdi-pencil</v-icon
                    >

                    <v-icon
                      small
                      color="error"
                      @click.prevent="deleteItem(item)"
                      >mdi-delete</v-icon
                    >
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
      <template #card-action
        ><!-- card-action -->
        <v-spacer />
        <template v-if="items.length > 0 && stockOutHeader.status == 0">
          <v-btn color="success" outlined @click.prevent="dialogApprove = true"
            >Approve</v-btn
          >
        </template>
      </template>
    </card-toolbar-page>
    <template v-if="openDialog">
      <product-modal
        v-bind="$props"
        :open-dialog.sync="openDialog"
        :item-stock="selectedItem"
      />
    </template>
    <template v-if="dialogDelete">
      <delete-stock-out-modal
        v-bind="$props"
        :dialog-delete.sync="dialogDelete"
        :item-stock="selectedItem"
      />
    </template>
    <template v-if="dialogApprove">
      <stock-out-transaction-approve-modal
        :dialog-approve.sync="dialogApprove"
        :stock-out-header="stockOutHeader"
      />
    </template>
  </div>
</template>

<script>
import ProductModal from '@/components/Modal/StockOut/StockOutProductModal.vue'
import DeleteStockOutModal from '@/components/Modal/StockOut/DeleteStockOutDetailModal.vue'
import StockOutTransactionApproveModal from '@/components/Modal/StockOut/StockOutTransactionApproveModal.vue'
import { getStockOutDetailsTransactionResources } from '~/services/StockOutTransactionDetatil.js'
import CardToolbarPage from '~/components/CardPage/CardToolbarPage.vue'
export default {
  components: {
    // register component here

    ProductModal,
    DeleteStockOutModal,
    StockOutTransactionApproveModal,
    CardToolbarPage,
  },
  props: {
    stockOutHeader: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      items: [],
      openDialog: false,
      dialogDelete: false,
      dialogApprove: false,
      selectedItem: null, // selected item show up on product model. can used for edit the stock in item
    }
  },
  async fetch() {
    this.selectedItem = null
    const { data } = await getStockOutDetailsTransactionResources(
      this.stockOutHeader._id
    )
    this.items = data
  },
  computed: {
    loading() {
      return this.$fetchState.pending
    },
  },
  watch: {
    openDialog: {
      immediate: true,
      handler(value) {
        // wathc the open dialog when it diabled load again the resource
        if (process.client && value === false) {
          this.$fetch()
        }
      },
    },
    dialogDelete: {
      immediate: true,
      // wathc the event from delete dialog
      handler(value) {
        if (process.client && value === false) {
          this.$fetch()
        }
      },
    },
    dialogApprove: {
      immediate: true,
      handler(value) {
        if (process.client && value === false) {
          this.$fetch()
        }
      },
    },
  },
  methods: {
    // method to file edit dialog
    editItem(item) {
      this.selectedItem = item
      this.openDialog = true
    },
    // method to file the delete dialog comfirmation
    deleteItem(item) {
      this.selectedItem = item
      this.dialogDelete = true
    },
  },
}
</script>

<style lang="scss" scoped></style>
