<template>
  <div>
    <v-card>
      <v-card-title>Family Member </v-card-title>
      <v-card-subtitle>
        <v-row>
          <v-col
            md="4"
            lg="4"
            sm="4"
            :order="!$vuetify.breakpoint.mobile ? 'last' : ''"
          >
            <v-sheet class="mt-3">
              Anggota keluarga anda . Pastikan data anggota keluarga sudah benar
              dan sesuai
            </v-sheet>
          </v-col>
          <v-col md="8" lg="8" sm="8">
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
                  <v-btn icon>
                    <v-icon small color="grey lighten-1">mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <p>Anda dapat menambah dan mengupdate anggota keluarga anda</p>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'FamilyGroup',
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
}
</script>

<style lang="scss" scoped></style>
