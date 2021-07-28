<template>
  <div>
    <IndexCardPage>
      <template #card-title>Page Examplate</template>
      <template #card-subtitle>
        <!-- card subtitle -->
        <div>
          <span>Example suptitle</span>
          <v-btn color="primary" small class="mt-n5 float-right" to="/"
            >Go To Somewhere</v-btn
          >
        </div>
      </template>
      <template #card-text>
        <v-btn color="primary" :loading="loading" @click.prevent="sendEmail"
          >Send Email</v-btn
        >
        <!-- card-text --></template
      >
      <template #card-action><!-- card-action --></template>
    </IndexCardPage>
  </div>
</template>

<script>
import IndexCardPage from '@/components/CardPage/IndexCardPage.vue'
import { getEmailTestResources } from '~/services/EmailTest.js'
export default {
  components: {
    // register component here
    IndexCardPage,
  },
  data() {
    return {
      lastEmail: null,
      loading: false,
    }
  },
  methods: {
    async sendEmail() {
      this.loading = true
      const { data } = await getEmailTestResources()
      alert(data.message)
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
