<template>
  <div>
    <v-skeleton-loader
      v-if="$fetchState.pending"
      class="mx-auto"
      type="card"
      boilerplate
    ></v-skeleton-loader>
    <v-card v-else>
      <v-card-title>Account bank </v-card-title>

      <v-card-text>
        <v-row>
          <v-col
            md="4"
            lg="4"
            sm="4"
            xs="12"
            cols="12"
            :order="!$vuetify.breakpoint.mobile ? 'last' : ''"
          >
            <v-sheet class="mt-3">
              Add some infomartion about your atm card. it just optioal only
            </v-sheet>
          </v-col>
          <v-col md="8" lg="8" sm="8" xs="12">
            <v-list v-if="accounts.length > 0">
              <bank-atm-card-item
                v-for="(bankAtmCard, index) in accounts"
                :key="index"
                :bank-atm-card="bankAtmCard"
                :reload-status.sync="reloadStatus"
                v-bind="$props"
              />
            </v-list>
            <v-divider class="mb-2" />

            <bank-card-atm-form
              v-if="addForm"
              v-bind="$props"
              :reload-status.sync="reloadStatus"
            />

            <div v-else class="d-flex flex-row">
              <p>You can adding and update bank account</p>
              <v-spacer />
              <v-btn small color="primary" @click.prevent="addForm = true"
                >Add More</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import BankAtmCardItem from '@/components/Item/BankAtmCardItem.vue'
import { getPersonalBankAtmCard } from '~/services/Personal.js'
import BankCardAtmForm from '~/components/Forms/BankAtmCardForm.vue'

export default {
  name: 'BankAtmCardGroup01',
  components: {
    BankCardAtmForm,
    BankAtmCardItem,
  },
  props: {
    userId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      reloadStatus: false, // to reload fomily data from api
      accounts: [],
      addForm: false,
    }
  },
  async fetch() {
    this.addForm = false
    this.reloadStatus = false
    if (this.userId === false) {
      return
    }
    const { data } = await getPersonalBankAtmCard(this.userId)
    if (data) {
      this.accounts = data
    }
  },
  watch: {
    reloadStatus: {
      immediate: true,
      handler(value) {
        if (value === true && process.client) {
          this.$fetch()
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
