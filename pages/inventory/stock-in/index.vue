<template>
  <div>
    <CardToolbarPage>
      <template #title>Stock In</template>
      <template #action>
        <ToolbarNav create-url="/inventory/stock-in/create" />
      </template>
      <template #content>
        <StockInTable />
      </template>
    </CardToolbarPage>
  </div>
</template>

<script>
import StockInTable from '@/components/Tables/StockIn/StockInTable.vue'
import CardToolbarPage from '~/components/CardPage/CardToolbarPage.vue'
import ToolbarNav from '~/components/Nav/Toolbar/ToolbarNav.vue'
export default {
  components: {
    // register component here
    StockInTable,
    CardToolbarPage,
    ToolbarNav,
  },
  data() {
    return {
      pageProperty: {
        title: 'Stock',
        description: 'This page is listed all stock in ',
      },
    }
  },
  head() {
    return {
      title: this.pageProperty.title,
      meta: [
        {
          uid: 'description',
          name: 'description',
          content: this.pageProperty.description,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
