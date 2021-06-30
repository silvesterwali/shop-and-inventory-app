<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="$fetchState.pending"
      dense
      class="mt-4"
      item-key="id"
      fixed-header
    >
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click.prevent="editItem(item)"
          >mdi-pencil</v-icon
        >
        <v-icon small class="mr-2" @click.prevent="deleteItem(item)"
          >mdi-delete</v-icon
        >
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { getBranchResources } from '~/services/Branch.js'
export default {
  data() {
    return {
      headers: [
        {
          text: 'name',
          value: 'name',
        },
        {
          text: 'code',
          value: 'code',
        },
        {
          text: 'phone',
          value: 'phone',
        },
        {
          text: 'address',
          value: 'address',
        },
        {
          text: 'actions',
          value: 'actions',
          sortable: false,
        },
      ],
      items: [],
      selectedItem: null,
      deleteDialog: false,
      editDialog: false,
    }
  },
  async fetch() {
    // use options.itemsPerPage for limit pagination
    // use options.page to skip pagination in backend
    // call the service axios here
    const { data } = await getBranchResources()
    this.items = data
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
      this.$router.push(`/branch/edit/${item._id}`)
    },
  },
}
</script>
<style lang="scss" scoped></style>
