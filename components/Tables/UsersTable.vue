<template>
  <div>
    <v-data-table
      v-model="selected"
      dense
      :loading="$fetchState.pending"
      :items="users.data"
      :headers="headers"
      :server-items-length="users.totalRows"
      item-key="id"
      class="mt-4"
      :options.sync="options"
    >
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
export default {
  data: () => ({
    users: [],
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
        text: 'Verified Email',
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
  }),
  async fetch() {
    const { data } = await getUsers(
      this.options.itemsPerPage,
      this.options.page
    )
    this.users = data
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
