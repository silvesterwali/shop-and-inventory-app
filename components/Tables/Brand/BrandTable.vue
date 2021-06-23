<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="fetchState.pending"
      class="elevation-1"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Item management</v-toolbar-title>
          <v-devider class="mt-4" inset vertical />
          <v-btn color="primary" class="mb-2">New Item</v-btn>
        </v-toolbar>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click.prevent="editItem(item)"
          >mdi-pencil</v-icon
        >
        <v-icon small class="mr-2" @click.prevent="deleteItem(item)"
          >mdi-delete</v-icon
        >
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      headres: [
        {
          text: 'name',
          value: 'name',
        },
        {
          text: 'email',
          value: 'email',
        },
        {
          text: 'actions',
          value: 'actions',
          sortable: false,
        },
      ],
      items: [],
      selectedItem: null,
      deleteDialog: false,
      editDialog: false,
    }
  },
  fetch() {},
  methods: {
    /**
     * deleteItem
     **/
    deleteItem(item) {
      this.selectedItem = item
      this.deleteDialog = true
    },
    /**
     * editItem
     **/
    editItem(item) {
      this.selectedItem = item
      this.editDialog = true
    },
  },
}
</script>
<style lang="scss" scoped></style>
