<template>
  <v-row justify="center" class="mx-0">
    <v-dialog v-model="dialog" persistent max-width="400">
      <template v-slot:activator="{on}">
        <v-btn :color="status.btnStartColor" v-on="on" @click="startChrono" block>{{status.btnStart}}</v-btn>
      </template>
      <v-card class="pa-4" color="#CC7BA1">
        <v-card-text class="text-center title">{{status.text}}</v-card-text>
        <v-card-text class="text-center chrono my-3">{{$showChrono(chrono)}}</v-card-text>

        <v-row justify="center" class="ma-0">
          <v-col cols="11" sm="5">
            <v-btn
              @click="finishSet"
              color="#EDC7B7"
              block
            >{{status.btnEnd}}</v-btn>
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
      dialog: false,
      chrono: 0,
      intervalID: ""
    };
  },

  props: ["status"],

  methods: {
    startChrono() {
      this.intervalID = setInterval(() => {
        this.chrono += 1;
      }, 1000);
    },

    finishSet() {
      this.$store.commit("addSession", {
        type: this.status.type,
        chrono: this.chrono,
        icon: this.status.icon
      });
      this.dialog = false;
      this.chrono = 0;
      clearInterval(this.intervalID);
    }
  }
};
</script>

<style>
.chrono {
  font-size: 3rem;
}
</style>