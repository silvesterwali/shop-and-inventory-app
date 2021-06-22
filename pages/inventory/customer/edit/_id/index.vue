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
        <card-index-page>
          <template #card-title>Create new customer</template>
          <template #card-subtitle>
            <div>
              <v-btn
                small
                class="mt-n5 float-right"
                color="primary"
                to="/inventory/Cusotmer"
                >Back</v-btn
              >
            </div>
          </template>
          <template #card-text>
            <customer-form
              redirect-url="/inventory/customer"
              :customer="customer"
            />
          </template>
        </card-index-page>
      </template>
    </index-base-page>
  </div>
</template>

<script>
import IndexBasePage from '@/components/BasePage/IndexBasePage.vue'
import CardIndexPage from '~/components/CardPage/IndexCardPage.vue'
import CustomerForm from '~/components/Forms/Customer/CustomerForm.vue'
import { getCustomerResource } from '~/services/Customer.js'
export default {
  components: {
    // define your component here
    IndexBasePage,
    CardIndexPage,
    CustomerForm,
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
