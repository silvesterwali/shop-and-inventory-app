<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="suppliers"
      :loading="$fetchState.pending"
      dense
      class="mt-4"
    >
      <template #[`item.address`]="{ item }">
        <div class="d-inline-block text-truncate" style="max-width: 150px">
          {{ item.address }}
        </div>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-menu bottom left>
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list dense>
            <v-list-item dense :to="`/inventory/supplier/edit/${item._id}`">
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>
            <v-list-item dense @click="deleteItemConfirm(item)">
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <template v-if="deleteModal">
      <delete-supplier-modal
        :delete-modal.sync="deleteModal"
        :supplier="selectedItem"
      />
    </template>
  </div>
</template>

<script>
import errorKey from '@/mixins/errorKey.js'
import setMessage from '@/mixins/setMessage.js'
import { getSupplierResources } from '~/services/Supplier.js'
import DeleteSupplierModal from '~/components/Modal/Supplier/DeleteSupplierModal.vue'
export default {
  components: {
    DeleteSupplierModal,
  },
  mixins: [errorKey, setMessage],
  data() {
    return {
      headers: [
        {
          text: 'Name',
          sortable: true,
          align: 'start',
          value: 'name',
        },
        {
          text: 'Phone',
          sortable: true,
          align: 'start',
          value: 'phone',
        },
        {
          text: 'Email',
          sortable: true,
          align: 'start',
          value: 'email',
        },
        {
          text: 'Address',
          sortable: true,
          align: 'start',
          value: 'address',
        },
        {
          text: 'Actions',
          sortable: false,
          align: 'start',
          value: 'actions',
        },
      ],
      suppliers: [],
      deleteModal: false,
      selectedItem: null,
      loading: false,
    }
  },
  async fetch() {
    const { data } = await getSupplierResources()
    this.suppliers = data
  },
  watch: {
    deleteModal: {
      immediate: false,
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
      this.deleteModal = true
    },
  },
}
</script>

<style lang="scss" scoped></style>
