<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="400">
        <template v-slot:activator="{on}">
          <v-btn color="#CC7BA1" v-on="on" block>Terminer la séance</v-btn>
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
      <v-dialog v-model="end" width="90vw">
        <v-card id="printArea">
          <v-card-text
            class="text-center title"
          >Récapitulatif de la séance du {{new Date().getDate()}}/{{new Date().getMonth()}}/{{new Date().getFullYear()}}</v-card-text>
          <v-list-item-content disabled v-if="getSessions.length != 0" color="#EEE2DC">
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
              <span>temps de travail : {{showChrono(tempsTravail)}}</span>
            </v-list-item>
            <v-list-item>
              <v-icon>mdi-chevron-right</v-icon>
              <span>temps de pause : {{showChrono(tempsPause)}}</span>
            </v-list-item>
            <v-list-item>
              <v-icon>mdi-chevron-right</v-icon>
              <span>temps total : {{showChrono(tempsTotal)}}</span>
            </v-list-item>
          </v-list-item-content>
          <v-list-item-content disabled v-if="getSessions.length != 0" color="#EEE2DC">
            <v-list-item v-for="(session, index) in getSessions" :key="index" class="list">
              <v-list-item-icon>
                <v-icon v-if="session.type === 'Serie'" large>mdi-dumbbell</v-icon>
                <v-icon v-if="session.type === 'Pause'" large>mdi-alarm</v-icon>
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
          </v-list-item-content>
          <v-row justify="center">
            <v-col cols="11" sm="5">
              <v-btn @click="printPDF" color="#EDC7B7" block>Sauvegarder</v-btn>
            </v-col>
          </v-row>
          
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import jsPDF from 'jspdf';

export default {
  data() {
    return {
      color: "#CC7BA1",
      dialog: false,
      tempsTravail: 0,
      tempsPause: 0,
      tempsTotal: 0,
      intervalID: "",
      end: false,
      nbrSeries: 0,
      poidsTotal: 0
    };
  },

  methods: {
    theEnd() {
      this.dialog = false;
      this.end = true;
      for(let el of this.getSessions) {
        this.tempsTotal += el.chrono;
        if(el.type === "Serie") {
          this.tempsTravail += el.chrono;
          this.nbrSeries ++;
          this.poidsTotal += el.repetitions * el.poids;
        } else if(el.type === "Pause") {
          this.tempsPause += el.chrono;
        }
      }
    },

    showChrono(number) {
      let minute;
      Math.floor(number / 60) > 0
        ? (minute = Math.floor(number / 60) + "'")
        : (minute = "");
      let seconde = (number % 60) + '"';
      return minute + seconde;
    },

    printPDF() {
      let doc = new jsPDF();
      const source = document.getElementById("printArea");
      doc.fromHTML(source, 15, 15, {width: 170})
      doc.save("seance.pdf")
    }
  },

  computed: {
    ...mapGetters(["getSessions"])
  }
};
</script>

<style>
</style>