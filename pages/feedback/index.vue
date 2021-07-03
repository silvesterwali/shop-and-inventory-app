<template>
  <div>
    <v-container>
      <v-row no-gutters justify="center" align="center" class="my-10">
        <v-col cols="12" md="8" lg="8" class="my-5">
          <CardToolbarPage>
            <template #title>Feedback</template>
            <template #content>
              <v-card-text>
                <FeedbackForm redirect-url="/" />
              </v-card-text>
            </template>
          </CardToolbarPage>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import FeedbackForm from '~/components/Forms/Feedback/FeedbackForm.vue'
import CardToolbarPage from '~/components/CardPage/CardToolbarPage.vue'
export default {
  components: {
    FeedbackForm,
    CardToolbarPage,
  },
  layout: 'feedback',
  auth: false,
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
