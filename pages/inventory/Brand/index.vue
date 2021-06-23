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
            />
          </template>
          <template #content>
            <brand-table />
          </template>
        </card-toolbar-page>
      </template>
    </index-base-page>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import BrandTable from '@/components/Tables/Brand/BrandTable.vue'
import CardToolbarPage from '@/components/CardPage/CardToolbarPage.vue'
import ToolbarNav from '@/components/Nav/Toolbar/ToolbarNav.vue'
export default {
  components: {
    // define your component here
    IndexBasePage,
    BrandTable,
    CardToolbarPage,
    ToolbarNav,
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
