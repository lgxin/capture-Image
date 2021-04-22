<template>
    <div class="assistl-ayout" ref ="assistlAyout" @mousemove="mousemove" @mouseup="mouseup" @mousedown="mousedown">
        <div class="select-box" ref="selectBox">
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
    .select-box
        position: absolute
        border: 1px dotted #ccc
        opacity: 0
        transform: opacity .4
        box-sizing: border-box
</style>

<script>
export default {
  name: 'SelectBox',
  data(){
    return {
        status: false,
        btnMove: {
            x: 0,
            y: 0,
            left: 0,
            top: 0
        },
        ref: 'selectBox'
    }
  },
  methods: {
    mousemove(e){
        if (!this.status) return false;
        const ref = this.ref;
        const {x, y, top:_top,left:_left,offsetWidth,offsetHeight} = this.btnMove;
        let left = e.clientX - x;
        let top = e.clientY - y;
        if (top<=0) top = 0;
        if (left<=0) left = 0;
        if (y > e.clientY - _top && x > e.clientX - _left) {
            this.$refs[ref].style.removeProperty('left');
            this.$refs[ref].style.removeProperty('top');
            this.$refs[ref].style.right = offsetWidth - x + 'px';
            this.$refs[ref].style.bottom = offsetHeight - y + 'px';
        } else if (x > e.clientX - _left && y === this.$refs[ref].offsetTop) {
            this.$refs[ref].style.removeProperty('left');
            this.$refs[ref].style.right = offsetWidth - x + 'px';
        } else if (y > e.clientY - _top && x === this.$refs[ref].offsetLeft) {
            this.$refs[ref].style.removeProperty('top');
            this.$refs[ref].style.bottom = offsetHeight - y + 'px';
        } else {
            this.$refs[ref].style.top = y + 'px';
            this.$refs[ref].style.left = x + 'px';
        }
        this.$refs[ref].style.width = Math.abs(e.clientX - x - _left) + 'px';
        this.$refs[ref].style.height =Math.abs(e.clientY - y - _top) + 'px';
    },
    mouseup(){
        this.status = false;
    },
    mousedown(e){
        this.status = true;
        const {offsetLeft,offsetTop, offsetWidth,offsetHeight} = this.$refs['assistlAyout'];
        this.$refs[this.ref].style.opacity = '1';
        this.btnMove = Object.assign(this.btnMove,{
            x: e.clientX - offsetLeft,
            y: e.clientY - offsetTop,
            top: offsetTop,
            left: offsetLeft,
            offsetWidth,
            offsetHeight
        })
    }
  },
  mounted(){}
};
</script>