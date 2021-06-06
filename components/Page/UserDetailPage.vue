<template>
  <div>
    <v-skeleton-loader
      v-if="$fetchState.pending"
      class="mx-auto"
      type="card"
    ></v-skeleton-loader>
    <card-page v-else>
      <template #card-title>User Detail</template>
      <template #card-subtitle>
        <div class="d-flex justify-space-between">
          {{ user ? user.email : '' }}
          <template v-if="user">
            <div v-for="(role, index) in user.rules" :key="index">
              <v-chip outlined color="success">{{ role }}</v-chip>
            </div>
          </template>
        </div>
      </template>
      <template v-if="user" #card-text>
        <v-list subheader three-line>
          <v-subheader>User</v-subheader>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-chip
                  small
                  outlined
                  :color="user.verifiedEmail ? 'success' : 'error'"
                >
                  {{ user.verifiedEmail ? 'Yes' : 'No' }}
                </v-chip>
              </v-list-item-title>
              <v-divider />
              <v-list-item-subtitle>Email Verified</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ user.created_at }}</v-list-item-title>
              <v-divider />
              <v-list-item-subtitle>Join Date</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list v-if="personal" subheader two-line>
          <v-subheader>Personal</v-subheader>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ personal.fullName }} </v-list-item-title>
              <v-divider />
              <v-list-item-subtitle>Fullname</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ personal.biography }}</v-list-item-title>
              <v-divider />
              <v-list-item-subtitle>Biography</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ personal.phone }}</v-list-item-title>
              <v-divider />
              <v-list-item-subtitle> Phone</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{
                personal.alternatePhone
              }}</v-list-item-title>
              <v-divider />
              <v-list-item-subtitle>Alternate Phone</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ personal.address }}</v-list-item-title>
              <v-divider />
              <v-list-item-subtitle>Address</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{
                personal.alternateAddress
              }}</v-list-item-title>
              <v-divider />
              <v-list-item-subtitle>Altenate Address</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <template v-if="families">
          <v-list subheader two-line>
            <v-subheader>Families</v-subheader>
            <family-item
              v-for="(family, index) in families"
              :key="index"
              :family="family"
              :action="false"
            />
          </v-list>
        </template>
        <template v-if="banks">
          <v-list subheader two-line>
            <v-subheader>Bank Atm Card</v-subheader>
            <bank-atm-card-item
              v-for="(bank, index) in banks"
              :key="index"
              :bank-atm-card="bank"
              :action="false"
            />
          </v-list>
        </template>
      </template>
    </card-page>
  </div>
</template>

<script>
import CardPage from '@/components/CardPage/IndexCardPage.vue'
import FamilyItem from '@/components/Item/FamilyItem.vue'
import BankAtmCardItem from '@/components/Item/BankAtmCardItem.vue'
import { getUserDetail } from '@/services/users.js'
export default {
  components: {
    CardPage,
    FamilyItem,
    BankAtmCardItem,
  },
  props: {
    userId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      user: null,
    }
  },
  async fetch() {
    if (this.userId === null) {
      return
    }
    const { data } = await getUserDetail(this.userId)
    this.user = data
  },
  computed: {
    personal() {
      if (!this.user || !this.user.personal) {
        return null
      }

      return this.user.personal
    },
    families() {
      if (!this.personal) {
        return null
      }

      if (!this.user || !this.user.personal.families) {
        return null
      }

      return this.user.personal.families
    },
    banks() {
      if (!this.personal) {
        return null
      }
      if (!this.user || !this.user.personal.bankAtmCards) {
        return null
      }

      return this.user.personal.bankAtmCards
    },
  },
}
</script>

<style lang="scss" scoped></style>
