<template>
  <div>
    <v-card>
      <v-card-subtitle>sum</v-card-subtitle>
      <v-card-text>
        <v-list>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Two-line item</v-list-item-title>
              <v-list-item-subtitle>Serial</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <pre>{{ stockHeader }}</pre>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'StockInHeaderItem',
  props: {
    stockHeader: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped></style>
