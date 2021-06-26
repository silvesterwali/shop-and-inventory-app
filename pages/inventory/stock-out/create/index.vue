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
          <template #title>Create Stock Out</template>
          <template #action>
            <toolbar-nav
              return-url="/inventory/stock-out"
              :add-action="false"
            />
          </template>
          <template #content>
            <v-card-text>
              <head-stock-out-form />
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
