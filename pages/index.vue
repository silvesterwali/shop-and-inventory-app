<template>
  <div class="mt-n2">
    <v-parallax
      dark
      alt="https://www.pexels.com/photo/dessert-served-on-brown-wooden-tray-109836/"
      :src="require(`~/assets/pexels-mike-109836.png`)"
      class="mb-10"
    >
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="text-h3 font-weight-bold mb-4">{{ title }}</h1>
          <h4 class="subheading">{{ subHeading }}</h4>
        </v-col>
      </v-row>
    </v-parallax>

    <ProductItemShow key="2" class="mt-10" />

    <ProductItemShow key="1" class="mt-10 mb-5" />
  </div>
</template>

<script>
import ProductItemShow from '~/components/Item/ProductItemShow.vue'
export default {
  auth: false,
  components: {
    ProductItemShow,
  },
  data() {
    return {
      title: 'Prima Rasa Group',
      subHeading: 'Aneka macam pie kesukaan anda',
    }
  },
}
</script>
