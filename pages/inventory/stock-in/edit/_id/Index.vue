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
        <index-card-page>
          <template #card-title>Stock Masuk</template>
          <template #card-subtitle
            >List Stock Masuk
            <div>
              <v-btn
                small
                class="mt-n10 float-right"
                color="primary"
                to="/inventory/stock-in"
                >Back</v-btn
              >
            </div>
          </template>
          <template #card-text>
            <v-divider />
            <header-stock-in-form />
          </template>
        </index-card-page>
      </template>
    </index-base-page>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import IndexCardPage from '@/components/CardPage/IndexCardPage.vue'
import HeaderStockInForm from '~/components/Forms/StockIn/HeaderStockInForm.vue'
export default {
  components: {
    // define your component here
    IndexBasePage,
    HeaderStockInForm,
    IndexCardPage,
  },
  data() {
    return {
      pageTitle: `Page-index`,
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
