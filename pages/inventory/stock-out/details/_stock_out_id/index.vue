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
        <!-- page page will be here -->
        <stock-out-detail :stock-out-header="stockOutHeader" />
      </template>
    </index-base-page>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import StockOutDetail from '@/components/Tables/StockOut/StockOutDetail.vue'
import { getStockOutTransactionResource } from '@/services/StockOutTransaction.js'
export default {
  components: {
    // define your component here
    IndexBasePage,
    StockOutDetail,
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
