<template>
  <div>
    <v-skeleton-loader
      v-if="$fetchState.pending"
      class="mx-auto"
      type="card"
      boilerplate
    ></v-skeleton-loader>
    <v-card v-else>
      <v-card-text>
        <v-row>
          <v-col
            cols="12"
            md="4"
            sm="4"
            lg="4"
            :order="$vuetify.breakpoint.mobile ? 'fisrt' : 'last'"
          >
            <div class="d-flex justify-center">
              <v-badge
                bottom
                overlap
                offset-x="40"
                avatar
                bordered
                content="edit"
                left
                offset-y="20"
                icon="mdi-pencil"
              >
                <v-avatar color="gray" size="100" class="p-2">
                  <v-img src="https://i.pravatar.cc/200"></v-img>
                </v-avatar>
              </v-badge>
            </div>
          </v-col>

          <v-col cols="12" md="8" sm="8" lg="8">
            <v-form ref="profileForm" @submit.prevent="validateForm">
              <v-text-field
                v-model="dataForm.fullName"
                label="Full Name"
                placeholder="Full Name"
                :rules="[
                  (v) => !!v || 'Fullname is required',
                  errorKey('fullName'),
                ]"
              ></v-text-field>
              <v-textarea
                v-model="dataForm.biography"
                rows="2"
                label="Biorgrafi"
                placeholder="Biografi"
              ></v-textarea>
              <p>tell someone that you are there for there</p>
              <v-text-field
                v-model="dataForm.phone"
                :rules="[(v) => !!v || 'Phone is required', errorKey('phone')]"
                label="Phone"
                placeholder="Phone"
              ></v-text-field>
              <v-text-field
                v-model="dataForm.alternatePhone"
                label="Alternate Phone"
                placeholder="Alternate Phone"
              ></v-text-field>
              <v-textarea
                v-model="dataForm.address"
                rows="2"
                label="Address"
                :rules="[errorKey('phone')]"
                placeholder="Address"
              ></v-textarea>
              <v-textarea
                v-model="dataForm.alternateAddress"
                rows="2"
                label="Alternate Address"
                placeholder="Alternate Address"
              ></v-textarea>
              <v-btn
                type="submit"
                :loading="loading"
                class="float-right"
                color="primary"
                >{{ dataForm._id === null ? 'Add' : 'Update' }}</v-btn
              >
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import errorKey from '@/mixins/errorKey.js'
import {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
} from '~/services/personal.js'
export default {
  name: 'ProfileForm',
  mixins: [errorKey],
  props: {
    userId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      dataForm: {
        _id: null,
        userId: this.userId,
        fullName: null,
        phone: null,
        alternatePhone: null,
        address: null,
        alternateAddress: null,
        biography: null,
      },
      errors: null,
      loading: false,
    }
  },
  async fetch() {
    if (this.userId === null) {
      return
    }
    this.loading = true
    const { data } = await getUserProfile(this.userId)
    if (data) {
      this.dataForm = data
    }
    this.loading = false
  },
  methods: {
    validateForm() {
      if (!this.$refs.profileForm.validate()) {
        return
      }
      this.loading = false
      this.errors = null
      if (this.dataForm._id === null) {
        this._createUserProfile()
      } else {
        this._updateUserProfile()
      }
    },
    async _createUserProfile() {
      try {
        await createUserProfile(this.dataForm)
        this.$fetch()
      } catch (err) {
        this.errors = err.response.data
        this.loading = false
      }
    },
    async _updateUserProfile() {
      try {
        this.$fetch()
        await updateUserProfile(this.dataForm._id, this.dataForm)
      } catch (err) {
        this.loading = false
        this.errors = err.response.data
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
