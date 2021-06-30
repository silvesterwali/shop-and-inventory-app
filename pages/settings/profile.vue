<template>
  <div>
    <v-row>
      <v-col md="12" sm="12" lg="12">
        <Profile :user-id="userId" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Profile from '@/components/Forms/Profile.vue'
export default {
  components: {
    Profile,
  },
  layout: 'personal',
  head() {
    return {
      title: 'Setting profile',
      meta: [
        {
          uid: 'description',
          name: 'description',
          content: 'Set user profile',
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
