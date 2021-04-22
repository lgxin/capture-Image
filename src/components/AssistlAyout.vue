<template>
    <div class="assistl-ayout" ref ="assistlAyout" @mousemove="mousemove" @mouseup="mouseup">
       <div class="btn-default" ref='btn-001' @mousedown="(e)=>{bthMousedown(e,'btn-001')}">按钮1</div>
       <div class="btn-default" ref='btn-002' @mousedown="(e)=>{bthMousedown(e,'btn-002')}">按钮2</div>
       <!-- <div class="btn-default" ref='btn-003' @mousedown="(e)=>{bthMousedown(e,'btn-003')}">按钮3</div> -->
       <div class="assistl-line">
            <div class="line-001" ref="line-001"></div>
            <div class="line-002" ref="line-002"></div>
            <div class="line-003" ref="line-003"></div>
            <div class="line-004" ref="line-004"></div>
            <div class="line-005" ref="line-005"></div>
            <div class="line-006" ref="line-006"></div>
       </div>
    </div>
</template>
<style>
body{
    background: rgb(204 204 203 / 27%)
}
</style>

<style lang="sass" scoped>
.assistl-ayout
    margin: 100px auto
    height: 500px
    width: 800px
    border: 1px solid rgb(204 204 203 / 27%)
    border-radius: 4px
    background: #fff
    user-select: none
    position: relative
    overflow: hidden
    box-sizing: border-box
    .btn-default
        box-sizing: border-box
        width: 80px
        height: 30px
        line-height:30px
        text-align: center
        border-radius: 4px
        font-size: 12px
        border: 1px solid #007fff 
        position: absolute
        top: 50%
        left: 30%
        z-index: 100
    .assistl-line
        >div
            position: absolute
            box-sizing: border-box
            display: none
        >div:nth-child(-n+3)
            width: 100%
            height: 1px
            border-bottom: 1px dotted #007fff 
        >div:nth-last-child(-n+3)
            position: absolute
            width: 1px
            height: 100%
            border-right: 1px dotted #007fff 
</style>

<script>
export default {
  name: 'AssistlAyout',
  data(){
    return {
        btnMove:{
            'btn-001': {
                top: 100,
                left: 100
            },
            'btn-002': {
                top: 170,
                left: 150
            }
        },
        status: false,
        ref: '',
        assignAttributeStatus: false,
        assignAttribute: {}
    }
  },
  components:{},
  methods: {
    mousemove(e){
        if (!this.status) return false;
        const ref = this.ref;
        const {x, y} = this.btnMove[ref];
        let left = e.clientX - x;
        let top = e.clientY - y;
        const {offsetWidth,offsetHeight} = this.$refs[ref];
        if (top<=0) top = 0;
        if (left<=0) left = 0;
        this.$refs[ref].style.top = top + 'px';
        this.$refs[ref].style.left = left + 'px';
        this.btnMove[ref].left = left;
        this.btnMove[ref].top = top;
        this.boundaryCalculate({left:left,top:top,offsetWidth,offsetHeight})
    },
    boundaryCalculate({top,left,offsetWidth,offsetHeight}){
        for (const key in this.btnMove) {
            if (key !== this.ref) {
                const {top:_top, left: _left} = this.btnMove[key];
                const {offsetWidth:_offsetWidth,offsetHeight:_offsetHeight} = this.$refs[key];
                // 左右
                if (
                    (
                        left <= _left && _left - (left + _offsetWidth) <= 1000
                        && top + offsetHeight/2 >= _top
                        && top + offsetHeight/2 <= _top + _offsetHeight
                    ) || (
                        left >= _left + _offsetWidth && left <= _left + _offsetWidth + 1000
                        && top + offsetHeight/2 >= _top
                        && top + offsetHeight/2 <= _top + _offsetHeight
                    )
                ) {
                    if (
                        top + offsetHeight/2 >= _top + _offsetHeight/2 - 5
                        &&
                        top + offsetHeight/2 <= _top + _offsetHeight/2 + 5
                    ) {
                        top = _top;
                        this.assignAttributeStatus = true;
                        this.assignAttribute = {top:_top}
                        if (left + 10 >= _left+_offsetWidth&& left - (_left+_offsetWidth) <= 10 && _left+_offsetWidth<=left+offsetWidth) {
                            this.assignAttribute.left = _left+_offsetWidth;
                        }
                        if (_left - (left + offsetWidth) <= 10 && _left+_offsetWidth>=left+offsetWidth) {
                             this.assignAttribute.left = _left - offsetWidth;
                        }
                    } else {
                        this.assignAttributeStatus = false;
                        this.assignAttribute = {}
                    }
                    this.assistLine1(
                        {left:_left,top:_top},
                        {offsetWidth:_offsetWidth,offsetHeight:_offsetHeight})
                } else {
                    this.clearAssistLine1()
                }
                // 上下
                if (
                    (top >= _top + _offsetHeight 
                        && top - (_top + _offsetHeight) <= 1000
                        && left + offsetWidth/2 >= _left
                        && left + offsetWidth/2 <= _left + _offsetWidth
                    ) || (
                        top <= _top && _top - (top + offsetHeight) <= 1000
                        && left + offsetWidth/2 >= _left
                        && left + offsetWidth/2 <= _left + _offsetWidth
                    )
                ) {
                     if (
                        left + offsetWidth/2 >= _left + _offsetWidth/2 - 5
                        &&
                        left + offsetHeight/2 <= _left + _offsetWidth/2 + 5
                    ) {
                        left = _left;
                        this.assignAttributeStatus = true;
                        this.assignAttribute = {left:_left};
                    } else {
                        this.assignAttributeStatus = false;
                        this.assignAttribute = {}
                    }
                   this.assistLine2(
                        {left:_left,top:_top},
                        {offsetWidth:_offsetWidth,offsetHeight:_offsetHeight})
                } else {
                    this.clearAssistLine2()
                }
            }
        }
    },
    assistLine1({left, top}, {offsetWidth,offsetHeight}){
        this.$refs['line-001'].style.display = 'block';
        this.$refs['line-002'].style.display = 'block';
        this.$refs['line-003'].style.display = 'block';
        this.$refs['line-001'].style.top = top-1 + 'px'
        this.$refs['line-002'].style.top = top + offsetHeight/2 +'px';
        this.$refs['line-003'].style.top = top + offsetHeight + 'px';
    },
    assistLine2({left, top}, {offsetWidth,offsetHeight}){
        this.$refs['line-004'].style.display = 'block';
        this.$refs['line-005'].style.display = 'block';
        this.$refs['line-006'].style.display = 'block';

        this.$refs['line-004'].style.height = this.$refs.assistlAyout.scrollHeight + 'px';
        this.$refs['line-004'].style.left = left - 1 + 'px';

        this.$refs['line-005'].style.height = this.$refs.assistlAyout.scrollHeight + 'px';
        this.$refs['line-005'].style.left = left + offsetWidth/2 +'px';

        this.$refs['line-006'].style.height = this.$refs.assistlAyout.scrollHeight + 'px';
        this.$refs['line-006'].style.left = left + offsetWidth +'px';
    },
    clearAssistLine2(){
        this.$refs['line-004'].style.display = 'none';
        this.$refs['line-005'].style.display = 'none';
        this.$refs['line-006'].style.display = 'none';
    },
    clearAssistLine1(){
        this.$refs['line-001'].style.display = 'none';
        this.$refs['line-002'].style.display = 'none';
        this.$refs['line-003'].style.display = 'none';
    },
    mouseup(){
        this.status = false;
        if (!this.ref) return;
        this.$refs[this.ref].style.cursor = "auto";
        if (Object.keys(this.assignAttribute).length) {
            for(let key in this.assignAttribute){
                this.$refs[this.ref].style[key] = this.assignAttribute[key] + 'px';
            }
        }
        this.btnMove[this.ref].top = this.$refs[this.ref].offsetTop;
        this.btnMove[this.ref].left = this.$refs[this.ref].offsetLeft;
        setTimeout(()=>{
            this.clearAssistLine1()
            this.clearAssistLine1()
        }, 1000)
    },
    bthMousedown(e,ref){
        this.status = true;
        this.ref = ref;
        this.$refs[ref].style.cursor = "move";
        const {offsetLeft,offsetTop} = this.$refs[ref];
        this.btnMove[ref].x = e.clientX - offsetLeft;
        this.btnMove[ref].y = e.clientY - offsetTop;
        this.btnMove[ref] = Object.assign(this.btnMove[ref],{
            x: e.clientX - offsetLeft,
            y: e.clientY - offsetTop,
            top: offsetTop,
            left: offsetLeft})
    }
  },
  mounted(){
    //   btn-001//
    for (const key in this.btnMove) {
        this.$refs[key].style.top = this.btnMove[key].top + 'px';
        this.$refs[key].style.left = this.btnMove[key].left + 'px';
    }
  }
};
</script>