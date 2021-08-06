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
        <TruncateTextHover :text-string="item.name" />
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { getCountProductTransctionInResources } from '~/services/CountProductTransctionIn.js'
import TruncateTextHover from '~/components/Hover/TruncateTextHover.vue'
export default {
  components: {
    TruncateTextHover,
  },
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
}
</script>
<style lang="scss" scoped></style>
