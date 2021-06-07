<template>
  <div>
    <v-form ref="formHeader">
      <v-row class="mt-3">
        <v-col
          v-if="dataForm.serialNumber !== null"
          cols="12"
          lg="12"
          sm="12"
          md="12"
        >
          No Transaction :{{ dataForm.serialNumber }}
        </v-col>
        <v-col sm="6" md="6" lg="6">
          <v-select
            v-model="dataForm.suplier"
            dense
            label="Suplier"
            :items="supliers"
            item-text="name"
            item-value="_id"
            placeholder="Supplier"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-menu
            v-model="datePicker"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="dataForm.transactionDate"
                label="Transaction Date"
                prepend-icon="mdi-calendar"
                readonly
                dense
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dataForm.transactionDate"
              @input="datePicker = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <v-textarea
            v-model="dataForm.description"
            class="Description/Note (Optional)"
            rows="2"
          ></v-textarea>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <p>
            mohon mengisi header sebelum mengisi detail product pada transaksi
          </p>
          <v-btn color="primary" class="float-right">{{
            dataForm._id == null ? 'Submit' : 'Update'
          }}</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { getSupplierResources } from '@/services/supplier.js'
export default {
  data() {
    return {
      dataForm: {
        _id: null,
        serialNumber: null,
        description: null,
        suplier: null,
        transactionDate: new Date().toISOString().substr(0, 10),
      },
      supliers: [],
      datePicker: false,
    }
  },
  async fetch() {
    const { data } = await getSupplierResources()
    this.supliers = data
  },
}
</script>

<style lang="scss" scoped></style>
