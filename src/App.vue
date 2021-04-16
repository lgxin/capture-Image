<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- 访mac 时钟 -->
  <!-- <v-clock></v-clock> -->
  <!-- <v-overturn-clock></v-overturn-clock> -->
  <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
  <!-- <v-canvas></v-canvas>-->
  <v-calendar placeholder="请输入日期" :value="new Date()"></v-calendar>
</template>

<script>
import VClock from './components/Clock.vue';
import VOverturnClock from './components/OverturnClock.vue';
import VCanvas from './components/Canvas.vue';
import VCalendar from './components/Calendar.vue';
export default {
  name: 'App',
  components: {
    VCanvas,
    VClock,
    VOverturnClock,
    VCalendar
  },
  data(){
    return {
      value: ''
    }
  },
  mounted() {
    var letterCombinations = function (digits) {
      const keys = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
        ['j', 'k', 'l'],
        ['m', 'n', 'o'],
        ['p', 'q', 'r', 's'],
        ['t', 'u', 'v'],
        ['w', 'x', 'y', 'z'],
      ];
      const arr = [];
      if (!digits) {
        return arr;
      }
      if (digits.length === 1) {
        return keys[Number(digits)];
      }
      // 先对数字进行排列组合
      function calc(transArr) {
        let resultArr = [];
        function get(array, index, val) {
          if (!array[index]) {
            resultArr.push(val);
            return;
          }
          array[index].forEach((v, i) => {
            get(array, index + 1, index === 0 ? [v] : [...val, v]);
          });
        }
        get(transArr, 0);
        return resultArr;
      }
      for (let i = 0; i < digits.length; i++) {
        const index = Number(digits[i]) - 2; // 对应keys 中的索引值;
        arr.push(keys[index]);
      }
      const combination = calc(arr);
      const arrs = [];
      for (let j = 0; j < combination.length; j++) {
        arrs.push(combination[j].join(''));
      }
      return arrs;
    };
    const a = letterCombinations('23');
    console.log('%c [a ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', a)
  },
  methods: {}
};
</script>
