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
  </v-container>
</template>

<script>
import ItemDashboardCard from '~/components/Card/ItemDashboardCard.vue'
import { getItemDashboardResources } from '~/services/ItemDashboard'
export default {
  components: {
    ItemDashboardCard,
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
