<template>
  <div>
    <index-base-page>
      <template #info></template>
      <template #content>
        <index-card-page>
          <template #card-title>Edit product</template>
          <template #card-text>
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
  head() {
    return {
      title: 'update product',
      meta: [
        {
          uid: 'description',
          name: 'description',
          content: 'update product resoruce',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
