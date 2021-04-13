<template>
 <div>
    <div class="clock">
      <p style="text-align: center;line-height:30px;">时钟</p>
      <p style="text-align: center;line-height:20px;">{{showTime}}</p>
      <ul class="timeList">
        <li v-for="item in 12">{{item}}</li>
        <li>{{(new Date()).getHours() > 12 ? '下午':'上午'}}</li>
        <!-- 辅助线 -->
        <!-- <ul class="subline"><li v-for="item in 5"></li></ul> -->
        <ul class="timePointer"><li ref="date1"></li><li ref="date2"></li><li ref="date3"></li> 
        </ul>
      </ul>
    </div>
 </div>
</template>
<style lang="sass" scoped>
.clock
  width: 300px
  height: 300px
  border: 1px solid #ccc
  .timePointer
    position: relative
    padding-left: 0
    width: 100%
    top: 50%
    list-style: none
    left: 0
    transform: translate(0, -50%)
    >li
      list-style: none
      height: 2px
      width: 100%
      margin-top: 1px
      position: absolute
      top: -1px
      transform: rotate(90deg)
      &::before
        content: ' '
        width: 54px
        height: 2px
        display: block
        margin-left: 2px
        background: black
        border-radius: 3px
    >li:nth-child(1)
      &::before
        width: 40px
        margin-left: 17px
        background: black
      &::after
        content: ' '
        width: 7px
        height: 7px
        display: block
        position: absolute
        left: 50%
        top: 50%
        transform: translate(-50%, -50%)
        background: black
        border-radius: 50%
    >li:nth-child(2)
      z-index: 1
      &::before
        height: 1px
        width: 60px
        margin-top: 0.5px
        background: red
      &::after
        content: ' '
        width: 4px
        height: 4px
        display: block
        position: absolute
        left: 50%
        top: 50%
        transform: translate(-50%, -50%)
        background: red
        border-radius: 50%
  .subline
    >li
      list-style: none
      position: absolute
      width: 100%
      top: 50%
      left: 0
      border-top: 1px solid red
    >li:nth-child(1)
      transform: rotate(30deg)
    >li:nth-child(2)
      transform: rotate(60deg)
    >li:nth-child(3)
      transform: rotate(90deg)
    >li:nth-child(4)
      transform: rotate(120deg)
    >li:nth-child(5)
      transform: rotate(150deg)
    >li:nth-child(6)
      transform: rotate(180deg)
  .timeList
    padding-left: 0
    margin: 90px auto
    box-sizing: border-box
    width: 120px
    height: 120px
    position: relative
    border-radius: 50%
    background: #ccc
    list-style: none
    overflow: hidden
    border: 4px solid rgb(212,229,236)
    >li
      position: absolute
      font-size: 12px
      &:nth-child(1)
        right: 30px
        top: 4%
      &:nth-child(11)
        left: 28px
        top: 4%

      &:nth-child(2)
        right: 8px
        top: 21%
      &:nth-child(10)
        left: 8px
        top: 21%

      &:nth-child(4)
        right: 9px
        top: 66%
      &:nth-child(8)
        left: 9px
        top: 66%

      &:nth-child(5)
        right: 29px
        top: 83%
      &:nth-child(7)
        left: 29px
        top: 83%

      &:nth-child(3)
        right: 0
        top: 50%
        margin-right: 2px
        transform: translate(0, -50%)
      &:nth-child(9)
        left: 0
        top: 50%
        margin-left: 2px
        transform: translate(0, -50%)  

      &:nth-child(6)
        bottom: 0
        left: 50%
        line-height: 10px
        transform: translate(-50%, 0)
      &:nth-child(12)
        top: 0
        left: 50%
        margin-top: -1px
        transform: translate(-50%, 0)
      &:nth-child(13)
        bottom: 25%
        left: 50%
        font-size: 12px
        color: rgb(170,170,170)
        transform: translate(-50%, 0)
</style>

<script>
export default {
  name: 'Clock',
  data(){
    return {
      RealDom: null,
      showTime: null
    }
  },
  components:{},
  mounted(){
    const date = new Date(); 
    const getHours = date.getHours(); //获取系统时，
    const getMinutes = date.getMinutes(); //获取系统时，
    const getSeconds = date.getSeconds(); //获取系统时，
    const date1 = this.$refs.date1 // 小时
    const date2 = this.$refs.date2 // 秒
    const date3 = this.$refs.date3 // 分
    date1.style.transform = `rotate(${(getHours%12)*30 + 90}deg)`
    date2.style.transform = `rotate(${getSeconds*6 + 90}deg)`
    date3.style.transform = `rotate(${getMinutes*6 + 90}deg)`
    setInterval(()=>{
      const _getHours = (((new Date()).getHours())%12)*30 + 90;
      const _getSeconds = ((new Date()).getSeconds())*6 + 90;
      const _getMinutes = ((new Date()).getMinutes())*6 + 90;
      date1.style.transform = `rotate(${_getHours}deg)`;;
      date2.style.transform = `rotate(${_getSeconds}deg)`;;
      date3.style.transform = `rotate(${_getMinutes}deg)`;;
      this.showTime = `${(new Date()).getHours() > 12 ? '下午':'上午'}${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()<10?'0'+(new Date()).getSeconds():(new Date()).getSeconds()}`; 
    },1000)
  }
};
</script>