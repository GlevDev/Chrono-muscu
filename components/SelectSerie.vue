<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{on}">
        <v-btn color="teal accent-3" v-on="on" @click="startChrono">Ajouter une série</v-btn>
      </template>
      <v-card><v-card-title>Lancement d'une série</v-card-title>
        <v-card-text class="text-center chrono my-3">{{showChrono}}</v-card-text>
        <v-card-actions>
          <v-btn @click="setPause" v-if="!isPause" color="red lighten-2">Pause / Arrêt</v-btn>
          <v-btn @click="startChrono" v-if="isPause" color="green lighten-2">Reprendre</v-btn>
          <v-btn @click="finishSet" :disabled="!isPause" color="blue darken-1">Finir la série</v-btn>
        </v-card-actions>
      </v-card>
      
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      chrono: 0,
      isPause: false,
      intervalID: ''
    };
  },

  methods: {
    startChrono() {
      this.isPause = false;
      this.intervalID = setInterval(() => {
        this.chrono += 1;
      }, 1000)
    },

    setPause() {
      this.isPause = true;
      clearInterval(this.intervalID);
    },

    finishSet() {
      this.dialog = false;
      this.chrono = 0;
      this.isPause = false;
    }
  },

  computed: {
    showChrono() {
      let minute;
      Math.floor(this.chrono / 60) > 0 ? minute = (Math.floor(this.chrono / 60))+'\'' : minute = '';
      let seconde = this.chrono % 60+'\"';
      return minute+seconde;
    }
  }
};
</script>

<style>
.chrono {
  font-size: 3rem;
}
</style>