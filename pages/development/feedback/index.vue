<template>
  <div>
    <IndexBasePage>
      <template #info>
        <v-card>
          <v-card-text>
            {{ pageDescription }}
          </v-card-text>
        </v-card>
      </template>
      <template #content>
        <!-- page page will be here -->
        <CardToolbarPage>
          <template #title>Feeback's</template>
          <template #action>
            <ToobarNav create-url="/development/feedback/create" />
          </template>
          <template #content>
            <FeedbackTable />
          </template>
        </CardToolbarPage>
      </template>
    </IndexBasePage>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import CardToolbarPage from '~/components/CardPage/CardToolbarPage.vue'
import ToobarNav from '~/components/Nav/Toolbar/ToolbarNav.vue'
import FeedbackTable from '~/components/Tables/Feedback/FeedbackTable.vue'
export default {
  components: {
    // define your component here
    IndexBasePage,
    FeedbackTable,
    CardToolbarPage,
    ToobarNav,
  },
  data() {
    return {
      pageTitle: `Page-index`,
      pageDescription:
        'this page is under develop, please provide some feedback to improve it for better documentation',
    }
  },
  head() {
    // this property for meta tag
    return {
      title: this.pageTitle,
      meta: [
        {
          uid: 'description',
          name: 'description',
          content: this.pageDescription,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
