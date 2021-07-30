<template>
  <div>
    <v-form ref="familyFrom" @submit.prevent="validateForm">
      <v-row>
        <v-col lg="12" md="12" sm="12">
          <v-text-field
            v-model="dataForm.fullName"
            :rules="[
              (v) => !!v || 'Fullname is requirred',
              errorKey('fullName'),
            ]"
            dense
            placeholder="Fullname"
          ></v-text-field>
        </v-col>
        <v-col lg="6" md="6" sm="6">
          <v-text-field
            v-model="dataForm.familyStatus"
            :rules="[errorKey('familyStatus')]"
            dense
            label="Family Status"
          ></v-text-field>
        </v-col>
        <v-col lg="6" md="6" sm="6">
          <v-text-field
            v-model="dataForm.phoneNumber"
            :rules="[errorKey('phoneNumber')]"
            dense
            label="Phone Number"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="d-flex flex-row" style="widht: 100%">
        <v-spacer />
        <v-btn
          :loading="loading"
          text
          class="mr-1"
          small
          type="button"
          color="error"
          @click.prevent="reload"
          >Cancel</v-btn
        >
        <v-btn :loading="loading" small type="submit" color="primary">{{
          family ? 'update' : 'add'
        }}</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import errorKey from '@/mixins/errorKey'
import { createFamily, updateFamily } from '~/services/Personal'
export default {
  mixins: [errorKey],
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
    child: {
      type: Boolean,
      default: false,
    },
    openForm: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // eslint-disable-next-line vue/no-reserved-keys
      dataForm: {
        _id: null,
        userId: this.userId,
        fullName: null,
        phoneNumber: null,
        familyStatus: null,
      },
      errors: null,
      loading: false,
    }
  },
  watch: {
    family: {
      immediate: true,
      handler(value) {
        if (value !== null) {
          this.dataForm = value
        }
      },
    },
  },
  methods: {
    validateForm() {
      this.errors = null
      this.loading = true
      if (!this.$refs.familyFrom.validate()) {
        return false
      }

      if (this.family !== null) {
        this._updateFamily()
      } else {
        this._createFamily()
      }
    },
    async _createFamily() {
      try {
        await createFamily(this.dataForm)
        this.loading = false
        this.reload()
      } catch (err) {
        this.errors = err.response.data
        this.errors = false
      }
    },
    async _updateFamily() {
      try {
        await updateFamily(this.userId, this.dataForm._id, this.dataForm)
        this.loading = false
        this.reload()
      } catch (err) {
        this.errors = err.response.data
        this.loading = false
      }
    },
    reload() {
      this.$emit('update:openForm', false)
      this.$emit('update:reloadStatus', true)
    },
  },
}
</script>

<style lang="scss" scoped></style>
