<template>
  <div>
    <v-row>
      <v-col lg="12" md="12" sm="12">
        <BankAtmCardGroupComponent :user-id="userId" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BankAtmCardGroupComponent from '@/components/Group/BankAtmCardGroup.vue'
export default {
  name: 'BankAtmCardPage',
  components: {
    BankAtmCardGroupComponent,
  },
  layout: 'personal',
  head() {
    return {
      title: 'Personal Bank-Atm-Card',
      meta: [
        {
          uid: 'description',
          name: 'description',
          content: 'Adding bank atm card for personal',
        },
      ],
    }
  },
  computed: {
    userId() {
      return this.$auth.user._id
    },
  },
}
</script>

<style lang="scss" scoped></style>
