<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-form ref="form" @submit.prevent="validateForm">
        <v-card :loading="loading">
          <v-card-title>
            <span class="text-h5">Item Stock</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-select
                    v-model="dataForm.productId"
                    :items="productList"
                    label="Product"
                    item-value="_id"
                    item-text="name"
                    dense
                    :rules="[
                      (v) => !!v || 'product is required',
                      errorKey('productId'),
                    ]"
                    required
                    @input="setUnitToNull"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="dataForm.qty"
                    dense
                    label="qty"
                    type="number"
                    :rules="[(v) => !!v || 'qty  is required', errorKey('qty')]"
                    step="any"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    v-model="dataForm.unit"
                    :items="units"
                    label="Unit"
                    dense
                    :rules="[
                      (v) => !!v || 'unit is required',
                      errorKey('unit'),
                    ]"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="dataForm.price"
                    type="number"
                    step="any"
                    :rules="[
                      (v) => !!v || 'price is required',
                      errorKey('price'),
                    ]"
                    label="price"
                    dense
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="dataForm.discount"
                    label="discount"
                    dense
                    :rules="[
                      (v) => !!v || 'discount is required',
                      errorKey('discount'),
                    ]"
                    type="number"
                    step="any"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                    v-model="dataForm.description"
                    dense
                    :rules="[errorKey('description')]"
                    label="description"
                    rows="2"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="red darken-1"
              type="button"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :loading="loading"
              outlined
              color="primary darken-1"
              type="submit"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>
<script>
import errorKey from '@/mixins/errorKey.js'
import setMessage from '@/mixins/setMessage'
import { getProductListResources } from '~/services/ProductList.js'
import {
  createStockOutDetailsTransactionResource,
  updateStockOutDetailsTransactionResource,
} from '~/services/StockOutTransactionDetatil.js'
export default {
  mixins: [errorKey, setMessage],
  props: {
    openDialog: {
      type: Boolean,
      default: false,
    },
    stockOutHeader: {
      type: Object,
      default: null,
    },
    itemStock: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      // object for form
      dataForm: {
        _id: null,
        productId: null,
        qty: 0,
        unit: null,
        price: 0,
        discount: 0,
        description: null,
      },
      productList: [], // list product
      errors: null,
      loading: false,
    }
  },
  async fetch() {
    this.loading = true
    const { data } = await getProductListResources()
    this.productList = data
    this.loading = false
  },

  computed: {
    dialog: {
      set(value) {
        this.$emit('update:openDialog', value)
      },
      get() {
        return this.openDialog
      },
    },
    /**
     * units
     * - determine if all product have their own unit
     * - the unit will fire from selected product unit
     */
    units() {
      if (this.dataForm.productId === null) {
        return []
      }
      // just find out the unit array from selected product
      const productUnit = this.productList.find(
        (el) => el._id === this.dataForm.productId
      )
      return productUnit ? productUnit.unit : []
    },
  },
  watch: {
    itemStock: {
      // wathc the itemStock props . if there passsing data then property dataForm should be update
      immediate: true,
      handler(value) {
        if (value !== null) {
          this.dataForm = value
        }
      },
    },
  },
  methods: {
    /**
     * setUnitToNull
     *
     * - method will call on input the product
     * - this will change the dataForm unit to null , so user will fill new product unit
     */
    setUnitToNull() {
      this.dataForm.unit = null
    },
    // method will validate the form before sended the data to backend
    validateForm() {
      this.errors = null
      if (!this.$refs.form.validate()) {
        return false
      }
      this.loading = false
      if (this.dataForm._id === null) {
        this.sendNewResource()
      } else {
        this.sendUpdateResource()
      }
    },
    /**
     * sendNewResource
     *
     * - method to responsible send new item stock in resource
     * @async
     */
    async sendNewResource() {
      try {
        const { data } = await createStockOutDetailsTransactionResource(
          this.stockOutHeader._id,
          this.dataForm
        )
        this.SET_MESSAGE({ text: data.message, color: 'success' })
        this.resetForm()
        this.dialog = false
      } catch (err) {
        this.errors = err.response.data
      } finally {
        this.loading = false
      }
    },
    /**
     * sendUpdateResource
     *
     * - method for responsible send update resource for create item stock in
     * @async
     */
    async sendUpdateResource() {
      try {
        const { data } = await updateStockOutDetailsTransactionResource(
          this.stockOutHeader._id,
          this.dataForm._id,
          this.dataForm
        )
        this.SET_MESSAGE({ text: data.message, color: 'success' })
        this.resetForm()
        this.dialog = false
      } catch (err) {
        this.errors = err
      } finally {
        this.loading = false
      }
    },
    resetForm() {
      this.$refs.form.reset()
      this.dataForm = {
        _id: null,
        productId: null,
        qty: 0,
        unit: null,
        price: 0,
        discount: 0,
        description: null,
      }
    },
  },
}
</script>
