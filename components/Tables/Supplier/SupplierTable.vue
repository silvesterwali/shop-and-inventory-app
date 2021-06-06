<template>
  <div>
    <index-card-page>
      <template #card-title>Suppliers</template>
      <template #card-subtitle>
        <div>
          <span>All supplier resource</span>
          <v-btn
            color="primary"
            small
            class="mt-n5 float-right"
            to="/inventory/supplier/create"
            >Create new</v-btn
          >
        </div>
      </template>
      <template #card-text>
        <!-- listed  component for page on this slot section -->
        <v-data-table
          :headers="headers"
          :items="suppliers"
          :loading="$fetchState.pending"
          dense
        >
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
      </template>
    </index-card-page>
  </div>
</template>

<script>
import IndexCardPage from '@/components/CardPage/IndexCardPage.vue'
import {
  getSupplierResources,
  deleteSupplierResource,
} from '@/services/supplier.js'
import errorKey from '@/mixins/errorKey.js'
import setMessage from '@/mixins/setMessage.js'
export default {
  components: {
    // register component here
    IndexCardPage,
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
      dialogDelete: null,
      selectedItem: null,
      loading: false,
    }
  },
  async fetch() {
    const { data } = await getSupplierResources()
    this.suppliers = data
  },
  methods: {
    deleteItemConfirm(item) {
      this.selectedItem = item
      this.dialogDelete = true
    },
    async sendDelete() {
      try {
        this.loading = true
        const { data } = await deleteSupplierResource(this.selectedItem._id)
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
