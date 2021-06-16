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
        <head-stock-out-form :stock-out="stockOut" />
      </template>
    </index-base-page>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import HeadStockOutForm from '@/components/Forms/StockOut/HeadStockOutForm.vue'
import { getStockOutTransactionResource } from '@/services/StockOutTransaction.js'

export default {
  components: {
    // define your component here
    IndexBasePage,
    HeadStockOutForm,
  },
  async asyncData({ params }) {
    const { data } = await getStockOutTransactionResource(params.stock_id)
    return {
      stockOut: data,
    }
  },
  data() {
    return {
      pageTitle: `Stock Out Edit`,
      pageDescription:
        'Perubahan transaksi pengeluaran stock baru. pastikan data yang akan diinput sudah benar',
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
