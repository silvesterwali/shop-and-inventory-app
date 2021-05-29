<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          lg="3"
          md="3"
          class="shink"
          :order="$vuetify.breakpoint.mdAndUp ? 'last' : 'fisrt'"
        >
          <slot name="smallinfo"></slot>
        </v-col>
        <v-col cols="12" md="9" lg="9">
          <slot name="content"></slot>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
