<template>
  <v-container fluid class="back">
    <v-row justify="center">
      <v-col cols="11" sm="5" class="mx-2">
        <SelectSerie />
      </v-col>
      <v-col cols="11" sm="5" class="mx-2">
        <SelectPause />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="11">
        <v-card v-for="(session, index) in getSessions" :key="index" class="mb-2 pa-2" :color="session.color">
          <v-card-text class="text-center headline">{{session.type}}<span v-if="session.numSerie">&nbsp;n°{{session.numSerie}}</span><span>&nbsp;-&nbsp;{{showChrono(session.chrono)}}</span><span v-if="session.numSerie"> - {{session.repetitions}} répétitions à {{session.poids}} kg</span></v-card-text>
          <!-- <v-card-text class="text-center chrono">{{showChrono(session.chrono)}}</v-card-text>
          <v-card-text class="text-center title" v-if="session.numSerie">{{session.repetitions}} répétitions à {{session.poids}} kg</v-card-text> -->
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      
    </v-row>
  </v-container>
</template>

<script>
import SelectSerie from '~/components/SelectSerie'
import SelectPause from '~/components/SelectPause'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
    }
  },

  components: {
    SelectSerie, SelectPause
  },

  methods: {
    showChrono(number) {
      let minute;
      Math.floor(number / 60) > 0
        ? (minute = Math.floor(number / 60) + "'")
        : (minute = "");
      let seconde = (number % 60) + '"';
      return minute + seconde;
    }
  },

  computed: {
    ...mapGetters(["getSessions"])
  }
}
</script>

<style>
.back {
  background: #EEE2DC;
  height: 100%;
}
</style>
