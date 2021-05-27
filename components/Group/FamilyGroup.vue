<template>
  <div>
    <v-card>
      <v-card-title>Family Member </v-card-title>

      <v-card-text>
        <v-row>
          <v-col
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
          <v-col md="8" lg="8" sm="8" xs="12">
            <v-list v-if="families.length > 0">
              <family-item
                v-for="(family, index) in families"
                :key="index"
                :family="family"
                :reload-status.sync="reloadStatus"
                v-bind="$props"
              />
            </v-list>
            <v-divider class="mb-2" />

            <family
              v-if="addForm"
              v-bind="$props"
              :reload-status.sync="reloadStatus"
            />

            <div v-else class="d-flex flex-row">
              <p>You can adding and update family member</p>
              <v-spacer />
              <v-btn small color="primary" @click.prevent="addForm = true"
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
import Family from '@/components/Forms/Family.vue'
import FamilyItem from '@/components/Item/FamilyItem.vue'
import { getFamilies } from '@/services/personal.js'
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
  },
  data() {
    return {
      reloadStatus: false, // to reload fomily data from api
      families: [],
      addForm: false,
    }
  },
  async fetch() {
    this.addForm = false
    this.reloadStatus = false
    if (this.userId === false) {
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
  },
}
</script>

<style lang="scss" scoped></style>
