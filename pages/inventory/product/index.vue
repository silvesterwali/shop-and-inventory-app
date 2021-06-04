<template>
  <div>
    <index-base-page>
      <template #info>
        <v-card class="mb-1">
          <v-card-text>
            {{ pageDescription }}
          </v-card-text>
        </v-card>
      </template>
      <template #content>
        <product-table />
      </template>
    </index-base-page>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import ProductTable from '@/components/Tables/Product/ProductTable.vue'
export default {
  components: {
    IndexBasePage,
    ProductTable,
  },
  data() {
    return {
      pageDescription:
        'All product is listed on this page. create, update and delete them form this page',
    }
  },
  head() {
    return {
      title: 'List of product',
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
