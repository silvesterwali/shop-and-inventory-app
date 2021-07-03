<template>
  <div>
    <IndexBasePage>
      <template #info>
        <v-card>
          <v-card-text>
            {{ pageDescription }}
          </v-card-text>
        </v-card>
      </template>
      <template #content>
        <!-- page page will be here -->
        <CardToolbarPage>
          <template #title>Edit Header Stock In</template>
          <template #action>
            <ToolbarNav :add-action="false" return-url="/inventory/stock-in" />
          </template>
          <template #content>
            <v-card-text v-if="stockIn">
              <HeaderStockInForm :stock-in="stockIn" />
            </v-card-text>
          </template>
        </CardToolbarPage>
      </template>
    </IndexBasePage>
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
    try {
      const { data } = await getIncomingStockResource(params.id)
      return {
        stockIn: data,
      }
    } catch (error) {
      console.log(error)
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
