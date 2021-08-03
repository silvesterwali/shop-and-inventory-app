<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="$fetchState.pending"
      dense
      class="mt-4"
      :server-items-length="items.length"
      item-key="serial"
      :options.sync="options"
      :footer-props="footerProps"
    >
      <template #[`item.name`]="{ item }">
        {{ truncateText(item.name, 15) }}
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { getCountProductTransctionInResources } from '~/services/CountProductTransctionIn.js'
import truncateText from '~/mixins/truncateText.js'
export default {
  mixins: [truncateText],
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
          value: 'stock_qty',
        },
        {
          text: 'Qty In Trans...',
          value: 'qty_in_transaction',
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
