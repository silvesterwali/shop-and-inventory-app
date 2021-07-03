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
      <template #[`item.status`]="{ item }">
        <FeedbackChip :status="item.status" />
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-1" @click.prevent="editItem(item)"
          >mdi-pencil</v-icon
        >
        <v-icon small class="mr-1" @click.prevent="detailItem(item)"
          >mdi-eye</v-icon
        >
        <v-icon small class="mr-1" @click.prevent="deleteItem(item)"
          >mdi-delete</v-icon
        >
      </template>
    </v-data-table>
    <template v-if="deleteDialog">
      <DeleteFeedbackModal
        :delete-dialog.sync="deleteDialog"
        :feedback="selectedItem"
      />
    </template>
  </div>
</template>
<script>
import { getFeedbackResources } from '~/services/Feedback.js'
import DeleteFeedbackModal from '~/components/Modal/Feedback/DeleteFeedbackModal.vue'
import FeedbackChip from '~/components/Chip/Feedback/FeedbackChip.vue'
export default {
  components: {
    DeleteFeedbackModal,
    FeedbackChip,
  },
  data() {
    return {
      headers: [
        {
          text: 'title',
          value: 'title',
        },
        {
          text: 'email',
          value: 'email',
        },
        {
          text: 'URL',
          value: 'url',
        },
        {
          text: 'Status',
          value: 'status',
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
  watch: {
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
      this.$router.push(`/development/feedback/edit/${item._id}`)
    },
    detailItem(item) {
      this.$router.push(`/development/feedback/detail/${item._id}`)
    },
  },
}
</script>
<style lang="scss" scoped></style>
