<template>
  <div>
    <v-form ref="formHeader" @submit.prevent="validateForm">
      <v-row class="mt-3">
        <v-col
          v-if="dataForm.serialNumber !== null"
          cols="12"
          lg="12"
          sm="12"
          md="12"
        >
          No Transaction :{{ dataForm.serialNumber }}
        </v-col>
        <v-col sm="6" md="6" lg="6">
          <v-select
            v-model="dataForm.type"
            dense
            label="Type"
            :items="typesTransaction"
            :rules="[errorKey('type')]"
            item-text="name"
            item-value="_id"
            placeholder="Type"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-menu
            v-model="datePicker"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="dateFormat"
                label="Transaction Date"
                prepend-icon="mdi-calendar"
                readonly
                :rules="[errorKey('transactionDate')]"
                dense
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dataForm.transactionDate"
              @input="datePicker = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col sm="6" md="6" lg="6">
          <v-select
            v-model="dataForm.customerId"
            dense
            label="Customer"
            :items="customers"
            :rules="[errorKey('customerId')]"
            item-text="fullName"
            item-value="_id"
            placeholder="Customer"
          ></v-select>
        </v-col>

        <v-col cols="12" sm="12" md="12">
          <v-textarea
            v-model="dataForm.description"
            label="Description"
            :rules="[errorKey('description')]"
            class="Description/Note (Optional)"
            rows="2"
          ></v-textarea>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <p>
            mohon mengisi header sebelum mengisi detail product pada transaksi
          </p>
          <v-btn
            :loading="loading"
            type="submit"
            color="primary"
            class="float-right"
            >{{ dataForm._id == null ? 'Submit' : 'Update' }}</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import {
  createStockOutTransactionResource,
  updateStockOutTransactionResource,
} from '@/services/StockOutTransaction.js'
import setMessage from '@/mixins/setMessage.js'
import errorKey from '@/mixins/errorKey.js'
import moment from 'moment'
import { getCustomerResources } from '~/services/Customer.js'
export default {
  mixins: [setMessage, errorKey],
  props: {
    stockOut: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      dataForm: {
        _id: null,
        serialNumber: null,
        description: null,
        type: null,
        costumerId: null,
        transactionDate: new Date().toISOString().substr(0, 10),
      },
      typesTransaction: ['Production', 'Distribusi', 'Retur'],
      datePicker: false,
      errors: null,
      loading: false,
      customers: [],
    }
  },
  async fetch() {
    this.loading = true
    const { data } = await getCustomerResources()
    this.customers = data
    this.loading = false
  },
  computed: {
    dateFormat: {
      get() {
        return moment(this.dataForm.transactionDate).format('YYYY-MM-DD')
      },
      set(value) {
        this.dataForm.transactionDate = moment(value).format('YYYY-MM-DD')
      },
    },
  },
  watch: {
    stockOut: {
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
      this.errors = null
      if (!this.$refs.formHeader.validate()) return false
      this.loading = false
      if (this.dataForm._id === null) {
        this.sendCreateNewResource()
      } else {
        this.sendUpdateResource()
      }
    },
    async sendCreateNewResource() {
      try {
        const { data } = await createStockOutTransactionResource(this.dataForm)
        this.SET_MESSAGE({ text: data.message, color: 'success' })
        this.$router.push(`/inventory/stock-out/details/${data.data._id}`)
      } catch (err) {
        this.errors = err.response.data
      } finally {
        this.loading = false
      }
    },
    async sendUpdateResource() {
      try {
        const { data } = await updateStockOutTransactionResource(
          this.dataForm._id,
          this.dataForm
        )
        this.SET_MESSAGE({ text: data.message, color: 'success' })
        this.$router.push(`/inventory/stock-out/details/${data.data._id}`)
      } catch (err) {
        this.errors = err.response.data
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
