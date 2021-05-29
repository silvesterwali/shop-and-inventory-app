<template>
  <div>
    <index-card-page>
      <template #card-title>Users Management</template>
      <template #card-subtitle>Contain list of user </template>
      <template #card-text>
        <v-data-table
          v-model="selected"
          dense
          :items="users.data"
          :headers="headers"
          item-key="id"
          :page.sync="page"
          show-select
          :items-per-page="limit"
          hide-default-footer
        >
        </v-data-table>
      </template>
      <template #card-action>
        <v-spacer></v-spacer>
        <v-pagination
          v-model="page"
          class="my-4"
          :length="users.totalRows"
        ></v-pagination>
        <v-spacer />
      </template>
    </index-card-page>
  </div>
</template>

<script>
import IndexCardPage from '@/components/CardPage/IndexCardPage.vue'
import { getUsers } from '@/services/users.js'
export default {
  components: {
    IndexCardPage,
  },
  data: () => ({
    users: [],
    selected: [],
    selectedItem: false,
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
    const { data } = await getUsers(this.limit, this.page)
    this.users = data
  },
  watch: {
    immediate: true,
    handler(valeu, nowValue) {
      if (valeu !== nowValue) {
        if (process.client) {
          this.$fetch()
        }
      }
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
