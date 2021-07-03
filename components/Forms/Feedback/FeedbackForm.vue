<template>
  <v-form ref="form" @submit.prevent="validateForm">
    <v-row>
      <!-- define your form input here-->
      <v-col v-if="feedback !== null" cols="12" lg="12" sm="12" md="12">
        <v-col lg="6" md="6">
          <v-select
            v-model="dataForm.status"
            label="Status"
            :items="statusList"
            :rules="[(v) => !!v || 'status is required', errorKey('status')]"
          />
        </v-col>
      </v-col>
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-text-field
          v-model="dataForm.title"
          label="Title"
          :rules="[(v) => !!v || 'title is required', errorKey('title')]"
        />
      </v-col>
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-text-field v-model="dataForm.email" label="Email" />
      </v-col>

      <v-col cols="12" lg="12" sm="12" md="12">
        <v-text-field v-model="dataForm.url" label="Url (optional)" />
      </v-col>

      <v-col cols="12" lg="12" sm="12" md="12">
        <v-textarea
          v-model="dataForm.content"
          rows="2"
          label="Content"
          :rules="[(v) => !!v || 'Content is required', errorKey('content')]"
        />
        <p>Tell us what you need to improve this site</p>
      </v-col>

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
    feedback: {
      type: Object,
      default: null,
    },
    // define redirectUrl will redirect to destination after form execute
    redirectUrl: {
      type: String,
      default: null,
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
      statusList: ['Request', 'Pending', 'In Progress', 'Canceled', 'Done'],
    }
  },
  watch: {
    // special props to change the dataForm for update
    feedback: {
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
        this.redirectAction()
      } catch (err) {
        this.errors(err.response.data)
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
        this.redirectAction()
      } catch (err) {
        this.errors(err.response.data)
      }
    },
    redirectAction() {
      if (this.redirectUrl !== null) {
        this.$router.push(this.redirectUrl)
      }
    },
  },
}
</script>
