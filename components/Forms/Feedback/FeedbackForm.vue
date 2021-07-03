<template>
  <v-form ref="form" @submit.prevent="validateForm">
    <v-row>
      <!-- define your form input here-->
      <v-col lg="6" md="6" sm="6">
        <v-col cols="12" lg="12" sm="12" md="12">
          <v-text-field
            v-model="data"
            label="myData"
            :rules="[(v) => !!v || 'myData is required', errorKey('myData')]"
          />
        </v-col>
      </v-col>
      <v-col lg="6" md="6" sm="6">
        <v-col cols="12" lg="12" sm="12" md="12">
          <v-text-field
            v-model="data"
            label="myData"
            :rules="[(v) => !!v || 'myData is required', errorKey('myData')]"
          />
        </v-col>
      </v-col>
      <v-col lg="6" md="6" sm="6"></v-col>
      <v-col lg="6" md="6" sm="6"></v-col>
      <v-col lg="6" md="6" sm="6"></v-col>
      <v-col lg="12" sm="12" md="12">
        <v-spacer />
        <v-btn type="submit" class="float-right" color="primary">{{
          dataForm._id == null ? 'Submit' : 'Update'
        }}</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import errorKey from '@/mixins/errorKey.js'
import setMessage from '@/mixins/setMessage.js'
import {
  createFeedbackResource,
  updateFeedbackResource,
} from '~/services/Feedback.js'
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
  },
  data() {
    return {
      dataForm: {
        _id: null,
        title: null,
        url: null,
        email: null,
        content: null,
        status: null,
        // define the form property here
      },
      errors: null,
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
     * crateResource
     * - send to create specific resource
     * @async
     **/
    async createResource() {
      try {
        const { data } = await createFeedbackResource(this.dataForm)
        this.SET_MESSAGE({ text: data.message, color: 'success' })
        this.$router.push(this.redirectUrl)
      } catch (err) {
        this.errors(err)
      }
    },
    /**
     * updateResource
     * - send to update specific resource
     * @async
     **/
    async updateResource() {
      try {
        const { data } = await updateFeedbackResource(
          this.dataForm._id,
          this.dataForm
        )
        this.SET_MESSAGE({ text: data.message, color: 'success' })
        this.$router.push(this.redirectUrl)
      } catch (err) {
        this.errors(err)
      }
    },
  },
}
</script>
