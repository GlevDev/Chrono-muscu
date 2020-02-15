<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="5">
        <SelectSerie />
      </v-col>
      <v-col cols="5">
        <v-btn>Ajouter une pause</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SelectSerie from '~/components/SelectSerie'

export default {
  components: {
    SelectSerie
  }
}
</script>

<style>

</style>
