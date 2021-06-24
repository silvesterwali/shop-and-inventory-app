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
          <template #title>Edit Customer</template>
          <template #action>
            <toolbar-nav :add-action="false" return-url="/inventory/customer" />
          </template>
          <template #content>
            <v-card-text>
              <customer-form
                redirect-url="/inventory/customer"
                :customer="customer"
              />
            </v-card-text>
          </template>
        </card-toolbar-page>
      </template>
    </index-base-page>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import CardToolbarPage from '~/components/CardPage/CardToolbarPage.vue'
import CustomerForm from '~/components/Forms/Customer/CustomerForm.vue'
import ToolbarNav from '~/components/Nav/Toolbar/ToolbarNav.vue'
import { getCustomerResource } from '~/services/Customer.js'
export default {
  components: {
    // define your component here
    IndexBasePage,
    CardToolbarPage,
    CustomerForm,
    ToolbarNav,
  },
  async asyncData({ params }) {
    const { data } = await getCustomerResource(params.id)
    return {
      customer: data,
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
