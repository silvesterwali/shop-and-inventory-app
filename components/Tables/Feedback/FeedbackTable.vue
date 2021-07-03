<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items.data"
      :loading="$fetchState.pending"
      dense
      class="mt-4"
      :server-items-length="items.totalRows"
      item-key="id"
      :options.sync="options"
      fixed-header
      :footer-props="footerProps"
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
import { getFeedbackResources } from '~/services/Feedback.js'
export default {
  data() {
    return {
      headers: [
        {
          text: 'title',
          value: 'name',
        },
        {
          text: 'URL',
          value: 'url',
        },
        {
          text: 'Status',
          value: 'Status',
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
      footerProps: {
        'items-per-page-options': [5, 10, 15, 50, 100],
      },
      options: { page: 1, itemsPerPage: 15 },
    }
  },
  async fetch() {
    // use options.itemsPerPage for limit pagination
    // use options.page to skip pagination in backend
    // call the service axios here
    this.deleteDialog = false
    this.selectedItem = null
    const { data } = await getFeedbackResources(
      this.options.itemsPerPage,
      this.options.page
    )
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
      this.selectedItem = item
      this.editDialog = true
    },
  },
}
</script>
<style lang="scss" scoped></style>
