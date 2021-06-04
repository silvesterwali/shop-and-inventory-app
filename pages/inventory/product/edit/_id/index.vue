<template>
  <div>
    <index-base-page>
      <template #info>
        <v-card>
          <v-card-text>{{ pageDescription }}</v-card-text>
        </v-card>
      </template>
      <template #content>
        <index-card-page>
          <template #card-title>Edit product</template>
          <template #card-subtitle>
            <div>
              <v-btn
                small
                class="mt-n5 float-right"
                color="primary"
                to="/inventory/product"
                >Back</v-btn
              >
            </div>
          </template>
          <template #card-text>
            <product-from
              :product="product"
              redirect-url="/inventory/product"
            />
          </template>
        </index-card-page>
      </template>
    </index-base-page>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import IndexCardPage from '@/components/CardPage/IndexCardPage.vue'
import ProductFrom from '@/components/Forms/Product/ProductForm.vue'
import { getProduct } from '@/services/product.js'
export default {
  components: {
    IndexBasePage,
    IndexCardPage,
    ProductFrom,
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
