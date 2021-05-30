<template>
  <index-base-page>
    <template #content>
      <user-table />
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
