<template>
  <div>
    <CardToolbarPage>
      <template #title>Item</template>
      <template #action>
        <div>
          <v-btn fab x-small to="/inventory/stock-in" depressed right>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <template v-if="stockHeader.status === 0">
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
        <v-card-text>
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
                  <th v-if="stockHeader.status == 0" class="text-center">
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
                  <td v-if="stockHeader.status == 0">
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
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <template v-if="items.length > 0 && stockHeader.status == 0">
            <v-btn
              color="success"
              outlined
              @click.prevent="dialogApprove = true"
              >Approve</v-btn
            >
          </template>
        </v-card-actions>
      </template>
    </CardToolbarPage>
    <template v-if="openDialog">
      <ProductModal
        v-bind="$props"
        :open-dialog.sync="openDialog"
        :item-stock="selectedItem"
      />
    </template>
    <template v-if="dialogDelete">
      <DeleteStockInModal
        v-bind="$props"
        :dialog-delete.sync="dialogDelete"
        :item-stock="selectedItem"
      />
    </template>
    <template v-if="dialogApprove">
      <ApproveStockInModal
        :dialog-approve.sync="dialogApprove"
        :incoming-stock="stockHeader"
      />
    </template>
  </div>
</template>

<script>
import ProductModal from '@/components/Modal/StockIn/ProductModal.vue'
import DeleteStockInModal from '@/components/Modal/StockIn/DeleteStockInModal.vue'
import ApproveStockInModal from '@/components/Modal/StockIn/ApproveStockInModal.vue'
import { getIncomingStockDetailResources } from '~/services/StockInTransactionDetail.js'
import CardToolbarPage from '~/components/CardPage/CardToolbarPage.vue'
export default {
  components: {
    ProductModal,
    DeleteStockInModal,
    ApproveStockInModal,
    CardToolbarPage,
  },
  props: {
    stockHeader: {
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
    const { data } = await getIncomingStockDetailResources(this.stockHeader._id)
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
