<template>
  <div>
    <v-card>
      <v-card-title>{{ stockHeader.serialNumber }}</v-card-title>
      <v-card-subtitle>
        <StockInChip :status="stockHeader.status" />
      </v-card-subtitle>
      <v-card-text class="pa-1">
        <v-list>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{
                stockHeader.transactionDate
              }}</v-list-item-title>
              <v-divider />
              <v-list-item-subtitle>Transaction Date</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{
                stockHeader.supplier ? stockHeader.supplier.name : ''
              }}</v-list-item-title>
              <v-divider />
              <v-list-item-subtitle>Supplier</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{
                stockHeader.createdBy.username
              }}</v-list-item-title>
              <v-divider />
              <v-list-item-subtitle>Inputer</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{
                stockHeader.description
              }}</v-list-item-title>
              <v-divider />
              <v-list-item-subtitle>Description</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import StockInChip from '@/components/Chip/StockIn/StockInChip.vue'
export default {
  name: 'StockInHeaderItem',
  components: {
    StockInChip,
  },
  props: {
    stockHeader: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped></style>
