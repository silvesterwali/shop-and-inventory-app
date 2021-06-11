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
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
      <template #card-action><!-- card-action --></template>
    </index-card-page>
    <product-modal :open-dialog.sync="openDialog" />
  </div>
</template>

<script>
import IndexCardPage from '@/components/CardPage/IndexCardPage.vue'
import { getIncomingStockDetailResources } from '@/services/IncomingStockDetail.js'
import ProductModal from '@/components/Modal/StockIn/ProductModal.vue'
export default {
  components: {
    // register component here
    IndexCardPage,
    ProductModal,
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
    }
  },
  async fetch() {
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
  },
}
</script>

<style lang="scss" scoped></style>
