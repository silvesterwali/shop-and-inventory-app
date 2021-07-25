<template>
  <div>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="user !== null" @click="goToStep(1)"
          >Data User</v-stepper-step
        >
        <v-divider />
        <v-stepper-step
          step="2"
          :complete="profileComplete"
          @click="goToStep(2)"
          >Personal</v-stepper-step
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
          <v-btn
            v-if="profileComplete"
            to="/admin/user"
            color="primary"
            small
            text
            class="float-right mt-4"
            >Finish</v-btn
          >
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import UserForm from '~/components/Forms/User/UserForm.vue'
import Profile from '~/components/Forms/Profile.vue'
export default {
  components: {
    UserForm,
    Profile,
  },
  data() {
    return {
      step: 1,
      user: null,
      profileComplete: false,
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
  },
  methods: {
    goToStep(step) {
      if (this.user !== null) {
        this.step = step
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
