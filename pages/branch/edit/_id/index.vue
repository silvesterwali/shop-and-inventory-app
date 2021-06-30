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
          <template #title>Create Branch</template>
          <template #action>
            <ToolbarNav :add-action="false" return-url="/branch" />
          </template>
          <template #content>
            <v-card-text>
              <BranchForm :branch="branch" redirect-url="/branch" />
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
import BranchForm from '~/components/Forms/Branch/BranchForm.vue'
import ToolbarNav from '~/components/Nav/Toolbar/ToolbarNav.vue'
import { getBranchResource } from '~/services/Branch.js'
export default {
  components: {
    // define your component here
    IndexBasePage,
    CardToolbarPage,
    BranchForm,
    ToolbarNav,
  },
  async asyncData({ params }) {
    const { data } = await getBranchResource(params.id)
    return {
      branch: data,
    }
  },
  data() {
    return {
      pageTitle: `Edit Branch`,
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
