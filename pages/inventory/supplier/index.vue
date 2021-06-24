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
        <card-toolbar-page>
          <template #title>Suplier</template>
          <template #action>
            <toolbar-nav create-url="/inventory/supplier/create" />
          </template>
          <template #content>
            <supplier-table />
          </template>
        </card-toolbar-page>
      </template>
    </index-base-page>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import SupplierTable from '@/components/Tables/Supplier/SupplierTable.vue'
import CardToolbarPage from '~/components/CardPage/CardToolbarPage.vue'
import ToolbarNav from '~/components/Nav/Toolbar/ToolbarNav.vue'

export default {
  components: {
    // define your component here
    IndexBasePage,
    SupplierTable,
    CardToolbarPage,
    ToolbarNav,
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
