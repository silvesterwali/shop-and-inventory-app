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
          <template #title>Create Stock Out</template>
          <template #action>
            <ToolbarNav return-url="/inventory/stock-out" :add-action="false" />
          </template>
          <template #content>
            <v-card-text>
              <HeadStockOutForm />
            </v-card-text>
          </template>
        </CardToolbarPage>
      </template>
    </IndexBasePage>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import HeadStockOutForm from '@/components/Forms/StockOut/HeadStockOutForm.vue'
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
  data() {
    return {
      pageTitle: `Stock Out`,
      pageDescription:
        'Penambahn transaksi pengeluaran stock baru. pastikan data yang akan diinput sudah benar',
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
