<template>
  <div>
    <IndexBasePage>
      <template #info>
        <v-card>
          <v-card-text>
            {{ pageDescription }}
          </v-card-text>
        </v-card>
      </template>
      <template #content>
        <!-- page page will be here -->
        <CardToolbarPage>
          <template #title>Edit Supplier</template>
          <template #action>
            <ToolbarNav :add-action="false" return-url="/inventory/supplier" />
          </template>
          <template #content>
            <v-card-text>
              <SupplierForm v-if="supplier" :key="1" :supplier="supplier" />
            </v-card-text>
          </template>
        </CardToolbarPage>
      </template>
    </IndexBasePage>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import SupplierForm from '@/components/Forms/Supplier/SupplierForm.vue'
import CardToolbarPage from '~/components/CardPage/CardToolbarPage.vue'
import { getSupplierResource } from '~/services/Supplier.js'
import ToolbarNav from '~/components/Nav/Toolbar/ToolbarNav.vue'
export default {
  components: {
    // define your component here
    IndexBasePage,
    CardToolbarPage,
    SupplierForm,
    ToolbarNav,
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
