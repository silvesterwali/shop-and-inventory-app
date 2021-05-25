<template>
  <div>
    <v-row>
      <v-col md="12" sm="12" lg="12"></v-col>
    </v-row>
  </div>
</template>
<script>
export default {
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
      return this.$Auth.user._id
    },
  },
}
</script>

<style lang="scss" scoped></style>
