<template>
  <v-card
    ><v-card-title> {{ stockOut.serialNumber }}</v-card-title>
    <v-card-subtitle>
      <StockOutChip :status="stockOut.status" />
    </v-card-subtitle>
    <v-card-text class="pa-1">
      <v-list>
        <ListTwoLine
          :title="stockOut.transactionDate"
          subtitle="Transaction Date"
        />
        <ListTwoLine
          :title="stockOut.createdBy.username"
          subtitle="Created By"
        />
        <ListTwoLine :title="stockOut.type" subtitle="Type" />
        <ListTwoLine
          :title="stockOut.description"
          subtitle="Description"
        ></ListTwoLine>
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
