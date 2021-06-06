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
        <index-card-page>
          <template #card-title>Create new product</template>
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
            <v-divider class="mb-2" />
            <product-from redirect-url="/inventory/product" />
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
export default {
  components: {
    IndexBasePage,
    IndexCardPage,
    ProductFrom,
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
