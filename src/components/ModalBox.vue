<template>
  <div style="width:100vw;height:100vh;" @mousemove="mousemove" @mouseup="mouseup">
        <div class="modal-box" ref="modalBox">
          <div class="m-header" ref="MHeader" @mousedown="(e)=>{headerMousedown(e, 'headerMove')}">
            <div class="btn-operation">
              <ul>
                <li><span>＋</span></li>
                <li><span>一</span></li>
                <li @click="changeScreen"></li>
              </ul>
            </div>
            <div></div>
            <div></div>
          </div>
          <div class="m-content"></div>
          <div class="m-fooder"></div>
          <ul class="btn-move">
            <li
              @mousedown="(e)=>{dotMousedown(e, item)}"
              :class="item.class" :key="item.dotType" v-for="item in dotAssistList"
            ></li>
            <li 
              @mousedown="(e)=>{lineMousedown(e, item)}"
              :class="item.class" :key="item.lineType" v-for="item in lineAssistList"></li>
          </ul>
      </div>
  </div>
</template>
<style lang="sass" scoped>
.modal-box
  width: 40vw
  height: 30vh
  position: absolute
  // top: 50%
  // left: 50%
  background: #fff
  border: 1px solid rgb(121,124,125)
  box-shadow: 0px 3px 8px #ccc
  border-radius: 6px
  .m-header
    height: 40px
    border-bottom: 1px solid #fff
    border-radius: 4px 4px 0 0
    background: rgb(53,56,59)
    display: flex
    .btn-operation
      height: 100%
      cursor: pointer
      >ul
        height: 100%
        display: flex
        align-items: center
        &:hover
          >li
            >span
              opacity: 1
          >li:nth-child(3)
            &::after,
            &::before
              opacity: 1
        >li
          width: 25px
          height: 25px
          background: transparent
          border-radius: 50%
          text-align: center
          line-height: 25px
          box-sizing: border-box
          visibility: revert
          padding-top: 1px
          color: #fff
          transform: scale(0.6)
          >span
            opacity: 0
            transition: opacity .2s
        >li:nth-child(1)
          transform: scale(0.6) rotate(45deg)
          background: rgb(254,74,70)
          color: rgb(142,0,2)
        >li:nth-child(2)
          background: rgb(255,192,75)
          color: rgb(174,141,52)
        >li:nth-child(3)
          background: rgb(114,190,71)
          position: relative
          &::before,
          &::after
            content: ' '
            position: absolute
            opacity: 0
            transition: opacity .2s
          &::before
            border-left: 8px solid rgb(2,89,19)
            border-top: 8px solid transparent
            margin: 6px 0px 0px -3px
            transform: rotate(179deg)
          &::after
            border-left: 8px solid rgb(2,89,19)
            border-bottom: 8px solid transparent
            bottom: 0
            left: 0
            margin: 0px 0px 7px 7px
            transform: rotate(270deg)
  .btn-move
    >li:nth-child(-n+4)
      position: absolute
      border-left: 10px solid transparent
      border-bottom: 10px solid transparent
    >.btn-left-top,
    >.btn-right-bottom
      cursor: nwse-resize
    >.btn-right-top,
    >.btn-left-bottom
      cursor: nesw-resize
    >.btn-left-top
      top:0
      left: 0
    >.btn-right-top
      top: 0
      right: 0
      transform: rotate(90deg)
    >.btn-right-bottom
      right: 0
      bottom: 0
      transform: rotate(180deg)
    >.btn-left-bottom
      left: 0
      bottom: 0
      transform: rotate(-90deg)
    >li:nth-last-child(-n+4)
      position: absolute
    >.btn-top-line,
    >.btn-bottom-line
      width: calc( 100% - 16px )
      height: 2px
      background: transparent
      margin-left: 8px
      cursor: ns-resize	
    >.btn-left-line,
    >.btn-right-line
      width: 2px
      height: calc( 100% - 16px )
      background: transparent
      margin-top: 8px
      top: 0
      cursor: ew-resize
    >.btn-top-line
      top: -1px
    >.btn-bottom-line
      bottom: -1px
    >.btn-left-line
      left: -1px
    >.btn-right-line
      right: -1px
</style>

<script>
export default {
  name: 'ModalBox',
  data() {
    return {
      headerMove: {
        x: 0,
        y: 0
      },
      modalBox:{
        top:0,
        left:0
      },
      status: false,
      typeMove: null,
      lineType: null,
      dottype: null,
      dotAssistList: [
        {
          class: 'btn-left-top',
          type: 'dotMove',
          dotType: 1
        },
        {
          class: 'btn-right-top',
          type: 'dotMove',
          dotType: 2
        },
        {
          class: 'btn-right-bottom',
          type: 'dotMove',
          dotType: 3
        },
        {
          class: 'btn-left-bottom',
          type: 'dotMove',
          dotType: 4
        }
      ],
      lineAssistList: [
        {
          class: 'btn-top-line',
          type: 'lineMove',
          lineType: 1
        },
        {
          class: 'btn-right-line',
          type: 'lineMove',
          lineType: 2
        },
        {
          class: 'btn-bottom-line',
          type: 'lineMove',
          lineType: 3
        },
        {
          class: 'btn-left-line',
          type: 'lineMove',
          lineType: 4
        }
      ],
      lineMove:{
        x: 0,
        y: 0
      },
      oldLineMove: {
        width: 0,
        height: 0,
        x:0,
        y:0
      },
      newMove:{
        width: 0,
        height: 0,
        left: 0,
        top: 0
      },
      changeScreenStatus: false
    };
  },
  methods: {
    headerMousedown(e, type){
      this.typeMove = type;
      this.status = true;
      this.$refs.MHeader.style.cursor = "move";
      const {offsetLeft,offsetTop} = this.$refs.modalBox
      this.headerMove.x = e.clientX - offsetLeft;
      this.headerMove.y = e.clientY - offsetTop;
    },
    mousemove(e) {
      if (!this.status) return;
      this._mousemove(e)
    },
    _mousemove(e){
      switch(this.typeMove){
        case 'headerMove':
          this._headerMove(e);
          break;
        case 'lineMove':
          this._lineMove(e,this.lineType);
          break;
        case 'dotMove':
          this._dotMove(e,this.dotType);
          break;
      }
    },
    _lineMove(e, type) {
      let top = 0,left = 0,right=0,bottom=0;
      const {x, y} = this.lineMove;
      const {x:oldX,y:oldY,width,height} = this.oldLineMove;
      const {offsetWidth, offsetHeight,offsetLeft,offsetTop} = this.$refs.modalBox;
      let X = e.clientX - x;
      let Y = e.clientY - y;
      if (type === 1) {
        // this.$refs.modalBox.style.top = offsetTop;
        this.$refs.modalBox.style.removeProperty('top')
        console.log(offsetTop)
        this.$refs.modalBox.style.bottom = document.body.clientHeight - (height + oldY) + 'px';
        this.$refs.modalBox.style.height = height +( oldY - Y) + 'px'
        this.newMove = Object.assign(this.newMove,{
          top: Y,
          height: height +( oldY - Y)
        })
      }
      if (type === 4) {
        this.$refs.modalBox.style.removeProperty('left');
        this.$refs.modalBox.style.right = document.body.clientWidth - (width + oldX) + 'px';
        this.$refs.modalBox.style.width = width + (oldX - X) + 'px';
        this.newMove = Object.assign(this.newMove,{
          left: X,
          width: width + e.clientX - offsetLeft
        })
      }
      if (type === 2) {
        this.$refs.modalBox.style.left = this.newMove.left + 'px';
        this.$refs.modalBox.style.width = e.clientX - offsetLeft  + 'px';
        this.newMove = Object.assign(this.newMove,{
          width: e.clientX - offsetLeft
        })
      }
      if (type === 3) {
         this.$refs.modalBox.style.top = this.newMove.top + 'px';
         this.$refs.modalBox.style.height = e.clientY - offsetTop  + 'px';
         this.newMove = Object.assign(this.newMove,{
          height: e.clientY - offsetTop
        })
      }
    
    },
    _dotMove(e, type) {
      let top = 0,left = 0,right=0,bottom=0;
      const {x, y} = this.lineMove;
      const {x:oldX,y:oldY,width,height} = this.oldLineMove;
      const {offsetWidth, offsetHeight,offsetLeft,offsetTop} = this.$refs.modalBox;
      let X = e.clientX - x;
      let Y = e.clientY - y;
      if (type === 1) {
        // right he bottom 不变
        this.$refs.modalBox.style.removeProperty('top')
        this.$refs.modalBox.style.removeProperty('left')
        this.$refs.modalBox.style.right = document.body.clientWidth - (width + oldX) + 'px';
        this.$refs.modalBox.style.bottom = document.body.clientHeight - (height + oldY) + 'px';
        this.$refs.modalBox.style.width = width + (oldX - X) + 'px';
        this.$refs.modalBox.style.height =  height +( oldY - Y) + 'px'
        this.newMove = Object.assign(this.newMove,{
          left: X,
          top: Y,
          width: width + (oldX - X),
          height: e.clientY - offsetTop
        })
      }
      if (type == 2) {
        this.$refs.modalBox.style.removeProperty('top')
        this.$refs.modalBox.style.left = this.newMove.left + 'px';
        this.$refs.modalBox.style.bottom = document.body.clientHeight - (height + oldY) + 'px';
        this.$refs.modalBox.style.width =  e.clientX - offsetLeft + 'px';
        this.$refs.modalBox.style.height =  height +( oldY - Y) + 'px';
         this.newMove = Object.assign(this.newMove,{
          left: this.newMove.left,
          top: -2*oldYoldY + Y,
          width: e.clientX - offsetLeft,
          height: height +( oldY - Y)
        })
      }
      if (type === 3) {
        this.$refs.modalBox.style.left = offsetLeft + 'px';
        this.$refs.modalBox.style.top = offsetTop + 'px';
        this.$refs.modalBox.style.width = e.clientX - offsetLeft  + 'px';
        this.$refs.modalBox.style.height = e.clientY - offsetTop  + 'px';
        this.newMove = Object.assign(this.newMove,{
          width: e.clientX - offsetLeft,
          height: e.clientY - offsetTop,
          left: offsetWidth/2 + left,
          top: offsetHeight/2 + top
        })
      }
      if (type === 4) {
        this.$refs.modalBox.style.removeProperty('top');
        this.$refs.modalBox.style.removeProperty('left');
        this.$refs.modalBox.style.top = offsetTop + 'px';
        this.$refs.modalBox.style.right = document.body.clientWidth - (width + oldX) + 'px';
        this.$refs.modalBox.style.width = width + (oldX - X) + 'px';
        this.$refs.modalBox.style.height = e.clientY - offsetTop + 'px';
        this.newMove = Object.assign(this.newMove,{
          width: width + (oldX - X),
          height: e.clientY - offsetTop,
          left: -2*oldX + X,
          top: offsetTop
        })
      }
    },
    _headerMove(e){
      const {x, y} = this.headerMove;
      let left = e.clientX - x;
      let top = e.clientY - y;
      const {offsetLeft,offsetTop,offsetWidth, offsetHeight} = this.$refs.modalBox;
      this.modalBox = Object.assign(this.modalBox, {x,y});
      this.$refs.modalBox.style.left = left + 'px';
      this.$refs.modalBox.style.top = top + 'px';
      this.newMove = Object.assign(this.newMove,{
        left: left,
        top: top,
        width: offsetWidth,
        height: offsetHeight
      })
    },
    dotMousedown(e, item) {
      this.status = true;
      this.typeMove = item.type;
      this.dotType = item.dotType;
      const {offsetLeft,offsetTop,offsetWidth, offsetHeight} = this.$refs.modalBox;
      this.lineMove.x = e.clientX - offsetLeft;
      this.lineMove.y = e.clientY - offsetTop;
      this.oldLineMove.x = offsetLeft;
      this.oldLineMove.y = offsetTop;
      this.oldLineMove.width = offsetWidth;
      this.oldLineMove.height = offsetHeight;
    },
    lineMousedown(e, item) {
      this.status = true;
      this.typeMove = item.type;
      this.lineType = item.lineType;
      const {offsetLeft,offsetTop,offsetWidth, offsetHeight} = this.$refs.modalBox;
      this.lineMove.x = e.clientX - offsetLeft;
      this.lineMove.y = e.clientY - offsetTop;
      this.oldLineMove.x = offsetLeft;
      this.oldLineMove.y = offsetTop;
      this.oldLineMove.width = offsetWidth;
      this.oldLineMove.height = offsetHeight;
    },
    mouseup() {
      this.status = false;
      this.$refs.MHeader.style.cursor = "auto";
    },
    changeScreen(){
      this.changeScreenStatus = !this.changeScreenStatus;
      if (this.changeScreenStatus) {
        this.$refs.modalBox.style.left = 0;
        this.$refs.modalBox.style.top = 0;
        this.$refs.modalBox.style.marginLeft = 0;
        this.$refs.modalBox.style.marginTop = 0;
        this.$refs.modalBox.style.width = '100%';
        this.$refs.modalBox.style.height = '100%'
      } else {
        const {width, height, left, top} = this.newMove;
        this.$refs.modalBox.style.left = left + 'px';
        this.$refs.modalBox.style.top = top + 'px';
        this.$refs.modalBox.style.width = width + 'px';
        this.$refs.modalBox.style.height = height + 'px'
      }
    }
  },
  mounted() {
    
  },
  computed: {
  },
};
</script>
