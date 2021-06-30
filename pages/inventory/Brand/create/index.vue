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
        <CardToolbarPage>
          <template #title>Create new brand</template>
          <template #action>
            <ToolbarNav
              create-url="/inventory/brand/create"
              return-url="/inventory/brand"
              :add-action="false"
            />
          </template>
          <template #content>
            <v-card-text>
              <BrandForm redirect-url="/inventory/brand" />
            </v-card-text>
          </template>
        </CardToolbarPage>
      </template>
    </IndexBasePage>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import CardToolbarPage from '@/components/CardPage/CardToolbarPage.vue'
import ToolbarNav from '@/components/Nav/Toolbar/ToolbarNav.vue'
import BrandForm from '@/components/Forms/Brand/BrandForm.vue'
export default {
  components: {
    // define your component here
    IndexBasePage,
    CardToolbarPage,
    ToolbarNav,
    BrandForm,
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
