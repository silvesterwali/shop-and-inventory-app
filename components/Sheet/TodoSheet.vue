<template>
  <div
    v-show="show"
    :id="id"
    :draggable="draggable"
    @dragstart="dragStart"
    @dragover.prevent
  >
    <v-hover>
      <template #default="{ hover }">
        <v-sheet rounded="sm" elevation="1" class="mb-1 pa-2">
          <div class="d-flex justify-space-between">
            <span class="d-flex flex-column">
              <span> {{ todo.description }}</span>
              <span style="font-size: 9px">{{
                timeFormat(todo.createdAt)
              }}</span>
            </span>
            <span v-if="hover" class="float-right">
              <div class="d-flex flex-row ml-2">
                <v-icon
                  small
                  color="red darken-1"
                  @click.prevent="$emit('deleteItem', todo)"
                  >mdi-delete-outline</v-icon
                >
                <v-icon
                  small
                  color="primary darken-1"
                  @click.prevent="$emit('edit', todo)"
                  >mdi-pencil-outline</v-icon
                >
              </div>
            </span>
          </div>
        </v-sheet>
      </template>
    </v-hover>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    id: {
      type: String,
      default: 'dragid',
    },
    draggable: {
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
      show: true,
    }
  },
  methods: {
    timeFormat(stringTime) {
      if (stringTime === null) return
      return moment(stringTime).format('DD-MM-YYYY')
    },
    dragStart(e) {
      e.dataTransfer.setData('todo', JSON.stringify(this.todo))
      const self = this
      setTimeout(() => {
        self.show = false
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped></style>
