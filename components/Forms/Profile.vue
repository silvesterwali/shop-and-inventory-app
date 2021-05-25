<template>
  <div>
    <v-card>
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
            <v-form>
              <v-text-field
                label="Full Name"
                placeholder="Full Name"
              ></v-text-field>
              <v-textarea
                rows="2"
                label="Biorgrafi"
                placeholder="Biografi"
              ></v-textarea>
              <p>tell someone that you are there for there</p>
              <v-text-field label="Phone" placeholder="Phone"></v-text-field>
              <v-text-field
                label="Alternate Phone"
                placeholder="Alternate Phone"
              ></v-text-field>
              <v-textarea
                rows="2"
                label="Adreess"
                placeholder="Adreess"
              ></v-textarea>
              <v-textarea
                rows="2"
                label="Alternate Adreess"
                placeholder="Alternate Adreess"
              ></v-textarea>
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
} from '@/services/profile.js'
import errorKey from '@/mixins/errorKey.js'
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
      },
      errors: null,
    }
  },
  async fetch() {
    if (this.userId === null) {
      return
    }

    const { data } = await getUserProfile(this.userId)
    if (data) {
      this.dataForm = data
    }
  },
  methods: {
    validateForm() {
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
      }
    },
    async _updateUserProfile() {
      try {
        this.$fetch()
        await updateUserProfile(this.dataForm._id, this.dataForm)
      } catch (err) {
        this.errors = err.response.data
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
