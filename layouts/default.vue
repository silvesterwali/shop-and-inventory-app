<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="$auth.loggedIn"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(list, index) in listWithNoGroup"
          :key="index"
          :to="list.url"
        >
          <v-list-item-action>
            <v-icon> {{ list.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-title>{{ list.title }}</v-list-item-title>
        </v-list-item>
        <v-list-group
          v-for="item in listGroup"
          :key="item.title"
          :prepend-icon="item.icon"
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.child"
            :key="child.title"
            :to="child.url"
            exact
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item to="/todos">
          <v-list-item-action>
            <v-icon> mdi-apps</v-icon>
          </v-list-item-action>
          <v-list-item-title>Todos</v-list-item-title>
        </v-list-item>
        <v-list-item to="/settings/profile">
          <v-list-item-action>
            <v-icon> mdi-apps</v-icon>
          </v-list-item-action>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>

        <template
          v-if="
            $auth.loggedIn && $auth.user.email === 'silvesterlhwali@gmail.com'
          "
        >
          <v-list-group
            v-for="item in itemsDev"
            :key="item.title"
            :prepend-icon="item.icon"
          >
            <template #activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="child in item.child"
              :key="child.title"
              :to="child.url"
              exact
            >
              <v-list-item-content>
                <v-list-item-title v-text="child.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app dense tile>
      <template v-if="$auth.loggedIn">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
        </v-btn>
        <v-btn icon @click.stop="clipped = !clipped">
          <v-icon>mdi-application</v-icon>
        </v-btn>
        <v-btn icon @click.stop="fixed = !fixed">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </template>

      <v-toolbar-title v-text="title" />
      <v-spacer />
      <template v-if="$auth.loggedIn">
        <p class="my-auto mr-1">{{ $auth.user.username }}</p>
        <v-btn class="mr-1" tile title="Feedback" to="/feedback" icon>
          <v-icon>mdi-comment-quote-outline</v-icon>
        </v-btn>
        <v-btn text tile @click="$auth.logout()">Log out</v-btn>
      </template>
      <template v-else>
        <v-btn text :exact="false" tile class="mr-1 ml-1" to="/login"
          >Login</v-btn
        >
        <v-btn text :exact="false" tile to="/register">Register</v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <v-container :fluid="$route.name === 'index'">
        <nuxt />
      </v-container>
    </v-main>
    <v-snackbar
      v-model="snackbar"
      :timeout="3500"
      :color="snackbarMessage.color ? snackbarMessage.color : 'success'"
      right
      top
    >
      {{ snackbarMessage.text }}
    </v-snackbar>
    <Footer />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
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
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          url: '/',
        },
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          url: '/dashboard',
        },
        {
          icon: 'mdi-apps',
          title: 'Branch',
          url: '/branch',
        },

        {
          icon: 'mdi-apps',
          title: 'Admin',
          child: [
            {
              title: 'User',
              url: '/admin/user',
            },
          ],
        },
        {
          icon: 'mdi-apps',
          title: 'Inventory',
          child: [
            {
              title: 'Product',
              url: '/inventory/product',
            },
            {
              title: 'Brand',
              url: '/inventory/brand',
            },
            {
              title: 'Supplier',
              url: '/inventory/supplier',
            },
            {
              title: 'Customer',
              url: '/inventory/customer',
            },
            {
              title: 'Stock In',
              url: '/inventory/stock-in',
            },
            {
              title: 'Stock Out',
              url: '/inventory/stock-out',
            },
          ],
        },
      ],
      itemsDev: [
        {
          icon: 'mdi-apps',
          title: 'Development',
          child: [
            {
              title: 'Feedback',
              url: '/development/feedback',
            },
          ],
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Prima Rasa Group',
      snackbar: false,
    }
  },

  computed: {
    ...mapState(['message']),
    snackbarMessage() {
      if (this.message === null) {
        return {
          text: 'default message',
          color: 'success',
        }
      }
      return this.message
    },
    listGroup() {
      const items = this.items
      return items.filter((e) => e.child && e.child.length > 0)
    },
    listWithNoGroup() {
      const items = this.items
      return items.filter((e) => e.url !== undefined)
    },
    itemDevs() {
      const items = this.itemsDev
      return items.filter((e) => e.child && e.child.length > 0)
    },
  },

  watch: {
    message: {
      immediate: true,
      handler(value) {
        if (value !== null) {
          this.snackbar = true
        }
      },
    },
    snackbar: {
      immediate: true,
      handler(value) {
        if (value === false) {
          this.$store.commit('SET_MESSAGE', null)
        }
      },
    },
  },
  beforeMount() {
    if (this.$nuxt.$route.name === 'index') {
      this.drawer = false
    }
  },
}
</script>
