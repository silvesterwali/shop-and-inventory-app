<template>
  <div>
    <v-form ref="form" @submit.prevent="validateForm">
      <v-row>
        <v-col lg="12" md="12" sm="12">
          <v-text-field
            v-model="dataForm.name"
            :rules="[(v) => !!v || 'Name is required', errorKey('name')]"
            label="Name"
            dense
          ></v-text-field>
        </v-col>
        <v-col lg="12" md="12" sm="12">
          <v-text-field
            v-model="dataForm.phone"
            label="Phone"
            dense
            :rules="[(v) => !!v || 'phone is required', errorKey('phone')]"
          ></v-text-field>
        </v-col>
        <v-col lg="12" md="12" sm="12">
          <v-text-field
            v-model="dataForm.email"
            label="Email"
            dense
            :rules="[(v) => !!v || 'Email is Required', errorKey('email')]"
          ></v-text-field>
        </v-col>
        <v-col lg="12" md="12" sm="12">
          <v-textarea
            v-model="dataForm.address"
            label="Address"
            rows="2"
            dense
            :rules="[
              ((v) => !!v || 'Address is required', errorKey('address')),
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
import errorKey from '@/mixins/errorKey.js'
import setMessage from '@/mixins/setMessage.js'
import {
  createSupplierResource,
  updateSupplierResource,
} from '~/services/Supplier.js'
export default {
  mixins: [errorKey, setMessage],
  props: {
    // existing supplier
    supplier: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      dataForm: {
        _id: null,
        name: null,
        phone: null,
        email: null,
        address: null,
      },
      errors: null,
    }
  },
  watch: {
    // watch the supplier props
    supplier: {
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
      if (!this.$refs.form.validate()) return false

      if (this.dataForm._id === null) {
        this.sendCreateNewRerouce()
      } else {
        this.sendUpdateResource()
      }
    },
    /**
     * sendCreateNewRource
     * - create new
     */
    async sendCreateNewRerouce() {
      try {
        const { data } = await createSupplierResource(this.dataForm)
        this.SET_MESSAGE({ text: data.message, color: 'success' })
        this.$router.go(-1) // go one step back
      } catch (err) {
        this.errors = err.response.data
      }
    },
    /**
     * sendUpdateResource
     * - update existing
     */
    async sendUpdateResource() {
      try {
        const { data } = await updateSupplierResource(
          this.dataForm._id,
          this.dataForm
        )
        this.SET_MESSAGE({ text: data.message, color: 'success' })
        this.$router.go(-1)
      } catch (err) {
        this.errors = err.response.data
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
