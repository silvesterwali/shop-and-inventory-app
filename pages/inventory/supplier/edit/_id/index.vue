<template>
  <div>
    <index-base-page>
      <template #info>
        <v-card>
          <v-card-text>
            {{ pageDescription }}
          </v-card-text>
        </v-card>
      </template>
      <template #content>
        <!-- page page will be here -->
        <index-card-page>
          <template #card-title>Edit Supplier</template>
          <template #card-subtitle>
            <div>
              <v-btn
                small
                class="mt-n5 float-right"
                color="primary"
                to="/inventory/supplier"
                >Back</v-btn
              >
            </div>
          </template>
          <template #card-text>
            <v-divider class="mb-4" />
            <supplier-form v-if="supplier" :key="1" :supplier="supplier" />
          </template>
        </index-card-page>
      </template>
    </index-base-page>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import IndexCardPage from '@/components/CardPage/IndexCardPage.vue'
import SupplierForm from '@/components/Forms/Supplier/SupplierForm.vue'
import { getSupplierResource } from '@/services/supplier.js'
export default {
  components: {
    // define your component here
    IndexBasePage,
    IndexCardPage,
    SupplierForm,
  },
  async asyncData({ params }) {
    const { data } = await getSupplierResource(params.id)
    return {
      supplier: data,
    }
  },
  data() {
    return {
      pageTitle: `Page-index`,
      pageDescription:
        'this page is under develop, please provide some feedback to improve it for better documentation',
    }
  },
  head() {
    // this property for meta tag
    return {
      title: this.pageTitle,
      meta: [
        {
          uid: 'description',
          name: 'description',
          content: this.pageDescription,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
