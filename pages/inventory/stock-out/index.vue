<template>
  <div>
    <CardToolbarPage>
      <template #title>Stock Out</template>
      <template #action>
        <ToolbarNav create-url="/inventory/stock-out/create" />
      </template>
      <template #content>
        <StockOutTable />
      </template>
    </CardToolbarPage>
  </div>
</template>

<script>
import StockOutTable from '@/components/Tables/StockOut/StockOutTable.vue'
import CardToolbarPage from '~/components/CardPage/CardToolbarPage.vue'
import ToolbarNav from '~/components/Nav/Toolbar/ToolbarNav.vue'
export default {
  components: {
    StockOutTable,
    CardToolbarPage,
    ToolbarNav,
  },
  data() {
    return {
      pageProperty: {
        title: 'Stock out',
        decription: 'page to manage stock out in inventory',
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
          content: this.pageProperty.decription,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
