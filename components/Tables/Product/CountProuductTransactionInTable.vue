<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="$fetchState.pending"
      dense
      class="mt-4"
      :server-items-length="items.length"
      item-key="id"
      :options.sync="options"
      fixed-header
      :footer-props="footerProps"
    >
    </v-data-table>
  </div>
</template>
<script>
import { getCountProductTransctionInResources } from '~/services/CountProductTransaction.js'
export default {
  data() {
    return {
      headers: [
        {
          text: 'Serial',
          value: 'serial',
        },
        {
          text: 'Product',
          value: 'name',
        },
        {
          text: 'Stock Qty',
          value: 'stockQty',
        },
        {
          text: 'Qty In Trans...',
          value: 'qtyInTransaction',
        },
      ],
      items: [],
      selectedItem: null,
      deleteDialog: false,
      editDialog: false,
      footerProps: {
        'items-per-page-options': [5, 10, 15, 50, 100],
      },
      options: { page: 1, itemsPerPage: 15 },
    }
  },
  async fetch() {
    const { data } = await getCountProductTransctionInResources()
    this.items = data
    // use options.itemsPerPage for limit pagination
    // use options.page to skip pagination in backend
    // call the service axios here
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
