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
      <v-col cols="12" sm="8" md="6" lg="4" class="text-center">
        <!-- <v-card v-for="(session, index) in getSessions" :key="index" class="mb-2 pa-2" :color="session.color">
          <v-card-text class="text-center headline">{{session.type}}<span v-if="session.numSerie">&nbsp;n°{{session.numSerie}}</span><span>&nbsp;-&nbsp;{{showChrono(session.chrono)}}</span><span v-if="session.numSerie"> - {{session.repetitions}} répétitions à {{session.poids}} kg</span></v-card-text>
        </v-card>-->
        <v-list disabled v-if="getSessions.length != 0" color="#EEE2DC">
          <v-list-item v-for="(session, index) in getSessions" :key="index" class="list">
            <v-list-item-icon>
              <v-icon v-if="session.type === 'Serie'" large>mdi-dumbbell</v-icon>
              <v-icon v-if="session.type === 'Pause'" large>mdi-alarm</v-icon>
            </v-list-item-icon>
            <v-list-item-content >
              <v-list-item-title class="subtitle-2">
                {{session.type}}
                <span v-if="session.numSerie">&nbsp;n°{{session.numSerie}}</span>
                <span>&nbsp;-&nbsp;{{showChrono(session.chrono)}}</span>
                <span
                  v-if="session.numSerie"
                >- {{session.repetitions}} répétitions à {{session.poids}} kg</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="11" sm="5" class="mx-2" v-if="getSessions.length != 0">
        <Finish />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SelectSerie from "~/components/SelectSerie";
import SelectPause from "~/components/SelectPause";
import Finish from '~/components/Finish'
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },

  components: {
    SelectSerie,
    SelectPause,
    Finish
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
};
</script>

<style>
.back {
  background: #eee2dc;
  height: 100%;
}

.list:not(:last-child) {
  border-bottom: 1px solid grey;
}
</style>
