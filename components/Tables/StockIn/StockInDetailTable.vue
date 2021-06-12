<template>
  <div>
    <index-card-page>
      <template #card-title>Items</template>
      <template #card-subtitle>
        <!-- card subtitle -->
        <div>
          <span>List Of Item </span>

          <v-btn
            v-if="!openDialog"
            color="primary"
            small
            class="mt-n5 float-right"
            @click.prevent="openDialog = true"
            >Add Item</v-btn
          >
          <v-btn
            color="error"
            small
            class="mt-n5 float-right mr-2"
            to="/inventory/stock-in"
            >Back</v-btn
          >
        </div>
      </template>
      <template #card-text>
        <v-divider />
        <!-- card-text -->

        <v-simple-table>
          <template #default>
            <thead>
              <tr>
                <th class="text-left">Product</th>
                <th class="text-left">Qty</th>
                <th class="text-left">Unit</th>
                <th class="text-left">Price</th>
                <th class="text-left">Discount</th>
                <th class="text-left">Description</th>
                <th class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.name">
                <td>{{ item.productId }}</td>
                <td>{{ item.qty }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.discount }}</td>
                <td>{{ item.description }}</td>
                <td>
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
      <template #card-action><!-- card-action --></template>
    </index-card-page>
    <template v-if="openDialog">
      <product-modal
        v-bind="$props"
        :open-dialog.sync="openDialog"
        :item-stock="selectedItem"
      />
    </template>
    <template v-if="dialogDelete">
      <delete-stock-in-modal
        v-bind="$props"
        :dialog-delete.sync="dialogDelete"
        :item-stock="selectedItem"
      />
    </template>
  </div>
</template>

<script>
import IndexCardPage from '@/components/CardPage/IndexCardPage.vue'
import { getIncomingStockDetailResources } from '@/services/IncomingStockDetail.js'
import ProductModal from '@/components/Modal/StockIn/ProductModal.vue'
import DeleteStockInModal from '@/components/Modal/StockIn/DeleteStockInModal.vue'
export default {
  components: {
    // register component here
    IndexCardPage,
    ProductModal,
    DeleteStockInModal,
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
      selectedItem: null, // selected item show up on product model. can used for edit the stock in item
    }
  },
  async fetch() {
    this.selectedItem = null
    const { data } = await getIncomingStockDetailResources(this.stockHeader._id)
    this.items = data
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
