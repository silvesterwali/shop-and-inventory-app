<template>
  <div>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="user !== null"
          >Data User</v-stepper-step
        >
        <v-divider />
        <v-stepper-step step="2" :complete="profileComplete"
          >Personal</v-stepper-step
        >
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <UserForm />
        </v-stepper-content>
        <v-stepper-content step="2">
          <Profile v-if="user !== null" :user-id="user._id" />
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
}
</script>

<style lang="scss" scoped></style>
