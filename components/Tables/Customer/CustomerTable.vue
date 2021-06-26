<template>
  <div>
    <v-data-table
      v-model="selected"
      dense
      :loading="$fetchState.pending"
      :items="items"
      :headers="headers"
      item-key="id"
      fixed-header
      :footer-props="footerProps"
      class="mt-4"
    >
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

    <template v-if="dialogDelete">
      <customer-delete-modal
        :dialog-delete.sync="dialogDelete"
        :item="selectedItem"
      />
    </template>
  </div>
</template>

<script>
import setMessage from '@/mixins/setMessage.js'
import { getCustomerResources } from '~/services/Customer.js'
import CustomerDeleteModal from '~/components/Modal/Customer/CustomerDeleteModal.vue'
export default {
  components: {
    CustomerDeleteModal,
  },
  mixins: [setMessage],
  data: () => ({
    items: [],
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
        text: 'Fullname',
        value: 'fullName',
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
        text: 'address',
        value: 'address',
      },

      {
        text: 'Actions',
        value: 'actions',
        sort: false,
      },
    ],
    footerProps: {
      'items-per-page-options': [5, 10, 15, 100],
    },
  }),
  async fetch() {
    this.items = []
    const { data } = await getCustomerResources(this.limit, this.page)
    if (data) {
      this.items = data
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
    dialogDelete: {
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
      this.dialogDelete = true
    },
  },
}
</script>

<style lang="scss" scoped></style>
