<template>
  <div>
    <IndexCardPage>
      <template #card-title>Todo</template>
      <template #card-subtitle>
        <div>
          <span>Create Your todo</span>
        </div>
      </template>
      <template #card-text>
        <!-- listed  component for page on this slot section -->
      </template>
    </IndexCardPage>
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
