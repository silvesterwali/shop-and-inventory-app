<template>
  <div>
    <stock-out-table />
  </div>
</template>

<script>
import StockOutTable from '@/components/Tables/StockOut/StockOutTable.vue'
export default {
  components: {
    StockOutTable,
  },
  data() {
    return {
      pageProperty: {
        title: 'Stock out',
        decription: 'page to manage stock out in inventory',
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
          content: this.pageProperty.decription,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
