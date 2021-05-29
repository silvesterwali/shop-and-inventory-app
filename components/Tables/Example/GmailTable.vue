<template>
  <div>
    <v-data-table
      v-model="selected"
      dense
      :items="todos"
      :headers="headers"
      item-key="id"
      show-select
    >
      <template #body="{ items }">
        <tbody>
          <tr
            v-for="item in items"
            :key="item.id"
            :search="search"
            @mouseover="selectItem(item)"
            @mouseleave="unSelectItem()"
          >
            <td>
              <v-checkbox
                v-model="selected"
                multiple
                :value="item"
                style="margin: 0px; padding: 0px"
                hide-details
              />
            </td>
            <td width="5%">
              <v-icon :color="item.completed ? 'warning' : ''"
                >mdi-star-outline</v-icon
              >
            </td>
            <td>
              <span v-if="item === selectedItem">
                {{ sliceText(item.title) }}
              </span>
              <span v-else>
                {{ item.title }}
              </span>
            </td>
            <td>
              <div
                v-if="item === selectedItem"
                style="z-index: 1000"
                class="f-flex flex-row"
              >
                <v-btn-toggle group dense tile>
                  <v-btn small icon class="rounded-circle pa-2">
                    <v-icon>mdi-eye-outline</v-icon>
                  </v-btn>
                  <v-btn small icon class="rounded-circle pa-2">
                    <v-icon>mdi-pencil-outline</v-icon>
                  </v-btn>
                  <v-btn small icon class="rounded-circle pa-2">
                    <v-icon>mdi-delete-outline</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    todos: [],
    selected: [],
    selectedItem: false,
    search: '',
    headers: [
      { text: 'Bintang', value: 'completed', sort: false },
      {
        text: 'title',
        value: 'title',
      },
      {
        text: '',
        value: 'actions',
      },
    ],
  }),
  async fetch() {
    const { data } = await this.$axios.get(
      'https://jsonplaceholder.typicode.com/todos'
    )
    this.todos = data
  },
  methods: {
    deleteItem(item) {
      alert(item.title)
    },
    selectItem(item) {
      this.selectedItem = item
    },
    unSelectItem(item) {
      this.selectedItem = false
    },
    sliceText(text) {
      return text.slice(0, 20) + '...'
    },
  },
}
</script>

<style lang="scss" scoped></style>
