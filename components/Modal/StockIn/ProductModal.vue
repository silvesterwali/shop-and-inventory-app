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
                    :rules="[(v) => !!v || 'product is required']"
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
                    :rules="[(v) => !!v || 'qty  is required']"
                    step="any"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="dataForm.unit"
                    label="Unit"
                    :rules="[(v) => !!v || 'unit is required']"
                    dense
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="dataForm.price"
                    type="number"
                    step="any"
                    :rules="[(v) => !!v || 'price is required']"
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
                    :rules="[(v) => !!v || 'discount is required']"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                    v-model="dataForm.description"
                    dense
                    label="description"
                    rows="2"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              type="button"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn color="blue darken-1" text type="submit"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>
<script>
import { getProductListResources } from '@/services/productList.js'
export default {
  props: {
    openDialog: {
      type: Boolean,
      default: false,
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
    }
  },
  async fetch() {
    const { data } = await getProductListResources()
    this.productList = data
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
    loading() {
      return this.$fetchState
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
      return productUnit.unit
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
      if (!this.$refs.form.validate()) {
        return false
      }
    },
  },
}
</script>
