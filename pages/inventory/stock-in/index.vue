<template>
  <div>
    <stock-in-table />
  </div>
</template>

<script>
import StockInTable from '@/components/Tables/StockIn/StockInTable.vue'
export default {
  components: {
    // register component here
    StockInTable,
  },
  data() {
    return {
      pageProperty: {
        title: 'Stock',
        description: 'This page is listed all stock in ',
      },
    }
  },
  head() {
    return {
      title: this.pageProperty.title,
      meta: [
        {
          uid: 'description',
          name: 'description',
          content: this.pageProperty.description,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
