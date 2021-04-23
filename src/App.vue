<template>
  <!-- 访mac 时钟 -->
  <!-- <v-clock></v-clock> -->
  <!-- 自动翻页时钟 -->
  <!-- <v-overturn-clock></v-overturn-clock> -->
  <!-- 无规则剪切图片 -->
  <!-- <v-canvas></v-canvas>-->
  <!-- 日期选择组件 -->
  <!-- <v-calendar placeholder="请输入日期" :value="new Date()" @on-change="getDate"></v-calendar> -->
  <!-- 下拉刷新(阻尼效果) -->
  <!-- <v-damp-load></v-damp-load> -->
  <!-- 多变的模态框 -->
  <!-- <v-modal-box></v-modal-box> -->
  <!-- 布局辅助 -->
  <!-- <v-assistl-ayout></v-assistl-ayout> -->
  <!-- 鼠标选中框 -->
  <!-- <v-select-box></v-select-box> -->
  <!-- 全局搜索 -->
  <v-global-search></v-global-search>
</template>

<script>
import VClock from './components/Clock.vue';
import VOverturnClock from './components/OverturnClock.vue';
import VCanvas from './components/Canvas.vue';
import VDampLoad from './components/DampLoad.vue';
import VModalBox from './components/ModalBox.vue';
import VAssistlAyout from './components/AssistlAyout.vue';
import VSelectBox from './components/SelectBox.vue';
import VGlobalSearch from './components/GlobalSearch.vue';

export default {
  name: 'App',
  components: {
    VCanvas,
    VClock,
    VOverturnClock,
    // VCalendar,
    VDampLoad,
    VModalBox,
    VAssistlAyout,
    VSelectBox,
    VGlobalSearch
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
  },
  methods: {
    getDate(date){
      const i = 0;
      const arr = []
      function text(a, b) {
        if (a.length - 1 != i) {
          return;
        }
        if (b.length - 1 != i) {
          return;
        }
        arr.push(a[i],b(i))
        i++
        text(a, b)
      }
    }
  }
};
</script>
