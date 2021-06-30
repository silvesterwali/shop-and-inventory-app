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
          <template #title>Edit Customer</template>
          <template #action>
            <ToolbarNav :add-action="false" return-url="/inventory/customer" />
          </template>
          <template #content>
            <v-card-text>
              <CustomerForm
                redirect-url="/inventory/customer"
                :customer="customer"
              />
            </v-card-text>
          </template>
        </CardToolbarPage>
      </template>
    </IndexBasePage>
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
