<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <template v-slot:activator="{on}">
        <v-btn color="#BAB2B5" v-on="on" @click="startChrono" block>Lancer une pause</v-btn>
      </template>
      <v-card class="pa-4" :color="color">
        <v-card-text class="text-center title">Une pause bien méritée...</v-card-text>
        <v-card-text class="text-center chrono my-3">{{showChrono(chrono)}}</v-card-text>

        <v-row justify="center" class="ma-0">
          <v-col cols="11" sm="5">
            <v-btn
              @click="finishSet"
              color="#EDC7B7"
              block
            >Finir la pause</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      color: '#CC7BA1',
      dialog: false,
      chrono: 0,
      intervalID: ""
    };
  },

  methods: {
    startChrono() {
      this.intervalID = setInterval(() => {
        this.chrono += 1;
      }, 1000);
    },

    finishSet() {
      this.$store.commit("addSession", {
        type: "Pause",
        chrono: this.chrono,
        color: this.color
      });
      this.dialog = false;
      this.chrono = 0;
      clearInterval(this.intervalID);
    },

    showChrono(number) {
      let minute;
      Math.floor(number / 60) > 0
        ? (minute = Math.floor(number / 60) + "'")
        : (minute = "");
      let seconde = (number % 60) + '"';
      return minute + seconde;
    }
  }
};
</script>

<style>
.chrono {
  font-size: 3rem;
}
</style>