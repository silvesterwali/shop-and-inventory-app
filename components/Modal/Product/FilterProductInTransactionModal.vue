<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card :loading="loading">
        <v-card-title> Filter Berdasarakan rentang waktu </v-card-title>
        <v-card-text>
          <VDatePicker v-model="filter.start_date" label="Awal Mulai" />
          <VDatePicker v-model="filter.end_date" label="Hingga Tanggal" />
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="red darken-1"
            :loading="loading"
            text
            @click="dialog = false"
            >Cancel</v-btn
          >
          <v-spacer />
          <v-btn
            color="primary"
            :loading="loading"
            @click="$emit('reload', true)"
            >Load</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import VDatePicker from '~/components/DatePicker/VDatePicker.vue'
export default {
  components: {
    VDatePicker,
  },
  props: {
    // control the ***dialog*** with this props
    dialogFilter: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // make sure  that ***dialogFilter*** is using ***sync*** props
    dialog: {
      set(value) {
        this.$emit('update:dialogFilter', value)
      },
      get() {
        return this.dialogFilter
      },
    },
    filter: {
      set(value) {
        this.$emit('input', value)
      },
      get() {
        return this.value
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
