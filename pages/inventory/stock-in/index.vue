<template>
  <div>
    <index-card-page>
      <template #card-title>Page Examplate</template>
      <template #card-subtitle>
        <!-- card subtitle -->
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
