<template>
  <div>
    <v-card>
      <v-toolbar dense>
        <v-toolbar-title>Qty Product Masuk</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon small @click="dialog = true">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-subtitle
        >Data Default adalah data transaksi pada bulan berlangsung
      </v-card-subtitle>
      <v-card-text>
        <CountProductTransactionTable :filter.sync="dialog" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CountProductTransactionTable from '~/components/Tables/Product/CountProuductTransactionInTable.vue'
export default {
  components: {
    CountProductTransactionTable,
  },
  data() {
    return {
      dialog: false,
    }
  },
}
</script>

<style lang="scss" scoped></style>
