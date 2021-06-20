<template>
  <index-base-page>
    <template #info>
      <v-card>
        <v-card-text>
          {{ pageInfo.content }}
        </v-card-text>
      </v-card>
    </template>
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
  data() {
    return {
      pageInfo: {
        content: 'User management page and list all user',
      },
    }
  },
  head() {
    return {
      title: 'User Management',
      meta: [
        {
          uid: 'description',
          name: 'description',
          content: this.pageInfo.content,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
