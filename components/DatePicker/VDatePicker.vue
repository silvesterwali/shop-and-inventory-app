<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Picker in menu"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(date)"> OK </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null,
    },
    rules: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: 'Date',
    },
  },

  data() {
    return {
      menu: false,
    }
  },
  computed: {
    date: {
      set(val) {
        this.$emit('input', val)
      },
      get() {
        return this.value
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
