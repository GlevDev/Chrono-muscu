<template>
  <v-container class="pa-0">
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="400" v-if="getSessions.length != 0">
        <template v-slot:activator="{on}">
          <v-btn :color="color" v-on="on" block>Terminer la séance</v-btn>
        </template>
        <v-card class="pa-4" :color="color">
          <v-card-text class="text-center title">Êtes-vous sûr(e) ?</v-card-text>
          <v-row justify="space-around" class="mx-0">
            <v-col cols="11" sm="5">
              <v-btn @click="dialog = false" color="#BAB2B5" block>Non</v-btn>
            </v-col>
            <v-col cols="11" sm="5">
              <v-btn @click="theEnd" color="#EDC7B7" block>Oui</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row>
      <v-dialog v-model="end" width="90vw" persistent>
        <v-card id="printArea">
          <v-card-text
            class="text-center title"
          >Récapitulatif de la séance du {{date.toLocaleDateString()}}</v-card-text>
          <v-list-item-content v-if="getSessions.length != 0">
            <v-list-item>
              <v-icon>mdi-chevron-right</v-icon>
              <span>Nombre de sessions de travail : {{nbrSeries}}</span>
            </v-list-item>
            <v-list-item>
              <v-icon>mdi-chevron-right</v-icon>
              <span>Poids total manipulé : {{poidsTotal}} kg</span>
            </v-list-item>
            <v-list-item>
              <v-icon>mdi-chevron-right</v-icon>
              <span>Temps d'échauffement : {{$showChrono(tempsWarm)}}</span>
            </v-list-item>
            <v-list-item>
              <v-icon>mdi-chevron-right</v-icon>
              <span>Temps de travail : {{$showChrono(tempsTravail)}}</span>
            </v-list-item>
            <v-list-item>
              <v-icon>mdi-chevron-right</v-icon>
              <span>Temps de pause : {{$showChrono(tempsPause)}}</span>
            </v-list-item>
            <v-list-item>
              <v-icon>mdi-chevron-right</v-icon>
              <span>Temps d'étirement : {{$showChrono(tempsStretch)}}</span>
            </v-list-item>
            <v-list-item>
              <v-icon>mdi-chevron-right</v-icon>
              <span>Temps total : {{$showChrono(tempsTotal)}}</span>
            </v-list-item>
          </v-list-item-content>
          <ListeSeries />
          <v-row justify="center" id="ignore">
            <v-col cols="5">
              <v-btn @click="printPDF" color="#EDC7B7" block>Sauvegarder</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import ListeSeries from "~/components/ListeSeries";
import { mapGetters } from "vuex";
import jsPDF from "jspdf";

export default {
  data() {
    return {
      color: "#CC7BA1",
      dialog: false,
      tempsTravail: 0,
      tempsPause: 0,
      tempsWarm: 0,
      tempsStretch: 0,
      tempsTotal: 0,
      intervalID: "",
      end: false,
      nbrSeries: 0,
      poidsTotal: 0,
      date: new Date()
    };
  },

  components: {
    ListeSeries
  },

  methods: {
    // clôture de la boite de dialogue de confirmation de fin de séance
    // ouverture de la boite de dialogue du récapitulatif de la séance
    // calcul des données de la séance
    theEnd() {
      this.dialog = false;
      this.end = true;
      for (let el of this.getSessions) {
        this.tempsTotal += el.chrono;
        switch(el.type) {
          case "Pause":
            this.tempsPause += el.chrono;
            break;
          case "Warm-up":
            this.tempsWarm += el.chrono;
            break;
          case "Stretching":
            this.tempsStretch += el.chrono;
            break;
          default:
            this.tempsTravail += el.chrono;
            this.nbrSeries++;
            this.poidsTotal += el.repetitions * el.poids;
            break;
        }
      }
    },

    printPDF() {
      let doc = new jsPDF({ format: "letter" });
      const elementHandler = {
        "#ignore": function(element, renderer) {
          return true;
        }
      };
      const source = document.getElementById("printArea");
      doc.fromHTML(source, 15, 0.5, {
        elementHandlers: elementHandler
      });
      const showDate = `${this.date.getDate()}-${this.date.getMonth() +
        1}-${this.date.getFullYear()}`;
      doc.save(`seance-${showDate}.pdf`);
      window.localStorage.clear();
      this.$store.commit("clearSession");
      this.end = false;
    }
  },

  computed: {
    ...mapGetters(["getSessions"])
  }
};
</script>

<style>
</style>