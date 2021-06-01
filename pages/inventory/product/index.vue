<template>
  <div>
    <index-base-page>
      <template #content>
        <product-table />
      </template>
    </index-base-page>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import ProductTable from '@/components/Tables/Product/ProductTable.vue'
export default {
  components: {
    IndexBasePage,
    ProductTable,
  },
  head() {
    return {
      title: 'List of product',
      meta: [
        {
          uid: 'description',
          name: 'description',
          content: 'List of product',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
