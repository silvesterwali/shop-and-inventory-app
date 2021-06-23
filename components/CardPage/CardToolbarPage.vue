<template>
  <v-card elevation="1" min-height="350" flat>
    <v-toolbar dense elevation="1">
      <v-toolbar-title><slot name="title">Title</slot></v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="action">
        <!-- if using for page recommend to use \component\Nav\Toolbar\ToolbarNav.vue -->
      </slot>
    </v-toolbar>
    <slot name="content">
      <!-- define your content here -->
    </slot>
  </v-card>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
