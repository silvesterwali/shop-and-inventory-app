<template>
  <IndexBasePage>
    <template #info>
      <v-card>
        <v-card-text>
          {{ pageInfo.content }}
        </v-card-text>
      </v-card>
    </template>
    <template #content>
      <CardToolbarPage>
        <template #title>User's</template>
        <template #action>
          <ToolbarNav create-url="/admin/user/create" />
        </template>
        <template #content>
          <UserTable />
        </template>
      </CardToolbarPage>
    </template>
  </IndexBasePage>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import UserTable from '~/components/Tables/User/UsersTable.vue'
import CardToolbarPage from '~/components/CardPage/CardToolbarPage.vue'
import ToolbarNav from '~/components/Nav/Toolbar/ToolbarNav.vue'
export default {
  components: {
    IndexBasePage,
    UserTable,
    CardToolbarPage,
    ToolbarNav,
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
