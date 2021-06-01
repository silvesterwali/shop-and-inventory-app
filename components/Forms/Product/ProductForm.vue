<template>
  <div>
    <v-form ref="form" @submit.prevent="validateForm">
      <v-row>
        <v-col lg="6" md="6" sm="6">
          <v-text-field
            v-model="dataForm.name"
            :rules="[
              (v) => !!v || 'Product name is required',
              errorKey('name'),
            ]"
            label="Product Name"
          ></v-text-field>
        </v-col>
        <v-col lg="6" md="6" sm="6">
          <v-text-field
            v-model="dataForm.serial"
            label="Serial"
            :rules="[
              (v) => !!v || 'Product serial is required',
              errorKey('serial'),
            ]"
          ></v-text-field>
        </v-col>
        <v-col lg="6" md="6" sm="6">
          <v-select
            v-model="dataForm.category"
            label="Product category"
            multiple
            :items="categories"
            :rules="[
              (v) => !!v || 'Category is required',
              errorKey('category'),
            ]"
          ></v-select>
        </v-col>
        <v-col lg="6" md="6" sm="6">
          <v-text-field
            v-model="dataForm.wholeSale"
            label="Wholesale"
            type="number"
            :rules="[
              (v) => !!v || 'Wholesale is required',
              errorKey('wholeSale'),
            ]"
          ></v-text-field>
        </v-col>
        <v-col lg="6" md="6" sm="6">
          <v-text-field
            v-model="dataForm.retailPrice"
            label="Retail Price"
            type="number"
            :rules="[
              (v) => !!v || 'Retail price is required',
              errorKey('retailPrice'),
            ]"
          ></v-text-field>
        </v-col>

        <v-col v-if="canAddStockQty" lg="6" md="6" sm="6">
          <v-text-field
            v-model="dataForm.stockQty"
            label="First Stock"
            :rules="[
              (v) => !!v || 'First Stock is required',
              errorKey('stockQty'),
            ]"
          ></v-text-field>
        </v-col>
        <v-col lg="12" md="12" sm="12">
          <v-textarea
            v-model="dataForm.description"
            rows="2"
            label="Description"
            :rules="[
              (v) => !!v || 'Description is required',
              errorKey('description'),
            ]"
          ></v-textarea>
        </v-col>

        <v-col lg="12" sm="12" md="12">
          <v-spacer />
          <v-btn type="submit" class="float-right" color="primary">{{
            dataForm._id == null ? 'Submit' : 'Update'
          }}</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { createProduct, updateProduct } from '@/services/product.js'
import errorKey from '@/mixins/errorKey.js'
import setMessage from '@/mixins/setMessage.js'
export default {
  mixins: [errorKey, setMessage],
  props: {
    // props existing product
    product: {
      type: Object,
      default: null,
    },
    // url to redirect after do operation
    redirectUrl: {
      type: String,
      default: '/',
    },
  },
  data() {
    return {
      dataForm: {
        _id: null,
        name: null,
        serial: null,
        category: [],
        wholeSale: 0,
        retailPrice: 0,
        description: null,
        stockQty: 0,
      },
      errors: null,
      categories: ['Food', 'Drinks'],
    }
  },
  computed: {
    // check if current product data cannot edit the stock quantity
    canAddStockQty() {
      if (this.product === null) {
        return true
      }
      return false
    },
  },
  watch: {
    // if props is null it's mean form should update
    product: {
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
      if (!this.$refs.form.validate()) return false
      if (this.dataForm._id === null) {
        this.createResource()
      } else {
        this.updateResource()
      }
    },
    /**
     * create new resorse
     *
     *
     */
    async createResource() {
      try {
        const { data } = await createProduct(this.dataForm)
        this.SET_MESSAGE({ text: data.message, color: 'success' })
        this.$router.push(this.redirectUrl)
      } catch (err) {
        this.errors = err.response.data
      }
    },
    /**
     * update specific resource
     *
     *
     **/
    async updateResource() {
      try {
        const { data } = await updateProduct(this.dataForm._id, this.dataForm)
        this.SET_MESSAGE({ text: data.message, color: 'success' })
        this.$router.push(this.redirectUrl)
      } catch (err) {
        this.errors = err.response.data
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
