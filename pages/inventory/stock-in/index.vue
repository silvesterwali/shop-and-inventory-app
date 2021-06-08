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
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
