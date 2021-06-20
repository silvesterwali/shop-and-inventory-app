<template>
  <div>
    <v-form ref="form" @submit.prevent="validateForm">
      <v-row>
        <v-col lg="6" md="6" sm="6">
          <v-text-field
            v-model="dataForm.provider"
            :rules="[
              (v) => !!v || 'Provider card is requirred',
              errorKey('provider'),
            ]"
            dense
            placeholder="provider"
          ></v-text-field>
        </v-col>
        <v-col lg="6" md="6" sm="6">
          <v-text-field
            v-model="dataForm.cardNumber"
            :rules="[errorKey('cardNumber')]"
            dense
            label="Card Number"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="d-flex flex-row" style="widht: 100%">
        <v-spacer />
        <v-btn
          :loading="loading"
          text
          class="mr-1"
          small
          type="button"
          color="error"
          @click.prevent="reload"
          >Cancel</v-btn
        >
        <v-btn :loading="loading" small type="submit" color="primary">{{
          bankAtmCard ? 'update' : 'add'
        }}</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import errorKey from '@/mixins/errorKey'
import {
  createPersonalBankAtmCard,
  updatePersonalBankAtmCard,
} from '~/services/Personal'
export default {
  mixins: [errorKey],
  props: {
    userId: {
      type: String,
      default: null,
    },
    // existing object of resouce to be use on dataForm
    bankAtmCard: {
      type: Object,
      default: null,
    },
    // reload parant component
    reloadStatus: {
      type: Boolean,
      default: false,
    },
    // optional if component is used deep on same parent
    child: {
      type: Boolean,
      default: false,
    },
    // prop sync to control the parent props
    openForm: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // eslint-disable-next-line vue/no-reserved-keys
      dataForm: {
        _id: null,
        userId: this.userId,
        provider: null,
        cardNumber: null,
      },
      errors: null,
      loading: false,
    }
  },
  watch: {
    bankAtmCard: {
      immediate: true,
      handler(value) {
        if (value !== null) {
          this.dataForm = value
        }
      },
    },
  },
  methods: {
    validateForm() {
      if (!this.$refs.form.validate()) {
        return false
      }
      this.errors = null
      this.loading = true
      if (this.bankAtmCard !== null) {
        this._updateResource()
      } else {
        this._createResource()
      }
    },
    /**
     * send create resource
     *
     */
    async _createResource() {
      try {
        await createPersonalBankAtmCard(this.dataForm)
        this.loading = false
        this.reload()
      } catch (err) {
        this.errors = err.response.data
        this.errors = false
      }
    },
    /**
     * send update serource
     *
     */
    async _updateResource() {
      try {
        await updatePersonalBankAtmCard(
          this.userId,
          this.dataForm._id,
          this.dataForm
        )
        this.loading = false
        this.reload()
      } catch (err) {
        this.errors = err.response.data
        this.loading = false
      }
    },
    // method to fire the parent component
    reload() {
      if (this.child === false) {
        this.$emit('update:reloadStatus', true)
      } else {
        this.$emit('update:openForm', false)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
