<template>
  <v-app dark>
    <v-navigation-drawer
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
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app dense tile>
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
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <template v-if="$auth.loggedIn">
        <v-btn text @click="$auth.logout()">Log out</v-btn>
      </template>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-snackbar
      v-model="snackbar"
      :timeout="1500"
      :color="snackbarMessage.color ? snackbarMessage.color : 'success'"
      right
      top
    >
      {{ snackbarMessage.text }}
    </v-snackbar>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list dense>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
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
          title: 'Admin',
          child: [
            {
              title: 'User',
              url: '/admin/users',
            },
          ],
        },
        {
          icon: 'mdi-apps',
          title: 'inventory',
          child: [
            {
              title: 'Product',
              url: '/inventory/product',
            },
            {
              title: 'Supplier',
              url: '/inventory/supplier',
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
}
</script>
