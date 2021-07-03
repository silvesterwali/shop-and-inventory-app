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
export default {
  components: {
    ItemDashboardCard,
  },
  data() {
    return {
      items: [
        {
          url: '/inventory/product',
          btnText: 'Go To Products',
          cardTitle: '5000',
          cardSubTitle: 'Product',
          icon: 'mdi-cube-outline',
        },
        {
          url: '/inventory/brand',
          btnText: 'Go To Brands',
          cardTitle: '50',
          cardSubTitle: 'Brands',
          icon: 'mdi-apps',
        },
        {
          url: '/inventory/customer',
          btnText: 'Go To Customer',
          cardTitle: '50',
          cardSubTitle: 'Customer',
          icon: 'mdi-account-group',
        },
        {
          url: '/admin/users',
          btnText: 'Go To Users',
          cardTitle: '50',
          cardSubTitle: 'User',
          icon: 'mdi-account-group',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
