<template>
  <v-form ref="form" @submit.prevent="validateForm">
    <v-row>
      <!-- define your form input here-->
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-text-field
          v-model="dataForm.title"
          label="Title"
          :rules="[(v) => !!v || 'Title is required', errorKey('title')]"
        />
      </v-col>
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-textarea
          v-model="dataForm.summary"
          rows="2"
          label="Summary"
          :rules="[(v) => !!v || 'summary is required', errorKey('summary')]"
        />
      </v-col>
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-textarea
          v-model="dataForm.content"
          rows="2"
          label="Content"
          :rules="[(v) => !!v || 'Content is required', errorKey('content')]"
        />
      </v-col>
      <v-col lg="12" sm="12" md="12" cols="12">
        <v-spacer />
        <v-btn
          :loading="loading"
          type="submit"
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
import { createBrandResource, updateBrandResource } from '~/services/Brand.js'

export default {
  mixins: [errorKey, setMessage],
  props: {
    // define your props update purpose
    brand: {
      type: Object,
      default: null,
    },
    // define redirectUrl will redirect to destination after form execute
    redirectUrl: {
      type: String,
      default: '/',
    },
  },
  data() {
    return {
      dataForm: {
        _id: null,
        title: null,
        summary: null,
        description: null,
        // define the form property here
      },
      errors: null,
      loading: false,
    }
  },
  watch: {
    // special props to change the dataForm for update
    brand: {
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
      this.loading = true
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
        const { data } = await createBrandResource(this.dataForm)
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
        const { data } = await updateBrandResource(
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
