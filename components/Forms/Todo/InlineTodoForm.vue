<template>
  <v-form ref="form" @submit.prevent="submitForm">
    <v-textarea
      v-model="dataForm.description"
      dense
      auto-grow
      placeholder="Todo"
      flat
      :rules="[(v) => !!v || 'todo is required']"
      @keyup.enter="submitForm"
    />
    <v-btn type="submit" block color="primary" ti>Submit</v-btn>
  </v-form>
</template>

<script>
import { createTodoResource, updateTodoResource } from '~/services/Todo.js'
import setMessage from '~/mixins/setMessage.js'
export default {
  mixins: [setMessage],
  props: {
    // existing to for update
    todo: {
      type: Object,
      default: null,
    },
    // status string from todo
    status: {
      type: String,
      default: 'Plan',
    },
    // control the parent control
    openForm: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dataForm: {
        _id: null,
        description: null,
        status: this.status,
      },
    }
  },
  watch: {
    // watch if existing todo
    todo: {
      immediate: true,
      handler(value) {
        if (value !== null) {
          this.dataForm = value
        }
      },
    },
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        if (this.dataForm._id === null) {
          this.sendCreate()
        } else {
          this.sendUpdate()
        }
      }
    },
    async sendCreate() {
      try {
        const { data } = await createTodoResource(this.dataForm)
        this.SET_MESSAGE({ text: data.message, color: 'success' })
      } catch (err) {
        this.SET_MESSAGE({ text: err.response.data.message, color: 'error' })
      } finally {
        this.$emit('update:openForm', false)
      }
    },
    async sendUpdate() {
      try {
        const { data } = await updateTodoResource(
          this.dataForm._id,
          this.dataForm
        )
        this.SET_MESSAGE({ text: data.message, color: 'success' })
      } catch (err) {
        this.SET_MESSAGE({ text: err.response.data.message, color: 'error' })
      } finally {
        this.$emit('update:openForm', false)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
