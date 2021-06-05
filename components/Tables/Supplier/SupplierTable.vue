<template>
  <div>
    <index-card-page>
      <template #card-title>Example Title</template>
      <template #card-subtitle>
        <div>
          <span>Example suptitle</span>
          <v-btn color="primary" small class="mt-n5 float-right" to="/"
            >Go To Somewhere</v-btn
          >
        </div>
      </template>
      <template #card-text>
        <!-- listed  component for page on this slot section -->
      </template>
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
