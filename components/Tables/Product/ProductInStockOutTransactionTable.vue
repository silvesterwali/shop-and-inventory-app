<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items.data"
      :loading="$fetchState.pending"
      dense
      class="mt-4"
      :server-items-length="items.totalRows"
      item-key="id"
      :options.sync="options"
      fixed-header
      :footer-props="footerProps"
    >
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click.prevent="editItem(item)"
          >mdi-pencil</v-icon
        >
        <v-icon small class="mr-2" @click.prevent="deleteItem(item)"
          >mdi-delete</v-icon
        >
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { getProductInStockOutTransactions } from '~/services/ProductInStockOutTransactions.js'
export default {
  data() {
    return {
      headers: [
        {
          text: 'Product',
          value: 'product.name',
        },
        {
          text: 'Serial',
          value: 'product.serial',
        },
        {
          text: 'Appear',
          value: 'appear_in_transactions',
        },
        {
          key: 'Qty',
          value: 'qty_in_transactions',
        },
        {
          key: 'Total',
          value: 'total_price_in_transactions',
        },
        {
          text: 'actions',
          value: 'actions',
          sortable: false,
        },
      ],
      items: [],
      selectedItem: null,
      deleteDialog: false,
      editDialog: false,
      footerProps: {
        'items-per-page-options': [5, 10, 15, 50, 100],
      },
      options: { page: 1, itemsPerPage: 50 },
    }
  },
  async fetch() {
    // use options.itemsPerPage for limit pagination
    // use options.page to skip pagination in backend
    // call the service axios here
    const { data } = await getProductInStockOutTransactions(
      this.options.itemsPerPage,
      this.options.page
    )
    this.items = data
  },
  methods: {
    /**
     * deleteItem
     **/
    deleteItem(item) {
      this.selectedItem = item
      this.deleteDialog = true
    },
    /**
     * editItem
     **/
    editItem(item) {
      this.selectedItem = item
      this.editDialog = true
    },
  },
}
</script>
<style lang="scss" scoped></style>
