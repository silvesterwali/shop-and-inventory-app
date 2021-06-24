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
      <card-toolbar-page>
        <template #title>User's</template>
        <template #content>
          <user-table />
        </template>
      </card-toolbar-page>
    </template>
  </index-base-page>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import UserTable from '@/components/Tables/UsersTable.vue'
import CardToolbarPage from '~/components/CardPage/CardToolbarPage.vue'
export default {
  components: {
    IndexBasePage,
    UserTable,
    CardToolbarPage,
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
