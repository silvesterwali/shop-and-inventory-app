<template>
  <div>
    <index-card-page>
      <template #card-title>Suppliers</template>
      <template #card-subtitle>
        <div>
          <span>All supplier resource</span>
          <v-btn
            color="primary"
            small
            class="mt-n5 float-right"
            to="/inventory/supplier/create"
            >Create new</v-btn
          >
        </div>
      </template>
      <template #card-text>
        <!-- listed  component for page on this slot section -->
        <v-data-table :headers="headers" :items="suppliers" dense>
          <template #[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </template>
    </index-card-page>
  </div>
</template>

<script>
import IndexCardPage from '@/components/CardPage/IndexCardPage.vue'
export default {
  components: {
    // register component here
    IndexCardPage,
  },
  data() {
    return {
      headers: [
        {
          text: 'Name',
          sortable: true,
          align: 'start',
          value: 'name',
        },
        {
          text: 'Phone',
          sortable: true,
          align: 'start',
          value: 'phone',
        },
        {
          text: 'Email',
          sortable: true,
          align: 'start',
          value: 'email',
        },
        {
          text: 'Address',
          sortable: true,
          align: 'start',
          value: 'address',
        },
        {
          text: 'Actions',
          sortable: true,
          align: 'start',
          value: 'action',
        },
      ],
      suppliers: [],
    }
  },
}
</script>

<style lang="scss" scoped></style>
