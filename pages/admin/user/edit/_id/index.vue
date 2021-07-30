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
          <ToolbarNav :add-action="false" return-url="/admin/user" />
        </template>
        <template #content>
          <v-card-text>
            <UserStepper :current-user="user" />
          </v-card-text>
        </template>
      </CardToolbarPage>
    </template>
  </IndexBasePage>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import CardToolbarPage from '~/components/CardPage/CardToolbarPage.vue'
import ToolbarNav from '~/components/Nav/Toolbar/ToolbarNav.vue'
import UserStepper from '~/components/Stepper/User/UserStepper.vue'
import { getUserDetail } from '~/services/Users.js'
export default {
  components: {
    IndexBasePage,
    CardToolbarPage,
    ToolbarNav,
    UserStepper,
  },
  async asyncData({ params }) {
    const { data } = await getUserDetail(params.id)
    return { user: data }
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
