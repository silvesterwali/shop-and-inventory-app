<template>
  <div>
    <index-base-page>
      <template #info>
        <stock-in-header-item :stock-header="stock" />
      </template>
      <template #content>
        <!-- page page will be here -->
        <stock-in-detail-table :stock-header="stock" />
      </template>
    </index-base-page>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import { getIncomingStockResource } from '@/services/IncomingStock.js'
import StockInHeaderItem from '@/components/Item/StockInHeaderItem.vue'
import StockInDetailTable from '@/components/Tables/StockIn/StockInDetailTable.vue'
export default {
  components: {
    // define your component here
    IndexBasePage,
    StockInHeaderItem,
    StockInDetailTable,
  },
  async asyncData({ params }) {
    const { data } = await getIncomingStockResource(params.stock_header_id)
    return {
      stock: data,
    }
  },
  data() {
    return {
      pageTitle: `Page-index`,
      pageDescription:
        'this page is under develop, please provide some feedback to improve it for better documentation',
    }
  },
  head() {
    // this property for meta tag
    return {
      title: this.pageTitle,
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
