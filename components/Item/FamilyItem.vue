<template>
  <div>
    <template v-if="!openForm && family !== null">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ family.fullName }}</v-list-item-title>
          <v-list-item-subtitle
            >{{ family.familyStatus }} |
            {{ family.phoneNumber }}</v-list-item-subtitle
          >
        </v-list-item-content>
        <v-list-item-action>
          <div class="d-flex flex-row">
            <v-icon
              title="Edit data"
              small
              color="grey lighten-1"
              @click.prevent="openForm = true"
              >mdi-pencil-outline</v-icon
            >

            <v-icon
              small
              title="Delete"
              color="red lighten-1"
              @click.prevent="dialogDelete = true"
              >mdi-delete-outline</v-icon
            >
          </div>
        </v-list-item-action>
      </v-list-item>
    </template>
    <template v-else>
      <family
        v-bind="$props"
        :family="family"
        :open-form.sync="openForm"
        :child="true"
      />
    </template>
    <v-dialog v-model="dialogDelete" persistent max-width="300">
      <v-card :loading="loading">
        <v-card-title class="headline"> Are you sure? </v-card-title>
        <v-card-text>Will you remove {{ family.fullName }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialogDelete = false">
            Disagree
          </v-btn>
          <v-btn
            :loading="loading"
            color="green darken-1"
            text
            @click.prevent="sendDelete"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Family from '@/components/Forms/Family.vue'
import { deleteFamily } from '@/services/personal.js'
export default {
  name: 'FamilyItem',
  components: {
    Family,
  },
  props: {
    userId: {
      type: String,
      default: null,
    },
    family: {
      type: Object,
      default: null,
    },
    reloadStatus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openForm: false,
      dialogDelete: false,
      loading: false,
    }
  },
  watch: {
    openForm: {
      immediate: true,
      handler(value) {
        if (value === false) {
          this.$emit('update:reloadStatus', true)
        }
      },
    },
  },
  methods: {
    async sendDelete() {
      try {
        this.loading = true
        await deleteFamily(this.userId, this.family._id)
        this.$emit('update:reloadStatus', true)
        this.dialogDelete = false
        this.loading = false
      } catch (err) {}
    },
  },
}
</script>

<style lang="scss" scoped></style>
