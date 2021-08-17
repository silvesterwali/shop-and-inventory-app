<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-form ref="form" @submit.prevent="validateForm">
        <v-card :loading="loading">
          <v-card-title>
            {{ dataForm._id !== null ? 'Update' : 'Create' }} Todo
          </v-card-title>
          <v-card-text>
            <v-col cols="12" lg="12" sm="12" md="12">
              <v-textarea
                v-model="dataForm.description"
                rows="2"
                label="Todo"
                :rules="[(v) => !!v || 'todo is required']"
              />
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-btn
              type="button"
              color="red darken-1"
              text
              @click="dialog = false"
              >No</v-btn
            >
            <v-spacer />
            <v-btn type="submit" color="green darken-1" text>Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import setMessage from '@/mixins/setMessage.js'
import { createTodoResource, updateTodoResource } from '~/services/Todo.js'
export default {
  mixins: [setMessage],
  props: {
    // control the ***dialog*** with this props
    value: {
      type: Boolean,
      default: false,
    },
    // previous todo object for update
    todo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      dataForm: {
        _id: null,
        description: null,
        status: 'In Progress',
      },
      errors: null,
    }
  },
  computed: {
    // make sure  that ***dialogTodo*** is using ***sync*** props
    dialog: {
      set(value) {
        this.$emit('input', value)
      },
      get() {
        return this.value
      },
    },
  },
  watch: {
    // if todos props is not null thats mean the data will be update
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
    validateForm() {
      if (this.$refs.form.validate()) {
        if (this.dataForm._id === null) {
          this.sendCreate()
        } else {
          this.sendCreate()
        }
      }
    },
    async sendCreate() {
      try {
        const { data } = await createTodoResource(this.dataForm)
        this.SET_MESSAGE({ text: data.message, color: 'success' })
        this.dialog = false
      } catch (err) {
        this.errors = err.response.data
      }
    },
    async sendUpdate() {
      try {
        const { data } = await updateTodoResource(
          this.dataForm._id,
          this.dataForm
        )
        this.SET_MESSAGE({ text: data.message, color: 'success' })
        this.dialog = false
      } catch ({ response }) {
        this.errors = response.data
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
