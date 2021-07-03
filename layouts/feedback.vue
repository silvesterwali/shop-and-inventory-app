<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app dense elevate-on-scroll tile>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn text :exact="true" class="mr-1 ml-1" to="/">Back</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Footer from '~/components/Footer/index.vue'
export default {
  components: {
    Footer,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Feedback',
    }
  },
}
</script>
