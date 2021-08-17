<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card :loading="loading">
        <v-card-title> Are you sure to delete ? </v-card-title>
        <v-card-text>
          <p>You will delete todo</p>
          <p>{{ todo.description }}</p>
        </v-card-text>
        <v-card-actions v-if="!loading">
          <v-btn color="red darken-1" text @click="dialog = false">No</v-btn>
          <v-spacer />
          <v-btn color="green darken-1" text @click.prevent="sendDelete"
            >Yes</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import setMessage from '@/mixins/setMessage.js'
import { deleteTodoResource } from '~/services/Todo.js'
export default {
  mixins: [setMessage],
  props: {
    // control the ***dialog*** with this props
    dialogDelete: {
      type: Boolean,
      default: false,
    },
    todo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    // make sure  that ***dialogDelete*** is using ***sync*** props
    dialog: {
      set(value) {
        this.$emit('update:dialogDelete', value)
      },
      get() {
        return this.dialogDelete
      },
    },
  },
  methods: {
    async sendDelete() {
      this.loading = true
      try {
        const { data } = await deleteTodoResource(this.todo._id)
        this.SET_MESSAGE({ text: data.message, color: 'success' })
      } catch (err) {
        this.SET_MESSAGE({ text: err.response.data.message, color: 'error' })
      } finally {
        this.dialog = false
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
