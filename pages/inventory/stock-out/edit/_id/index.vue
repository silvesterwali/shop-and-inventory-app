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
        <card-toolbar-page>
          <template #title>Edit Stock Out</template>
          <template #action>
            <toolbar-nav
              return-url="/inventory/stock-out"
              :add-action="false"
            />
          </template>
          <template #content>
            <v-card-text>
              <head-stock-out-form :stock-out="stockOut" />
            </v-card-text>
          </template>
        </card-toolbar-page>
      </template>
    </index-base-page>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import HeadStockOutForm from '@/components/Forms/StockOut/HeadStockOutForm.vue'
import { getStockOutTransactionResource } from '@/services/StockOutTransaction.js'
import CardToolbarPage from '~/components/CardPage/CardToolbarPage.vue'
import ToolbarNav from '~/components/Nav/Toolbar/ToolbarNav.vue'

export default {
  components: {
    // define your component here
    IndexBasePage,
    HeadStockOutForm,
    CardToolbarPage,
    ToolbarNav,
  },
  async asyncData({ params }) {
    const { data } = await getStockOutTransactionResource(params.id)
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
