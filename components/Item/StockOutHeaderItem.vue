<template>
  <v-card
    ><v-card-title> {{ stockOut.serialNumber }}</v-card-title>
    <v-card-subtitle>
      <stock-out-chip :status="stockOut.status" />
    </v-card-subtitle>
    <v-card-text class="pa-1">
      <v-list>
        <list-two-line
          :title="stockOut.transactionDate"
          subtitle="Transaction Date"
        />
        <list-two-line
          :title="stockOut.createdBy.username"
          subtitle="Created By"
        />
        <list-two-line :title="stockOut.type" subtitle="Type" />
        <list-two-line
          :title="stockOut.description"
          subtitle="Description"
        ></list-two-line>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import ListTwoLine from '~/components/List/ListTwoLine.vue'
import StockOutChip from '~/components/Chip/StockOut/StockOutChip.vue'
export default {
  components: {
    ListTwoLine,
    StockOutChip,
  },
  props: {
    stockOut: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped></style>
