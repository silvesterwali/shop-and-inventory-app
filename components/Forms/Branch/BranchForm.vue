<template>
  <v-form ref="form" @submit.prevent="validateForm">
    <v-row>
      <!-- define your form input here-->
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-text-field
          v-model="dataForm.name"
          label="Name"
          :rules="[(v) => !!v || 'Name is require', errorKey('name')]"
        />
      </v-col>
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-text-field
          v-model="dataForm.code"
          label="Code"
          :rules="[(v) => !!v || 'Code is required', errorKey('code')]"
        />
      </v-col>
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-text-field
          v-model="dataForm.phone"
          label="Phone"
          :rules="[(v) => !!v || 'phone is required', errorKey('phone')]"
        />
      </v-col>

      <v-col lg="12" sm="12" md="12">
        <v-checkbox v-model="dataForm.isActive" label="Is Active"></v-checkbox>
      </v-col>

      <v-col cols="12" lg="12" sm="12" md="12">
        <v-textarea
          v-model="dataForm.address"
          rows="2"
          label="Address"
          :rules="[(v) => !!v || 'address is required', errorKey('address')]"
        />
      </v-col>

      <v-col lg="12" sm="12" md="12">
        <v-spacer />
        <v-btn
          type="submit"
          :loading="loading"
          class="float-right"
          color="primary"
          >{{ dataForm._id == null ? 'Submit' : 'Update' }}</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import errorKey from '@/mixins/errorKey.js'
import setMessage from '@/mixins/setMessage.js'
import {
  createBranchResource,
  updateBranchResource,
} from '~/services/Branch.js'
export default {
  mixins: [errorKey, setMessage],
  props: {
    // define your props update purpose
    propsName: {
      type: Object,
      default: null,
    },
    // define redirectUrl will redirect to destination after form execute
    redirectUrl: {
      type: String,
      default: '/',
    },
    branch: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      dataForm: {
        _id: null,
        name: null,
        code: null,
        phone: null,
        address: null,
        isActive: false,
        // define the form property here
      },
      errors: null,
      loading: false,
    }
  },
  watch: {
    // special props to change the dataForm for update
    propsName: {
      immediate: true,
      handler(value) {
        if (value !== null) {
          this.dataForm = value
        }
      },
    },
    branch: {
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
      this.loading = true
      if (!this.$refs.form.validate()) return false
      if (this.dataForm._id === null) {
        this.createResource()
      } else {
        this.updateResource()
      }
    },
    /**
     * crateResource
     * - send to create specific resource
     * @async
     **/
    async createResource() {
      try {
        const { data } = await createBranchResource(this.dataForm)
        this.SET_MESSAGE({ text: data.message, color: 'success' })
        this.$router.push(this.redirectUrl)
      } catch (err) {
        this.errors(err)
      } finally {
        this.loading = false
      }
    },
    /**
     * updateResource
     * - send to update specific resource
     * @async
     **/
    async updateResource() {
      try {
        const { data } = await updateBranchResource(
          this.dataForm._id,
          this.dataForm
        )
        this.SET_MESSAGE({ text: data.message, color: 'success' })
        this.$router.push(this.redirectUrl)
      } catch (err) {
        this.errors(err)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
