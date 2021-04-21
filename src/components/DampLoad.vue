<template>
  <div class="damp-load">
    <ul
      @touchmove="touchMove($event)"
      @touchend="touchEnd($event)"
      :style="{paddingTop: scrollerheight}"
      @touchstart="touchStart($event)"
    >
      <li v-for="item in 100" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>
<style lang="sass" scoped>
.damp-load
    ul
        padding: 10px 10px
        overflow-scrolling: touch
        >li
            width: 100%
            line-height: 32px
            border: 1px solid #ccc
            margin-bottom: 5px
</style>

<script>
export default {
  name: 'DampLoad',
  data() {
    return {
      scroll_load: {
        top: 0,
        startY: 0,
        touching: false,
        state: 0,
        scrolltop: true,
      },
      timer: null
    };
  },
  methods: {
    touchMove(e) {
      if (!this.scroll_load.touching) return;
      // 手指移动的距离
      const diff = e.targetTouches[0].pageY - this.scroll_load.startY;
      //判断是向上拉还是向下拉
      if (diff > 0) {
        e.preventDefault();
      } else {
        return;
      }
      this.scroll_load.top = Math.floor(diff * 0.40);
      if (this.scroll_load.top >= 500) {
        this.scroll_load.state = 2; //释放刷新。。。。。。2
        this.springback();
      } else {
        this.scroll_load.state = 1; // 开始滑动。。。。。。1
      }
      console.log(e, 'touchMove');
    },
    touchEnd(e) {
      if (window.screen.height <  e.targetTouches[0].pageY - 50) {
        this.scroll_load.touching = false;
        return 0;
      }
      this.scroll_load.touching = false;
      if (this.scroll_load.state === 4) {
        return;
      } // 判断抬起时的高度，是大于100 就开启刷新
      if (this.scroll_load.top >= 500) {
        this.refresh();
      } else {
        console.log(this.scroll_load.top);
        this.scroll_load.state = 0;
        this.springback();
      }
    },
    touchStart(e) {
      // e代表该事件对象，e.targetTouches[0].pageY可以拿到手指        按下的 y轴点
      this.scroll_load.startY = e.targetTouches[0].pageY;
      if (window.screen.height < this.scroll_load.startY - 50) {
        this.scroll_load.touching = false;
        return 0;
      }
      // 开启下拉刷新状态
      this.scroll_load.touching = true;
      this.scroll_load.state = 1;
    },
    refresh() {
        this.springback();
        this.scroll_load.state = 3; // 正在刷新。。。。。。3
        // 在这下面实现你要的刷新方法，查询数据，记得将top、state重置为0
    },
    springback() {
        this.timer = null;
        let speed = 10;
        let g = 2;
        this.timer = setInterval(()=>{
            speed+=g;
            this.scroll_load.top = this.scroll_load.top - parseInt(speed*0.8);
            if (this.scroll_load.top<=0) {
                this.scroll_load.top = 0;
                clearInterval(this.timer);
            }
        }, 15)
    }
  },
  mounted() {
    document.onkeydown=function (e){
        console.log(1)
        var currKey=0,evt=e||window.event;
        currKey=evt.keyCode||evt.which||evt.charCode;
        if (currKey == 123) {
            window.event.cancelBubble = true;
            window.event.returnValue = false;
        }
    }
  },
  computed: {
    scrollerheight() {
      return this.scroll_load.top.toString() + 'px';
    },
  },
};
</script>
