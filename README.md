---
theme: channing-cyan
---

*大家所见到的大多数都是有规则截图,可以应付大部分的应用场景,但是对于图片处理,想要将规则交给用户,普通的截图已经满足不了用户了,那我们能不能前端实现图片的任意规则截取,接下来让我一起探讨一下吧!*
    
![Apr-13-2021 11-12-21.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5314309251f44bd83401ff07495d1f5~tplv-k3u1fbpfcp-watermark.image)

### 通过 svg 实现 图片截取
使用svg中clipPath image标签 通过id 映射, 动态位置polygon的坐标,实现图片的截取

```html
    <div>
        <div class="content" @mousemove="mousemove" @mouseup="(e) => {mouseup(e);}">
          <!-- 画布展示 -->
          <svg
            ref="blackSvg"
            class="blackSvg"
            xmlns="http://www.w3.org/2000/svg"
            width="300"
            height="300"
          >
            <defs>
              <clipPath id="clippath">
                <polygon :points="points"></polygon>
              </clipPath>
            </defs>
            <image
              xmlns:link="http://www.w3.org/1999/xlink"
              href="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3228549874,2173006364&fm=26&gp=0.jpg"
              width="300"
              height="300"
              preserveAspectRatio="none"
              style="clip-path: url(#clippath)"
            ></image>
          </svg>
          <!-- 拖拽点 -->
          <ul class="interception">
            <li
              v-for="item in 4"
              :ref="`li${item}`"
              :key="item"
              @mousedown="(e) => {mousedown(e, item);}"
            ></li>
          </ul>
          <!-- 底图展示 -->
          <img
            class="blackImge"
            src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3228549874,2173006364&fm=26&gp=0.jpg"
            alt=""
          />
          <!-- 遮罩层 -->
          <div class="blackDiv"></div>
    </div>
  </div>
```
### css部分
```css
<style lang="sass">
.blackDiv
    width: 100%
    height: 100%
    position: absolute
    top: 0
    z-index: 2
    background: rgba(0,0,0, 1)
.content
    width:300px
    height:300px
    text-align: left
    position: relative
    .blackSvg
        position: absolute
        top: 0
        z-index: 3
    .blackImge
        position: absolute
        top: 0
        left: 0
        width: 300px
        height: 300px
    .interception
        list-style: none
        position: absolute
        top: 0
        margin: 0
        padding: 0
        z-index: 3
        >li
            position: absolute
            width: 10px
            height: 10px
            background: blue
            border-radius: 50%
            cursor: pointer
            &:hover
                transform: scale(1.2)
                transition-duration: .2
        >li:nth-child(1)
            top: 10px
            left: 10px
        >li:nth-child(2)
            top: 10px
            left: 100px
        >li:nth-child(3)
            top: 100px
            left: 100px
        >li:nth-child(4)
            top: 100px
            left: 10px
</style>
<script>

```

```js
export default {
  name: 'Canvas',
  data() {
    return {
      points: '0 0,300 0,300 300,0 300', // 图片展示初始化
      status: false,
      index: 0,
      disX: 0,
      disY: 0,
      coordinates: { // 初始化拖拽点
        1: [0, 0],
        2: [300, 0],
        3: [300, 300],
        4: [0, 300],
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      for (let key in this.coordinates) {
        const left = this.coordinates[key][0];
        const top = this.coordinates[key][1];
        this.$refs[`li${key}`].style.left = `${left}px`;
        this.$refs[`li${key}`].style.top = `${top}px`;
        if (key == 2 || key == 3) {
          this.$refs[`li${key}`].style.left = `${left - 10}px`;
        }
        if (key == 3 || key == 4) {
          this.$refs[`li${key}`].style.top = `${top - 10}px`;
        }
      }
      document.onmouseup = () => {
        this.status = false;
      };
    });
  },
  methods: {
    //鼠标按下
    mousedown(e, index) {
      this.status = true;
      this.index = index;
      this.disX = e.clientX - this.$refs[`li${index}`].offsetLeft;
      this.disY = e.clientY - this.$refs[`li${index}`].offsetTop;
    },
    // 鼠标抬起
    mouseup(e) {
      this.status = false;
    },
    // 鼠标移动
    mousemove(e) {
      if (this.status) {
        let left = e.clientX - this.disX;
        let top = e.clientY - this.disY;
        this.$refs[`li${this.index}`].style.left = `${left}px`;
        this.$refs[`li${this.index}`].style.top = `${top}px`;
        this.coordinates[this.index] = [left, top];
        const pointsArr = [];
        for (let item in this.coordinates) {
          pointsArr.push(
            Array.from(this.coordinates[item], (e) => {
              return e + 5;
            })
          );
        }
        this.points = pointsArr.join(' ');
      }
    },
  },
};
```
### 效果图展示

![Apr-13-2021 11-12-21.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5314309251f44bd83401ff07495d1f5~tplv-k3u1fbpfcp-watermark.image)

