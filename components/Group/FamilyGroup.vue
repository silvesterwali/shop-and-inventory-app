<template>
  <div>
    <v-skeleton-loader
      v-if="$fetchState.pending"
      class="mx-auto"
      type="card"
      boilerplate
    ></v-skeleton-loader>
    <v-card v-else>
      <v-card-title>Family Member </v-card-title>

      <v-card-text>
        <v-row>
          <v-col
            v-if="!inStepper"
            md="4"
            lg="4"
            sm="4"
            xs="12"
            cols="12"
            :order="!$vuetify.breakpoint.mobile ? 'last' : ''"
          >
            <v-sheet class="mt-3">
              Add some infomartion about your family. it just optioal only
            </v-sheet>
          </v-col>
          <v-col
            :md="inStepper ? 12 : 8"
            :lg="inStepper ? 12 : 8"
            :sm="inStepper ? 12 : 8"
            xs="12"
          >
            <v-list v-if="families.length > 0">
              <FamilyItem
                v-for="(family, index) in families"
                :key="index"
                :family="family"
                :reload-status.sync="reloadStatus"
                v-bind="$props"
              />
            </v-list>
            <v-divider class="mb-2" />

            <Family
              v-if="openForm"
              v-bind="$props"
              :open-form.sync="openForm"
              :reload-status.sync="reloadStatus"
            />

            <div v-else class="d-flex flex-row">
              <p>You can adding and update family member</p>
              <v-spacer />
              <v-btn small color="primary" @click.prevent="openForm = true"
                >Add More</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import FamilyItem from '@/components/Item/FamilyItem.vue'
import Family from '~/components/Forms/Family/Family.vue'
import { getFamilies } from '~/services/Personal.js'
export default {
  name: 'FamilyGroup',
  components: {
    Family,
    FamilyItem,
  },
  props: {
    userId: {
      type: String,
      default: null,
    },
    inStepper: {
      type: Boolean,
      default: false,
    },
    familyComplete: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      reloadStatus: false, // to reload fomily data from api
      families: [],
      openForm: false,
    }
  },
  async fetch() {
    this.reloadStatus = false
    if (this.userId === null) {
      return
    }
    const { data } = await getFamilies(this.userId)
    if (data) {
      this.families = data
    }
  },
  watch: {
    reloadStatus: {
      immediate: true,
      handler(value) {
        if (value === true && process.client) {
          this.$fetch()
        }
      },
    },
    openForm: {
      immediate: true,
      handler(value) {
        if (value === false && process.client) {
          this.$fetch()
        }
      },
    },
    families: {
      immediate: true,
      handler(value) {
        if (value.length >= 1 && process.client) {
          this.$emit('update:familyComplete', true)
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
