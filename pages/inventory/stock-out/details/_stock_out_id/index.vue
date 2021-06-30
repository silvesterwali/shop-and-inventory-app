<template>
  <div>
    <IndexBasePage>
      <template #info>
        <StockOutHeaderItem :stock-out="stockOutHeader" />
      </template>
      <template #content>
        <!-- page page will be here -->
        <StockOutDetail :stock-out-header="stockOutHeader" />
      </template>
    </IndexBasePage>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import StockOutDetail from '@/components/Tables/StockOut/StockOutDetail.vue'
import { getStockOutTransactionResource } from '@/services/StockOutTransaction.js'
import StockOutHeaderItem from '~/components/Item/StockOutHeaderItem.vue'
export default {
  components: {
    // define your component here
    IndexBasePage,
    StockOutDetail,
    StockOutHeaderItem,
  },
  async asyncData({ params }) {
    const { data } = await getStockOutTransactionResource(params.stock_out_id)
    return {
      stockOutHeader: data,
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
