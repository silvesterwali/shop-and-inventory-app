<template>
  <index-base-page>
    <template #content>
      <v-card>
        <v-card-title>Users Management</v-card-title>
        <v-card-subtitle>Contain list of user</v-card-subtitle>
        <v-card-text>
          <user-table />
        </v-card-text>
      </v-card>
    </template>
  </index-base-page>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import UserTable from '@/components/Tables/UsersTable.vue'
export default {
  components: {
    IndexBasePage,
    UserTable,
  },
  head() {
    return {
      title: 'User Management',
      meta: [
        {
          uid: 'description',
          name: 'description',
          content: 'User management page and list all user',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
