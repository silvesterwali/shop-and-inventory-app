<template>
  <div>
    <base-page>
      <template #info>
        <v-card>
          <v-card-text>
            This page contain user infomation icluding personal data
          </v-card-text>
        </v-card>
      </template>
      <template #content>
        <user-detail-page :user-id="userId" />
      </template>
    </base-page>
  </div>
</template>

<script>
import BasePage from '@/components/BasePage/IndexBasePage.vue'
import UserDetailPage from '@/components/Page/UserDetailPage.vue'
export default {
  components: {
    BasePage,
    UserDetailPage,
  },
  head() {
    return {
      title: 'User Details',
      meta: [
        {
          uid: 'description',
          name: 'description',
          content: 'show user detail for admin page',
        },
      ],
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    },
  },
}
</script>

<style lang="scss" scoped></style>
