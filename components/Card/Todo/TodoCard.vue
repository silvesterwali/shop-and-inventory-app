<template>
  <div>
    <v-card :loading="$fetchState.pending">
      <v-toolbar dense elevation="1">
        <v-toolbar-title>
          <v-chip color="amber darken-1" dark small>
            {{ status }}
          </v-chip>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="float-right">
          <v-btn
            fab
            x-small
            color="primary"
            @click.prevent="openForm = !openForm"
          >
            <v-icon>{{ openForm ? 'mdi-minus' : 'mdi-plus' }} </v-icon>
          </v-btn>
        </div>
      </v-toolbar>
      <Board :id="status" @reload="$fetch">
        <v-card-text class="pa-1">
          <template v-if="openForm">
            <InlineTodoForm
              :open-form.sync="openForm"
              :todo="selectedItem"
              :status="status"
            />
          </template>

          <span v-for="todo in items.data" :key="todo.id">
            <TodoSheet
              :id="todo._id"
              :todo="todo"
              :draggable="true"
              @edit="edit"
              @deleteItem="deleteItem"
              @reload="$fetch"
            />
          </span>
        </v-card-text>
      </Board>
      <v-card-actions>
        <span style="font-size: 9px">
          You Change the status with drag the todo to another card
        </span>
      </v-card-actions>
    </v-card>
    <template v-if="dialogDelete">
      <DeleteTodoModal
        :todo="selectedItem"
        :dialog-delete.sync="dialogDelete"
      />
    </template>
  </div>
</template>

<script>
import TodoSheet from '~/components/Sheet/TodoSheet.vue'
import InlineTodoForm from '~/components/Forms/Todo/InlineTodoForm.vue'
import { getTodoResources } from '~/services/Todo.js'
import DeleteTodoModal from '~/components/Modal/Todo/DeleteTodoModal.vue'
import Board from '~/components/Draggable/Board.vue'
export default {
  components: {
    TodoSheet,
    InlineTodoForm,
    DeleteTodoModal,
    Board,
  },
  props: {
    status: {
      type: String,
      default: 'Plan',
    },
  },
  data() {
    return {
      openForm: false,
      items: [],
      todos: [],
      selectedItem: null,
      dialogDelete: false,
      params: {
        page: 1,
        status: this.status,
        limit: 10,
      },
    }
  },
  async fetch() {
    this.selectedItem = null
    const { data } = await getTodoResources(this.params)
    this.items = data
  },
  watch: {
    openForm: {
      immediate: true,
      handler(value) {
        if (value === false && process.client) {
          this.$fetch()
        }
      },
    },
    dialogDelete: {
      immediate: true,
      handler(value) {
        if (value === false && process.client) {
          this.$fetch()
        }
      },
    },
  },
  methods: {
    edit(item) {
      this.selectedItem = item
      this.openForm = true
    },
    deleteItem(item) {
      this.selectedItem = item
      this.dialogDelete = true
    },
    clone(el) {
      return {
        name: el.name + ' cloned',
      }
    },
    log(evt) {
      window.console.log(evt)
    },
  },
}
</script>

<style lang="scss" scoped></style>
