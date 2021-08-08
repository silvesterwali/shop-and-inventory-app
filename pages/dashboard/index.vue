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
        <ProductInTransCard />
      </v-col>
      <v-col lg="6" md="6" sm="12" cols="12">
        <ProductOutTransCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ItemDashboardCard from '~/components/Card/ItemDashboardCard.vue'
import { getItemDashboardResources } from '~/services/ItemDashboard'
import ProductInTransCard from '~/components/Card/Product/ProductInTransCard.vue'
import ProductOutTransCard from '~/components/Card/Product/ProductOuTransCard.vue'
export default {
  components: {
    ItemDashboardCard,
    ProductInTransCard,
    ProductOutTransCard,
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
