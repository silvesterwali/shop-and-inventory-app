/* eslint-disable nuxt/no-globals-in-created */
<template>
  <v-app dark>
    <v-app-bar
      :color="showBackgroud ? 'transparent' : ''"
      fixed
      app
      dense
      elevate-on-scroll
      tile
    >
      <v-app-bar-nav-icon @click.stop="$router.push('/')" />

      <v-toolbar-title v-if="!$vuetify.breakpoint.mobile" v-text="title" />
      <v-spacer />
      <template v-if="$auth.loggedIn">
        {{ $auth.user.email }}
        <v-btn text @click="$auth.logout()">Log out</v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="3" sm="4" lg="3" class="shrink">
            <v-card>
              <v-list dense>
                <v-subheader>Setting Your data </v-subheader>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-img src="https://i.pravatar.cc/200"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-title>Your Account</v-list-item-title>
                </v-list-item>

                <v-list-item-group v-model="model">
                  <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    dense
                    link
                    class="white--text"
                    active-class="primary"
                    :to="item.url"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" md="9" sm="8" lg="9" class="shrink">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from '@/components/Footer/index.vue'
export default {
  components: {
    Footer,
  },
  data() {
    return {
      offsetTop: 0,
      windowHeight: this.$vuetify.breakpoint.mdAndUp ? 7 : 10,
      clipped: false,
      drawer: false,
      fixed: false,
      goDark: true,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Inventory',
      items: [
        {
          text: 'Profile',
          url: '/settings/profile',
        },
        {
          text: 'Security',
          url: '/settings/security',
        },
        {
          text: 'Keluarga',
          url: '/settings/keluarga',
        },
        {
          text: 'Account Billing',
          url: '/settings/account-billing',
        },
        {
          text: 'Sound & notify',
          url: '/settings/notify',
        },
      ],
      model: 1,
    }
  },
  computed: {
    themeChange: {
      get() {
        return this.$vuetify ? this.$vuetify.theme.dark : false
      },
      set(key) {
        this.$vuetify.theme.dark = key
      },
    },
    showBackgroud() {
      if (this.$vuetify.breakpoint.mdAndUp && this.windowHeight >= 7) {
        return true
      }
      if (this.$vuetify.breakpoint.smAndDown && this.windowHeight > 8) {
        return true
      }
      return false
    },
  },
  created() {
    if (process.browser) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('scroll', () => {
        // eslint-disable-next-line nuxt/no-globals-in-created
        const height =
          // eslint-disable-next-line nuxt/no-globals-in-created
          document.documentElement.scrollHeight - window.innerHeight
        this.windowHeight =
          // eslint-disable-next-line nuxt/no-globals-in-created
          10 - (document.documentElement.scrollTop / height) * 10
      })
    }
  },
  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollTop
    },
  },
}
</script>
