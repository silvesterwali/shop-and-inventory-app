<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Item Stock</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Product"
                  dense
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  dense
                  label="qty"
                  type="number"
                  step="any"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Unit" dense required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  type="number"
                  step="any"
                  label="price"
                  dense
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="discount"
                  dense
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-textarea dense label="description" rows="2"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    openDialog: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    dialog: {
      set(value) {
        this.$emit('update:openDialog', value)
      },
      get() {
        return this.openDialog
      },
    },
  },
}
</script>
