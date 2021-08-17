<template>
  <div :id="id" style="min-height: 50px" @dragover.prevent @drop.prevent="drop">
    <slot />
  </div>
</template>

<script>
import { updateTodoResource } from '~/services/Todo.js'
import setMessage from '~/mixins/setMessage.js'
export default {
  mixins: [setMessage],
  // eslint-disable-next-line vue/require-prop-types
  props: ['id'],
  methods: {
    async drop(e) {
      const todoStr = e.dataTransfer.getData('todo')
      const todo = JSON.parse(todoStr)
      todo.status = this.id
      try {
        const { data } = await updateTodoResource(todo._id, todo)
        this.SET_MESSAGE({ text: data.message, color: 'success' })
      } catch (err) {
        this.SET_MESSAGE({ text: err.response.data.message, color: 'error' })
      } finally {
        this.$emit('reload', true)
      }
      e.target.style.display = 'block'
    },
  },
}
</script>

<style lang="scss" scoped></style>
