<template>
  <v-list disabled v-if="getSessions.length != 0" :color="main ? '#EEE2DC' : ''">
          <v-list-item v-for="(session, index) in getSessions" :key="index" class="list">
            <v-list-item-icon>
              <v-icon :large="main">{{session.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
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
</template>

<script>
import { mapGetters } from "vuex";

export default {
props: ['main'],

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