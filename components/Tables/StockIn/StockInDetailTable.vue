<template>
  <div>
    <index-card-page>
      <template #card-title>Items</template>
      <template #card-subtitle>
        <!-- card subtitle -->
        <div>
          <span>List Of Item </span>

          <v-btn color="primary" small class="mt-n5 float-right" to="/"
            >Add Item</v-btn
          >
          <v-btn
            color="error"
            small
            class="mt-n5 float-right mr-2"
            to="/inventory/stock-in"
            >Back</v-btn
          >
        </div>
      </template>
      <template #card-text> <!-- card-text --></template>
      <template #card-action><!-- card-action --></template>
    </index-card-page>
  </div>
</template>

<script>
import IndexCardPage from '@/components/CardPage/IndexCardPage.vue'
export default {
  components: {
    // register component here
    IndexCardPage,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
