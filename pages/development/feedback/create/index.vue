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
          <template #title>Create Feedback</template>
          <template #action>
            <ToolbalNav
              :add-action="false"
              return-url="/development/feedback"
            />
          </template>
          <template #content>
            <v-card-text>
              <FeedbackForm redirect-url="/development/feedback" />
            </v-card-text>
          </template>
        </CardToolbarPage>
      </template>
    </IndexBasePage>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import CardToolbarPage from '~/components/CardPage/CardToolbarPage.vue'
import FeedbackForm from '~/components/Forms/Feedback/FeedbackForm.vue'
import ToolbalNav from '~/components/Nav/Toolbar/ToolbarNav.vue'
export default {
  components: {
    // define your component here
    IndexBasePage,
    CardToolbarPage,
    FeedbackForm,
    ToolbalNav,
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
