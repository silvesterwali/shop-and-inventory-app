<template>
  <div>
    <v-card>
      <v-toolbar dense elevation="1">
        <v-toolbar-title>
          <v-chip color="amber darken-1" dark small>
            {{ status }}
          </v-chip>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div>
          <v-btn
            fab
            x-small
            color="primary"
            right
            @click.prevent="openForm = !openForm"
          >
            <v-icon>{{ openForm ? 'mdi-minus' : 'mdi-plus' }} </v-icon>
          </v-btn>
        </div>
      </v-toolbar>
      <v-card-text class="pa-1">
        <template v-if="openForm">
          <InlineTodoForm :open-form.sync="openForm" :status="status" />
        </template>
        <span v-for="(todo, index) in todos" :key="index">
          <TodoSheet :todo="todo" />
        </span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import TodoSheet from '~/components/Sheet/TodoSheet.vue'
import InlineTodoForm from '~/components/Forms/Todo/InlineTodoForm.vue'
export default {
  components: {
    TodoSheet,
    InlineTodoForm,
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
      todos: [
        {
          description: 'lorem inpum dolor amet',
          status: 'Plan',
        },
        {
          description: 'lorem inpum dolor amet',
          status: 'Plan',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
