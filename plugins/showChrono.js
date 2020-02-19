import Vue from "vue";

Vue.prototype.$showChrono = number => {
  let minute;
  Math.floor(number / 60) > 0
    ? (minute = Math.floor(number / 60) + "'")
    : (minute = "");
  let seconde = (number % 60) + '"';
  return minute + seconde;
};
