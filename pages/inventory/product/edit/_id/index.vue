<template>
  <div>
    <IndexBasePage>
      <template #info>
        <v-card>
          <v-card-text>{{ pageDescription }}</v-card-text>
        </v-card>
      </template>
      <template #content>
        <CardToolbarPage>
          <template #title>Edit Product</template>
          <template #action>
            <ToolbalNav return-url="/inventory/product" :add-action="false" />
          </template>
          <template #content>
            <v-card-text>
              <ProductFrom
                :product="product"
                redirect-url="/inventory/product"
              />
            </v-card-text>
          </template>
        </CardToolbarPage>
      </template>
    </IndexBasePage>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import ProductFrom from '@/components/Forms/Product/ProductForm.vue'
import CardToolbarPage from '~/components/CardPage/CardToolbarPage.vue'
import { getProduct } from '~/services/Product.js'
import ToolbalNav from '~/components/Nav/Toolbar/ToolbarNav.vue'
export default {
  components: {
    IndexBasePage,
    ProductFrom,
    CardToolbarPage,
    ToolbalNav,
  },
  async asyncData({ params }) {
    const { data } = await getProduct(params.id)
    return {
      product: data,
    }
  },
  data() {
    return {
      pageDescription: 'page for update specific product resoruce',
    }
  },
  head() {
    return {
      title: 'update product',
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
