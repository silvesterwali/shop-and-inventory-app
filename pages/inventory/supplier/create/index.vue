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
          <template #title>Create Supplier</template>
          <template #action>
            <toolbar-nav :add-action="false" return-url="/inventory/supplier" />
          </template>
          <template #content>
            <v-card-text>
              <supplier-form />
            </v-card-text>
          </template>
        </card-toolbar-page>
      </template>
    </index-base-page>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import CardToolbarPage from '@/components/CardPage/CardToolbarPage.vue'
import SupplierForm from '@/components/Forms/Supplier/SupplierForm.vue'
import ToolbarNav from '@/components/Nav/Toolbar/ToolbarNav.vue'
export default {
  components: {
    // define your component here
    IndexBasePage,
    SupplierForm,
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
