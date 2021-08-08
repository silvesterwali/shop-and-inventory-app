<template>
  <div>
    <v-card>
      <v-toolbar dense>
        <v-toolbar-title>Qty Product Keluar</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon small @click="dialog = true">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-subtitle
        >Data Default adalah data transaksi pada bulan berlangsung
      </v-card-subtitle>
      <v-card-text>
        <CountProductTransactionOutTable :filter.sync="dialog" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CountProductTransactionOutTable from '~/components/Tables/Product/CountProductTransactionOutTable.vue'
export default {
  components: {
    CountProductTransactionOutTable,
  },
  data() {
    return {
      dialog: false,
    }
  },
}
</script>

<style lang="scss" scoped></style>
