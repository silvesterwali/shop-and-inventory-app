<template>
  <div>
    <index-card-page>
      <template #card-title>Customer</template>
      <template #card-subtitle>
        <div>
          <span>Customer management </span>

          <v-btn
            small
            class="mt-n5 float-right"
            color="primary"
            to="/inventory/customer/create"
            >Add new Customer</v-btn
          >
        </div>
      </template>
      <template #card-text>
        <v-divider class="mb-2" />
        <v-data-table
          v-model="selected"
          dense
          :loading="$fetchState.pending"
          :items="products.data"
          :headers="headers"
          item-key="id"
          :page.sync="page"
          :items-per-page="limit"
          hide-default-footer
        >
          <template #top>
            <v-toolbar flat dense>
              <div>page {{ page }} of {{ products.totalRows }} rows</div>
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
                <v-list-item dense :to="`/inventory/customer/edit/${item._id}`">
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item dense @click="deleteItemConfirm(item)">
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </template>
      <template #card-action>
        <v-spacer></v-spacer>
        <v-pagination
          v-model="page"
          class="my-4"
          :length="products.totalPages"
        ></v-pagination>
        <v-spacer />
      </template>
    </index-card-page>
  </div>
</template>

<script>
import IndexCardPage from '@/components/CardPage/IndexCardPage.vue'
import setMessage from '@/mixins/setMessage.js'
import { getCustomerResources } from '~/services/Customer.js'
export default {
  components: {
    IndexCardPage,
  },
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
      { text: 'Serial Numberd', value: 'serialNumber', sort: true },
      {
        text: 'FullName',
        value: 'fullname',
      },
      {
        text: 'Email',
        value: 'email',
      },
      {
        text: 'Phone',
        value: 'phone',
      },
      {
        text: 'Phone Alternate',
        value: 'phoneAlternate',
      },
      {
        text: 'address',
        value: 'address',
      },
      {
        text: 'Address Alternate',
        value: 'addressAlternate',
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
    const { data } = await getCustomerResources(this.limit, this.page)
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
  },
}
</script>

<style lang="scss" scoped></style>
