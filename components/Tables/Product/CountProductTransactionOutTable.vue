<template>
  <div>
    {{ params.start_date ? ' Start Date ' + params.start_date : '' }}
    {{ params.end_date ? ' - End Date ' + params.end_date : '' }}
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
        <TruncateTextHover :length="10" :text-string="item.name" />
      </template>
    </v-data-table>
    <template v-if="dialogFilter">
      <FilterProductInTransactionModal
        v-model="params"
        :dialog-filter.sync="dialogFilter"
        @reload="$fetch"
      />
    </template>
  </div>
</template>
<script>
import { getCountProductTransactionOutResources } from '~/services/CountProductTransactionOut.js'
import TruncateTextHover from '~/components/Hover/TruncateTextHover.vue'
import FilterProductInTransactionModal from '~/components/Modal/Product/FilterProductInTransactionModal.vue'
export default {
  components: {
    TruncateTextHover,
    FilterProductInTransactionModal,
  },
  props: {
    filter: {
      type: Boolean,
      default: false,
    },
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
          text: 'Stock',
          value: 'qty_stock',
        },
        {
          text: 'Qty',
          value: 'qty_in_transaction',
        },
        {
          text: 'Total',
          value: 'total',
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
      params: {
        start_date: null,
        end_date: null,
      },
    }
  },
  async fetch() {
    const { data } = await getCountProductTransactionOutResources(this.params)
    this.items = data
    this.dialogFilter = false
    // use options.itemsPerPage for limit pagination
    // use options.page to skip pagination in backend
    // call the service axios here
  },
  computed: {
    /**
     * modify the filter props
     */
    dialogFilter: {
      set(value) {
        this.$emit('update:filter', value)
      },
      get() {
        return this.filter
      },
    },
  },
}
</script>
<style lang="scss" scoped></style>
