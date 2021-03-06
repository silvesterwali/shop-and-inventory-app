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
            v-model="dataForm.supplierId"
            dense
            label="Suplier"
            :items="supliers"
            :rules="[errorKey('suplierId')]"
            item-text="name"
            item-value="_id"
            placeholder="Supplier"
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
        <v-col cols="12" sm="12" md="12">
          <v-radio-group
            v-model="dataForm.transactionType"
            :rules="[(v) => !!v || 'Type Transaksi tidak boleh kosong']"
          >
            <template #label>
              <div>Tentukan type <strong>Transaksi anda</strong></div>
            </template>
            <v-radio label="Non Retur" value="Non Retur"></v-radio>
            <v-radio label="Retur" value="Retur"></v-radio>
          </v-radio-group>
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
import setMessage from '@/mixins/setMessage.js'
import errorKey from '@/mixins/errorKey.js'
import moment from 'moment'
import { getSupplierResources } from '~/services/Supplier.js'
import {
  createIncomingStockResource,
  updateIncomingStockResource,
} from '~/services/StockInTransaction.js'
export default {
  mixins: [setMessage, errorKey],
  props: {
    stockIn: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      dataForm: {
        _id: null,
        serialNumber: null, // will auto provide in backend
        description: null,
        supplierId: null, // supplier
        transactionType: null, // type of transation in
        transactionDate: new Date().toISOString().substr(0, 10),
      },
      supliers: [],
      datePicker: false,
      errors: null,
      loading: false,
    }
  },
  async fetch() {
    try {
      const { data } = await getSupplierResources()
      this.supliers = data
    } catch (error) {
      console.log(error.response.data)
    }
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
    stockIn: {
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
      this.loading = true
      if (this.dataForm._id === null) {
        this.sendCreateNewResource()
      } else {
        this.sendUpdateResource()
      }
    },
    async sendCreateNewResource() {
      try {
        const { data } = await createIncomingStockResource(this.dataForm)
        this.SET_MESSAGE({ text: data.message, color: 'success' })
        this.$router.push(`/inventory/stock-in/details/${data.data._id}`)
      } catch (err) {
        this.errors = err.response.data
      } finally {
        this.loading = false
      }
    },
    async sendUpdateResource() {
      try {
        const { data } = await updateIncomingStockResource(
          this.dataForm._id,
          this.dataForm
        )
        this.SET_MESSAGE({ text: data.message, color: 'success' })
        this.$router.push(`/inventory/stock-in/details/${data.data._id}`)
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
