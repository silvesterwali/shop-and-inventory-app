<template>
  <div>
    <v-data-table
      v-model="selected"
      dense
      :loading="$fetchState.pending"
      :items="items.data"
      :headers="headers"
      item-key="id"
      :server-items-length="items.totalRows"
      class="mt-4"
      :options.sync="options"
      fixed-header
      :footer-props="footerProps"
    >
      <template #[`item.actions`]="{ item }">
        <v-menu bottom left>
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list dense>
            <v-list-item dense :to="`/inventory/product/edit/${item._id}`">
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>
            <v-list-item dense @click="deleteItemConfirm(item)">
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>

    <template v-if="deleteDialog">
      <delete-product-modal
        :delete-dialog.sync="deleteDialog"
        :product="selectedItem"
      />
    </template>
  </div>
</template>

<script>
import setMessage from '@/mixins/setMessage.js'
import { getProducts } from '~/services/Product.js'
import DeleteProductModal from '~/components/Modal/Product/DeleteProductModal.vue'
export default {
  components: {
    DeleteProductModal,
  },
  mixins: [setMessage],
  data: () => ({
    items: [],
    selected: [],
    selectedItem: null,
    deleteDialog: false,
    search: '',
    loading: false,
    headers: [
      { text: 'Serial', value: 'serial', sort: true },
      {
        text: 'Name',
        value: 'name',
      },
      {
        text: 'Wholesale',
        value: 'wholeSale',
      },
      {
        text: 'Retail Price',
        value: 'retailPrice',
      },
      {
        text: 'Stock Qty',
        value: 'stockQty',
      },
      {
        text: 'Actions',
        value: 'actions',
        sort: false,
      },
    ],
    options: {
      page: 1,
      itemsPerPage: 15,
    },
    footerProps: {
      'items-per-page-options': [5, 10, 15, 50, 100],
    },
  }),
  async fetch() {
    this.items = []
    this.selectedItem = null
    const { data } = await getProducts(
      this.options.itemsPerPage,
      this.options.page
    )
    if (data) {
      this.items = data
    }
  },
  watch: {
    options: {
      handler() {
        if (process.client) {
          this.$fetch()
        }
      },
    },
    deleteDialog: {
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
      this.deleteDialog = true
    },
  },
}
</script>

<style lang="scss" scoped></style>
