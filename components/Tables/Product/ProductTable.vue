<template>
  <div>
    <v-data-table
      v-model="selected"
      dense
      :loading="$fetchState.pending"
      :items="products.data"
      :headers="headers"
      item-key="id"
      :page.sync="page"
      :items-per-page="limit"
      class="mt-2"
      hide-default-footer
    >
      <template #top>
        <v-toolbar flat dense>
          <div style="font-size: 11px">
            page {{ page }} of {{ products.totalRows }} rows
          </div>
          <v-spacer />
        </v-toolbar>
      </template>
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

    <v-spacer></v-spacer>
    <v-pagination
      v-model="page"
      class="my-4"
      :length="products.totalPages"
    ></v-pagination>
    <v-spacer />

    <v-dialog v-model="dialogDelete" persistent max-width="300">
      <v-card :loading="loading">
        <v-card-title class="headline"> Are you sure? </v-card-title>
        <v-card-text
          >Will you remove
          {{ selectedItem ? selectedItem.name : '' }}</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialogDelete = false">
            Disagree
          </v-btn>
          <v-btn
            :loading="loading"
            color="green darken-1"
            text
            @click.prevent="sendDelete"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import setMessage from '@/mixins/setMessage.js'
import { getProducts, deleteProduct } from '~/services/Product.js'
export default {
  mixins: [setMessage],
  data: () => ({
    products: [],
    selected: [],
    selectedItem: null,
    dialogDelete: false,
    search: '',
    limit: 50,
    page: 1,
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
  }),
  async fetch() {
    this.products = []
    const { data } = await getProducts(this.limit, this.page)
    if (data) {
      this.products = data
    }
  },
  watch: {
    page: {
      immediate: true,
      handler(valeu, nowValue) {
        if (valeu !== nowValue) {
          if (process.client) {
            this.$fetch()
          }
        }
      },
    },
  },
  methods: {
    deleteItemConfirm(item) {
      this.selectedItem = item
      this.dialogDelete = true
    },
    async sendDelete() {
      try {
        this.loading = true
        const { data } = await deleteProduct(this.selectedItem._id)
        this.SET_MESSAGE({ text: data.message, color: 'success' })
        this.dialogDelete = false
        this.selectedItem = null
        this.$fetch()
        this.loading = false
      } catch (err) {
        this.loading = false
        this.SET_MESSAGE({ text: err.response.data.message, color: 'error' })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
