<template>
  <div>
    <v-form ref="form" @submit.prevent="validateForm">
      <v-row>
        <v-col lg="6" sm="6">
          <v-text-field
            v-model="dataForm.fullName"
            label="Fullname"
            :rules="[
              (v) => !!v || 'Fullname is required',
              errorKey('fullName'),
            ]"
          ></v-text-field>
        </v-col>
        <v-col lg="6" sm="6">
          <v-text-field
            v-model="dataForm.email"
            label="email"
            :rules="[errorKey('email')]"
          ></v-text-field>
        </v-col>
        <v-col lg="6" sm="6">
          <v-text-field
            v-model="dataForm.phone"
            label="Phone"
            :rules="[(v) => !!v || 'Phone is required', errorKey('phone')]"
          ></v-text-field>
        </v-col>
        <v-col lg="6" sm="6">
          <v-text-field
            v-model="dataForm.phoneAlternate"
            label="Phone Alternate"
            :rules="[errorKey('phoneAlternate')]"
          ></v-text-field>
        </v-col>
        <v-col lg="12" sm="12">
          <v-textarea
            v-model="dataForm.address"
            label="Address"
            rows="2"
            :rules="[(v) => !!v || 'required', errorKey('address')]"
          ></v-textarea>
        </v-col>
        <v-col lg="12" sm="12">
          <v-textarea
            v-model="dataForm.addressAternate"
            label="Address Alternate"
            rows="2"
            :rules="[errorKey('addressAlternate')]"
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
  createCustomerResource,
  updateCustomerResource,
} from '@/services/Customer.js'
export default {
  mixins: [errorKey, setMessage],
  props: {
    // props existing customer
    customer: {
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
        serialNumber: null,
        fullName: null,
        email: null,
        phone: null,
        phoneAlternate: null,
        address: null,
        addressAternate: null,
      },
      errors: null,
    }
  },

  watch: {
    // if props is null it's mean form should update
    customer: {
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
        const { data } = await createCustomerResource(this.dataForm)
        this.SET_MESSAGE({ text: data.message, color: 'success' })
        this.$router.push(this.redirectUrl)
      } catch (err) {
        // eslint-disable-next-line no-debugger
        debugger
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
        const { data } = await updateCustomerResource(
          this.dataForm._id,
          this.dataForm
        )
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
