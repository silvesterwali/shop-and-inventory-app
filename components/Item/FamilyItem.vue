<template>
  <div>
    <template v-if="!openForm && family !== null">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{ family.fullName }}</v-list-item-title>
          <v-divider />
          <v-list-item-subtitle
            >Status : {{ family.familyStatus }} | Number :{{
              family.phoneNumber
            }}</v-list-item-subtitle
          >
        </v-list-item-content>
        <v-list-item-action v-if="action">
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
      <Family
        v-bind="$props"
        :family="family"
        :open-form.sync="openForm"
        :reload-status.sync="statusReload"
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
import Family from '~/components/Forms/Family/Family.vue'
import { deleteFamily } from '~/services/Personal.js'
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
    action: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      openForm: false,
      dialogDelete: false,
      loading: false,
    }
  },
  computed: {
    statusReload: {
      get() {
        return this.reloadStatus
      },
      set(value) {
        this.$emit('update:reloadStatus', value)
      },
    },
  },
  methods: {
    async sendDelete() {
      try {
        this.loading = true
        await deleteFamily(this.userId, this.family._id)
      } catch (err) {
        alert(err)
      } finally {
        this.dialogDelete = false
        this.loading = false
        this.statusReload = true
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
