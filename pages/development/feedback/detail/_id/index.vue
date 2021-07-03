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
          <template #title>Feedback Detail</template>
          <template #action>
            <div class="d-flex justify-beteen">
              <FeedbackChip class="mr-1 my-auto" :status="feedback.status" />

              <ToolbarNav
                :add-action="false"
                return-url="/development/feedback"
              />
            </div>
          </template>
          <template #content>
            <v-list>
              <ListTwoLine
                :title="feedback.title"
                subtitle="Title"
              ></ListTwoLine>
              <ListTwoLine
                :title="feedback.email"
                subtitle="Email"
              ></ListTwoLine>
              <ListTwoLine :title="feedback.url" subtitle="URL"></ListTwoLine>
            </v-list>
            <v-card-text>
              {{ feedback.content }}
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
import { getFeedbackResource } from '~/services/Feedback.js'
import ListTwoLine from '~/components/List/ListTwoLine.vue'
import FeedbackChip from '~/components/Chip/Feedback/FeedbackChip.vue'
import ToolbarNav from '~/components/Nav/Toolbar/ToolbarNav.vue'
export default {
  components: {
    // define your component here
    IndexBasePage,
    CardToolbarPage,
    ListTwoLine,
    FeedbackChip,
    ToolbarNav,
  },
  async asyncData({ params }) {
    const { data } = await getFeedbackResource(params.id)
    return {
      feedback: data,
    }
  },
  data() {
    return {
      pageDescription: 'Detail of feedback from client',
    }
  },
  head() {
    // this property for meta tag
    return {
      title: 'Feedback',
      meta: [
        {
          uid: 'description',
          name: 'description',
          content: this.feedback.content,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
