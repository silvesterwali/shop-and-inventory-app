<template>
  <div>
    <v-row>
      <v-col lg="12" md="12" sm="12">
        <family-group :user-id="userId" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FamilyGroup from '@/components/Group/FamilyGroup.vue'
export default {
  components: {
    FamilyGroup,
  },
  layout: 'personal',
  head() {
    return {
      title: 'Families',
      meta: [
        {
          uid: 'description',
          name: 'description',
          content: 'Add or update family member',
        },
      ],
    }
  },
  computed: {
    userId() {
      return this.$auth.user._id
    },
  },
}
</script>

<style lang="scss" scoped></style>
