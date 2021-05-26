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
            <family v-bind="$props" />
            <v-list>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Mawar Melati</v-list-item-title>
                  <v-list-item-subtitle
                    >Instri | 20 maret 1995</v-list-item-subtitle
                  >
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon small color="grey lighten-1">mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Ramadhani </v-list-item-title>
                  <v-list-item-subtitle
                    >Anak I | 07 maret 2018</v-list-item-subtitle
                  >
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon>
                    <v-icon small color="grey lighten-1">mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Agnes mo</v-list-item-title>
                  <v-list-item-subtitle
                    >Anak II | 12 Oktober 2020</v-list-item-subtitle
                  >
                </v-list-item-content>
                <v-list-item-action>
                  <div class="d-flex flex-row">
                    <v-icon title="Edit data" small color="grey lighten-1"
                      >mdi-pencil-outline</v-icon
                    >

                    <v-icon small title="Delete" color="red lighten-1"
                      >mdi-delete-outline</v-icon
                    >
                  </div>
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <div class="d-flex flex-row">
                    <v-btn small text color="primary">
                      Add more
                      <v-icon small title="Add More">mdi-plus</v-icon>
                    </v-btn>
                  </div>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <p>You can adding and update family member</p>
        {{ families }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Family from '@/components/Forms/Family.vue'
import { getFamilies } from '@/services/personal.js'
export default {
  name: 'FamilyGroup',
  components: {
    Family,
  },
  props: {
    userId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isReload: false, // to reload fomily data from api
      families: [],
    }
  },
  async fetch() {
    if (this.userId === false) {
      return
    }
    const { data } = await getFamilies(this.userId)
    if (data) {
      this.families = data
    }
  },
}
</script>

<style lang="scss" scoped></style>
