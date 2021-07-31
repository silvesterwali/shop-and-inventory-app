<template>
  <div>
    <v-stepper v-model="step" non-linear tile outlined>
      <v-stepper-header>
        <v-stepper-step step="1" :complete="user !== null"
          >Data User</v-stepper-step
        >

        <v-stepper-step
          step="2"
          :complete="profileComplete"
          :editable="user !== null"
          >Personal
        </v-stepper-step>

        <v-stepper-step
          step="3"
          :editable="user !== null"
          :complete="familyComplete"
          >Family</v-stepper-step
        >
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <UserForm :user.sync="user" />
        </v-stepper-content>
        <v-stepper-content step="2">
          <Profile
            v-if="user !== null"
            :user-id="user._id"
            :in-steper="true"
            :profile-complete.sync="profileComplete"
          />
        </v-stepper-content>
        <v-stepper-content step="3">
          <FamilyGroup
            :user-id="user._id"
            :family-complete.sync="familyComplete"
            :in-stepper="true"
          />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import UserForm from '~/components/Forms/User/UserForm.vue'
import Profile from '~/components/Forms/Profile/Profile.vue'
import FamilyGroup from '~/components/Group/FamilyGroup.vue'
export default {
  components: {
    UserForm,
    Profile,
    FamilyGroup,
  },
  props: {
    // this property for exist user
    currentUser: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      step: 1,
      user: null,
      profileComplete: false,
      familyComplete: false,
    }
  },
  watch: {
    user: {
      immediate: true,
      handler(value) {
        if (value !== null) {
          this.step = 2
        }
      },
    },
    profileComplete: {
      immediate: true,
      handler(value) {
        if (value === true) {
          this.step = 3
        }
      },
    },
    // watch the current user if have value
    // will be set the user to update
    currentUser: {
      immediate: true,
      handler(value) {
        if (value !== null) {
          this.user = value
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
