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
          <template #title>Create prodcut</template>
          <template #action>
            <toolbar-nav :add-action="false" return-url="/inventory/product" />
          </template>
          <template #content>
            <v-card-text>
              <product-from redirect-url="/inventory/product" />
            </v-card-text>
          </template>
        </card-toolbar-page>
      </template>
    </index-base-page>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import ProductFrom from '@/components/Forms/Product/ProductForm.vue'
import CardToolbarPage from '~/components/CardPage/CardToolbarPage.vue'
import ToolbarNav from '~/components/Nav/Toolbar/ToolbarNav.vue'
export default {
  components: {
    IndexBasePage,
    ProductFrom,
    CardToolbarPage,
    ToolbarNav,
  },
  data() {
    return {
      pageDescription: 'page for create new product resouce',
    }
  },
  head() {
    return {
      title: 'create product',
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
