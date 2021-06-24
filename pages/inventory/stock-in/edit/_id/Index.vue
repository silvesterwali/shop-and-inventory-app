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
          <template #title>Edit Header Stock In</template>
          <template #action>
            <toolbar-nav :add-action="false" return-url="/inventory/stock-in" />
          </template>
          <template #content>
            <v-card-text>
              <header-stock-in-form :stock-in="stockIn" />
            </v-card-text>
          </template>
        </card-toolbar-page>
      </template>
    </index-base-page>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import CardToolbarPage from '~/components/CardPage/CardToolbarPage.vue'
import { getIncomingStockResource } from '~/services/StockInTransaction.js'
import HeaderStockInForm from '~/components/Forms/StockIn/HeaderStockInForm.vue'
import ToolbarNav from '~/components/Nav/Toolbar/ToolbarNav.vue'

export default {
  components: {
    // define your component here
    IndexBasePage,
    HeaderStockInForm,
    CardToolbarPage,
    ToolbarNav,
  },
  async asyncData({ params }) {
    const { data } = await getIncomingStockResource(params.id)
    return {
      stockIn: data,
    }
  },
  data() {
    return {
      pageTitle: `Edit Stock In header`,
      pageDescription: 'Management Stok masuk barang dan bahan baku perusahaan',
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
