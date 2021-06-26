<template>
  <div>
    <v-data-table
      v-model="selected"
      dense
      :loading="$fetchState.pending"
      :items="items.data"
      :headers="headers"
      :server-items-length="items.totalRows"
      item-key="id"
      class="mt-4"
      :options.sync="options"
      fixed-header
      :footer-props="footerProps"
    >
      <template #[`item.verifiedEmail`]="{ item }">
        <user-chip :status="item.verifiedEmail" />
      </template>
      <template #[`item.actions`]="{ item }">
        <v-menu bottom left>
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list dense>
            <v-list-item dense :to="`/admin/users/details/${item._id}`">
              <v-list-item-title>Details</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { getUsers } from '~/services/Users.js'
import UserChip from '~/components/Chip/User/UserChip.vue'
export default {
  components: {
    UserChip,
  },
  data: () => ({
    items: [],
    selected: [],
    selectedItem: false,
    options: {
      page: 1,
      itemsPerPage: 15,
    },
    search: '',
    limit: 50,
    page: 1,
    headers: [
      { text: 'Email', value: 'email', sort: true },
      {
        text: 'Rules',
        value: 'rules',
      },
      {
        text: 'Verified',
        value: 'verifiedEmail',
      },
      {
        text: 'Join Date',
        value: 'created_at',
      },
      {
        text: 'Actions',
        value: 'actions',
      },
    ],
    footerProps: {
      'items-per-page-options': [5, 10, 15, 50, 100],
    },
  }),
  async fetch() {
    const { data } = await getUsers(
      this.options.itemsPerPage,
      this.options.page
    )
    this.items = data
  },
  watch: {
    options: {
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
    deleteItem(item) {
      alert(item.title)
    },
    selectItem(item) {
      this.selectedItem = item
    },
    unSelectItem(item) {
      this.selectedItem = false
    },
    sliceText(text) {
      return text.slice(0, 20) + '...'
    },
  },
}
</script>

<style lang="scss" scoped></style>
