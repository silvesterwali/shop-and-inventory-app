<template>
  <div>
    <v-row>
      <v-col sm="12" lg="12" md="12">
        <ChangePassword :user-id="userId" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ChangePassword from '@/components/Forms/ChangePassword.vue'
export default {
  components: {
    ChangePassword,
  },
  layout: 'personal',
  head() {
    return {
      title: 'Security',
      meta: [
        {
          uid: 'decription',
          name: 'description',
          content: 'Security page . update user security',
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
