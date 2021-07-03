<template>
  <v-app dark>
    <v-container>
      <v-row no-gutters justify="center" align="center" class="my-10">
        <v-col cols="12" md="8" lg="8" class="my-5">
          <h1 v-if="error.statusCode === 404">
            {{ error.message ? error.message : pageNotFound }}
          </h1>
          <h1 v-else>
            {{ error.message ? error.message : otherError }}
          </h1>
          {{ error }}
          <NuxtLink to="/"> Home page </NuxtLink>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
