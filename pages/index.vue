<template>
  <v-container fluid class="back">
    <v-row>
      <v-card height="50px"></v-card>
      <v-btn color="blue-grey darken-4" top right absolute outlined @click="reinit">
        <v-icon>mdi-restart</v-icon>
      </v-btn>
    </v-row>
    <v-row justify="center">
      <v-col cols="5" sm="4" lg="2" class="mx-1">
        <SelectAuxStatus :status="warm" />
      </v-col>
      <v-col cols="5" sm="4" lg="2" class="mx-1">
        <SelectSerie />
      </v-col>
      <v-col cols="5" sm="4" lg="2" class="mx-1">
        <SelectAuxStatus :status="pause" />
      </v-col>
      <v-col cols="5" sm="4" lg="2" class="mx-1">
        <SelectAuxStatus :status="stretch" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4" class="text-center">
        <ListeSeries :main="true" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="11" sm="5" class="mx-2">
        <Finish />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SelectSerie from "~/components/SelectSerie";
import SelectAuxStatus from "~/components/SelectAuxStatus";
import Finish from "~/components/Finish";
import ListeSeries from "~/components/ListeSeries";

export default {
  data() {
    return {
      pause: {
        type: 'Pause',
        btnStartColor: '#BAB2B5',
        btnStart: 'Recup',
        btnEnd: 'Finir la pause',
        text: 'Une pause bien méritée...',
        icon: 'mdi-alarm'
      },

      warm: {
        type: 'Warm-up',
        btnStartColor: '#CC7BA1',
        btnStart: 'Warm-up',
        btnEnd: 'On peut démarrer',
        text: 'Échauffement',
        icon: 'mdi-run'
      },

      stretch: {
        type: 'Stretching',
        btnStartColor: '#82ACC9',
        btnStart: 'Stretching',
        btnEnd: 'Bien joué...',
        text: 'Étirements',
        icon: 'mdi-yoga'
      }
    };
  },

  components: {
    SelectSerie,
    SelectAuxStatus,
    Finish,
    ListeSeries
  },

  methods: {
    // suppression du cache (persistance du store) + réinitialisation du store
    reinit() {
      window.localStorage.clear();
      this.$store.commit("clearSession");
    }
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
