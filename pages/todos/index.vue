<template>
  <div>
    <IndexCardPage>
      <template #card-title>Todo</template>
      <template #card-subtitle>
        <div>
          <span>Create Your todo</span>
        </div>
      </template>
      <template #card-text>
        <!-- listed  component for page on this slot section -->
        <v-row>
          <v-col
            v-for="(status, index) in ['Plan', 'In Progress', 'Done']"
            :key="index"
            cols="12"
            sm="4"
            lg="4"
            md="4"
          >
            <TodoCard :status="status" />
          </v-col>
        </v-row>
      </template>
    </IndexCardPage>
  </div>
</template>

<script>
import IndexCardPage from '@/components/CardPage/IndexCardPage.vue'
import TodoCard from '~/components/Card/Todo/TodoCard.vue'
export default {
  components: {
    // register component here
    IndexCardPage,
    TodoCard,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
