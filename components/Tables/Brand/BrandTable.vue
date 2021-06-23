<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="$fetchState.pending"
      dense
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
            <v-list-item dense :to="`/inventory/brand/edit/${item._id}`">
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>
            <v-list-item dense @click="deleteItem(item)">
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <template v-if="deleteDialog">
      <brand-modal :delete-dialog.sync="deleteDialog" />
    </template>
  </div>
</template>
<script>
import { getBrandResources } from '@/services/Brand.js'
import BrandModal from '@/components/Modal/Brand/BrandModal.vue'
export default {
  components: {
    BrandModal,
  },
  data() {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title',
        },
        {
          text: 'Summary',
          value: 'summary',
        },
        {
          text: 'Content',
          value: 'content',
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
    this.selectedItem = null
    const { data } = await getBrandResources()
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
  },
}
</script>
<style lang="scss" scoped></style>
