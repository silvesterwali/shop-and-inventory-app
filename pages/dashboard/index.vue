<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="(item, index) in items"
        :key="index"
        class="12"
        lg="3"
        md="3"
        sm="4"
      >
        <ItemDashboardCard v-bind="item" />
      </v-col>
    </v-row>
    <v-divider class="mt-3 mb-2" />
    <v-row>
      <v-col lg="6" md="6" sm="12" cols="12">
        <v-card>
          <v-card-title>Qty Product Masuk</v-card-title>
          <v-card-subtitle
            >Data Default adalah data transaksi pada bulan
            berlangsung</v-card-subtitle
          >
          <v-card-text>
            <CountProductTransactionTable />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ItemDashboardCard from '~/components/Card/ItemDashboardCard.vue'
import { getItemDashboardResources } from '~/services/ItemDashboard'
import CountProductTransactionTable from '~/components/Tables/Product/CountProuductTransactionInTable.vue'
export default {
  components: {
    ItemDashboardCard,
    CountProductTransactionTable,
  },

  async asyncData() {
    const { data } = await getItemDashboardResources()
    return {
      items: data,
    }
  },
}
</script>

<style lang="scss" scoped></style>
