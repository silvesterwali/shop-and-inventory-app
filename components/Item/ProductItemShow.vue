<template>
  <div>
    <v-card class="mt-10 mb-5" height="350" tile elevation="0">
      <v-card-text class="pa-5 mx-auto">
        <v-row>
          <v-col cols="12" lg="6" md="12" sm="12">
            <v-sheet class="mt-n10">
              <v-img
                alt="https://unsplash.com/s/photos/pie"
                :src="require('~/assets/example-product/pie1.jpg')"
                :aspect-ratio="16 / 9"
              >
              </v-img>
            </v-sheet>
          </v-col>
          <v-col cols="12" lg="6" md="12" sm="12">
            <div class="d-flex flex-column pa-5">
              <h2 class="mx-auto mb-5">Pie Kesukaan Anda</h2>
              <v-sheet class="d-flex align-center">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Assumenda explicabo architecto illum similique iste eum!
              </v-sheet>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mb-5" height="350" tile elevation="0">
      <v-card-text class="pa-5 mx-auto">
        <v-row>
          <v-col cols="12" lg="6" md="12" sm="12">
            <div class="d-flex flex-column pa-5">
              <h2 class="mx-auto mb-5">Pie Kesukaan Anda</h2>
              <v-sheet class="d-flex align-center">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Assumenda explicabo architecto illum similique iste eum!
              </v-sheet>
            </div>
          </v-col>
          <v-col cols="12" lg="6" md="12" sm="12">
            <v-sheet class="mt-n10">
              <v-img
                alt="https://unsplash.com/s/photos/pie"
                :src="require('~/assets/example-product/pie2.jpg')"
                :aspect-ratio="16 / 9"
              >
              </v-img>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
