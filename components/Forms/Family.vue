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
        <v-btn :loading="loading" type="submit" color="primary">Add</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import errorKey from '@/mixins/errorKey'
import { createFamily } from '@/services/personal'
export default {
  mixins: [errorKey],
  props: {
    userId: {
      type: String,
      default: null,
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
  methods: {
    validateForm() {
      if (!this.$refs.familyFrom.validate()) {
        return false
      }
      this.errors = null
      this.loading = true
      this._createFamily()
    },
    async _createFamily() {
      try {
        await createFamily(this.dataForm)
        this.loading = false
      } catch (err) {
        this.errors = err.response.data
        this.errors = false
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
