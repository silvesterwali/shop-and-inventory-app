<template>
  <div>
    <index-base-page>
      <template #info></template>
      <template #content>
        <index-card-page></index-card-page>
      </template>
    </index-base-page>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import IndexCardPage from '@/components/CardPage/IndexCardPage.vue'
export default {
  components: {
    IndexBasePage,
    IndexCardPage,
  },
  head() {
    return {
      title: 'create product',
      meta: [
        {
          uid: 'description',
          name: 'description',
          content: 'Add new product resoruce',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
