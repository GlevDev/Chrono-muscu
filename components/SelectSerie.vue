<template>
  <v-row justify="center" class="mx-0">
    <v-dialog v-model="dialog" persistent max-width="400">
      <template v-slot:activator="{on}">
        <v-btn color="#EDC7B7" v-on="on" @click="startChrono" block>Série</v-btn>
      </template>
      <v-card class="pa-4" :color="color">
        <v-card-text class="text-center title">Lancement d'une série</v-card-text>
        <v-card-text class="text-center chrono my-3">{{$showChrono(chrono)}}</v-card-text>
        <v-form v-model="valid">
          <v-row justify="center" class="ma-0" v-if="isPause">
            <v-col cols="12" sm="10">
              <v-text-field
                label="Nombre de répétitions"
                outlined
                v-model="repetitions"
                :rules="[rules.required, rules.number]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="10">
              <v-text-field
                label="Poids par répétition (en kg)"
                outlined
                v-model="poids"
                :rules="[rules.required, rules.number]"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="space-around" class="mx-0">
            <v-col cols="11" sm="5" v-if="!isPause">
              <v-btn @click="setPause" color="#BAB2B5" block>Pause / Arrêt</v-btn>
            </v-col>
            <v-col cols="11" sm="5" v-if="isPause">
              <v-btn @click="startChrono" color="#BAB2B5" block>Reprendre</v-btn>
            </v-col>
            <v-col cols="11" sm="5">
              <v-btn
                @click="finishSet"
                :disabled="!isPause || !valid"
                color="#EDC7B7"
                block
              >Finir la série</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      color: "#82ACC9",
      dialog: false,
      chrono: 0,
      isPause: false,
      intervalID: "",
      repetitions: "",
      poids: "",
      rules: {
        required: value => !!value || "Champ requis",
        number: value => {
          const pattern = /^[+-]?\d+(\.\d+)?$/;
          return pattern.test(value) || "Seuls les chiffres sont acceptés";
        }
      },
      valid: true,
      icon: 'mdi-dumbbell'
    };
  },

  methods: {
    startChrono() {
      this.isPause = false;
      this.intervalID = setInterval(() => {
        this.chrono += 1;
      }, 1000);
    },

    setPause() {
      this.isPause = true;
      clearInterval(this.intervalID);
    },

    finishSet() {
      this.$store.commit("addSession", {
        type: "Serie",
        chrono: this.chrono,
        repetitions: this.repetitions,
        poids: this.poids,
        icon: this.icon
      });
      this.dialog = false;
      this.chrono = 0;
      this.isPause = false;
      this.repetitions = "";
      this.poids = "";
    }
  }
};
</script>

<style>
.chrono {
  font-size: 3rem;
}
</style>