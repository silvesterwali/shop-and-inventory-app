<template>
  <div>
    <template v-if="!openForm && bankAtmCard !== null">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ bankAtmCard.cardNumber }}</v-list-item-title>
          <v-list-item-subtitle
            >{{ bankAtmCard.provider }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <div class="d-flex flex-row">
            <v-icon
              title="Edit data"
              small
              color="grey lighten-1"
              @click.prevent="openForm = true"
              >mdi-pencil-outline</v-icon
            >

            <v-icon
              small
              title="Delete"
              color="red lighten-1"
              @click.prevent="dialogDelete = true"
              >mdi-delete-outline</v-icon
            >
          </div>
        </v-list-item-action>
      </v-list-item>
    </template>
    <template v-else>
      <bank-atm-card
        v-bind="$props"
        :bank-atm-card="bankAtmCard"
        :open-form.sync="openForm"
        :child="true"
      />
    </template>
    <v-dialog v-model="dialogDelete" persistent max-width="300">
      <v-card :loading="loading">
        <v-card-title class="headline"> Are you sure? </v-card-title>
        <v-card-text>Will you remove {{ bankAtmCard.cardNumber }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialogDelete = false">
            Disagree
          </v-btn>
          <v-btn
            :loading="loading"
            color="green darken-1"
            text
            @click.prevent="sendDelete"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { deletePersonalBankAtmCard } from '@/services/personal.js'
import BankAtmCard from '~/components/Forms/BankAtmCardForm.vue'
export default {
  name: 'BankAtmCardItem',
  components: {
    BankAtmCard,
  },
  props: {
    userId: {
      type: String,
      default: null,
    },
    // object of main resource
    bankAtmCard: {
      type: Object,
      default: null,
    },
    // prop to control parent with sync
    reloadStatus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openForm: false,
      dialogDelete: false,
      loading: false,
    }
  },
  watch: {
    bankAtmCard: {
      immediate: true,
      handler(value) {
        if (value === false) {
          this.$emit('update:reloadStatus', true)
        }
      },
    },
  },
  methods: {
    // send delete to endpoint
    async sendDelete() {
      try {
        this.loading = true
        await deletePersonalBankAtmCard(this.userId, this.bankAtmCard._id)
        this.$emit('update:reloadStatus', true)
        this.dialogDelete = false
        this.loading = false
      } catch (err) {}
    },
  },
}
</script>

<style lang="scss" scoped></style>
