<template>
  <div>
    <index-base-page>
      <template #info>
        <v-card>
          <v-card-text>
            {{ pageDescription }}
          </v-card-text>
        </v-card>
      </template>
      <template #content>
        <card-toolbar-page>
          <template #title>Brand's</template>
          <template #action>
            <toolbar-nav
              create-url="/inventory/brand/create"
              return-url="/inventory/brand"
              :add-action="false"
            />
          </template>
          <template #content>
            <v-card-text>
              <brand-form :brand="brand" redirect-url="/inventory/brand" />
            </v-card-text>
          </template>
        </card-toolbar-page>
      </template>
    </index-base-page>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import CardToolbarPage from '@/components/CardPage/CardToolbarPage.vue'
import ToolbarNav from '@/components/Nav/Toolbar/ToolbarNav.vue'
import BrandForm from '@/components/Forms/Brand/BrandForm.vue'
import { getBrandResource } from '@/services/Brand.js'
export default {
  components: {
    // define your component here
    IndexBasePage,
    CardToolbarPage,
    ToolbarNav,
    BrandForm,
  },
  async asyncData({ params }) {
    const { data } = await getBrandResource(params.id)
    return {
      brand: data,
    }
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
