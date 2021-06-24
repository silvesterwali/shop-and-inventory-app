<template>
  <div>
    <index-base-page>
      <template #info>
        <v-card class="mb-1">
          <v-card-text>
            {{ pageDescription }}
          </v-card-text>
        </v-card>
      </template>
      <template #content>
        <card-toolbar-page>
          <template #title>Product's</template>
          <template #action>
            <toolbar-nav create-url="/inventory/product/create" />
          </template>
          <template #content>
            <product-table />
          </template>
        </card-toolbar-page>
      </template>
    </index-base-page>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import ProductTable from '@/components/Tables/Product/ProductTable.vue'
import CardToolbarPage from '~/components/CardPage/CardToolbarPage.vue'
import ToolbarNav from '~/components/Nav/Toolbar/ToolbarNav.vue'
export default {
  components: {
    IndexBasePage,
    ProductTable,
    CardToolbarPage,
    ToolbarNav,
  },
  data() {
    return {
      pageDescription:
        'All product is listed on this page. create, update and delete them form this page',
    }
  },
  head() {
    return {
      title: 'List of product',
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
