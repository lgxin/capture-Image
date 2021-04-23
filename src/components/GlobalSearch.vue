<template>
  <div>
    <div class="seatch-input">
      <el-input
        style="width: 60%"
        placeholder="请输入内容"
        size="small"
        v-model="inputVal"
        @input="onChange"
        @keydown="down"
      >
      </el-input>
      <span class="count" v-if="count">{{ index }}/{{ count }}</span>
      <span class="btn-operation">
        <i
          :class="{'el-icon-arrow-down': true, active: !!count}"
          @click="down"
        ></i>
        <i :class="{'el-icon-arrow-up': true, active: !!count}" @click="up"></i>
        <i class="el-icon-close"></i>
      </span>
    </div>
    <div class="content" ref="content">
      Unity Standard Shader为WebGL使用桌面级质量的反射函数 此前，Unity
      WebGL使用的是基于OpenGL ES 2.0图形库的移动简化版Standard
      Shader。现在WebGL使用的是与桌面应用相同的反射函数，因此素材质量得到较大的提高。
      支持软阴影 Unity WebGL将会在服务器未配置压缩的情况下，帮助你处理压缩问题
      此前，WebGL要求将Web服务器设置为gzip压缩模式，以避免用户下载未经过压缩的庞大文件。但是，这个设置的过程过于复杂与困难，因此，我们使WebGL在运行时，将在Web服务器未正确设置提供压缩数据的情况下自动下载gzip压缩格式的数据。压缩数据随后会在客户端以JavaScript.html"
      target="_blank"
      class="relatedlink">JavaScript解压——协议级别的压缩处理会增加额外的延迟（如果你服务器配置正确的话一样能工作），但这样你就不必再去阅读服务器手册以避免巨大的下载请求了。
      数据文件将以LZ4压缩格式保持在内存中
      在WebGL中，你不必访问真实的文件系统。所以，我们会将你所有的Asset一直保留在内存中。在Unity
      5.3，内存中的Asset数据将使用LZ4算法进行压缩，并仅在被加载时才进行解压。这意味着你的Asset数据占用的内存会更少，你程序出现内存耗尽的机会也更少。
      WebGL构建文件能更轻松的重定位到不同的URL
      所有构建过程中产生的文件都能在生成的index.html中找到引用地址。所以，如果你希望将构建数据部署到外部主机，现在的操作将简单许多，因为你需要设置的所有URL都在能在一个地方找到。
      支持WebCam Unity 5.3版本在Unity
      WebGL中增加了对WebCamTexture类的支持，以便能在任何支持getUserMedia
      API的浏览器中访问已连接的摄像头。 WebGL是Unity Cloud Build中的一个平台选项
      团队成员可以直接在浏览器中测试游戏/应用。 WebGL文档的改进
      针对5.3版本，我们对WebGL文档进行了重新制做，增加了许多额外信息。在文档中详细地记录目前WebGL平台尚不支持以及仅受特定浏览器支持的东西。
      BUG的修正 与Unity 5.2.x相比，Unity
      5.3在WebGL方面做了28个Bug修正，以及许多其他亦能惠及WebGL用户却不单独针对WebGL平台的修正。此外，其他一些针对WebGL的Bug修正已在5.2.x的发布周期中随不同补丁部署，现在它们都已整体集成到了Unity5.3中。
    </div>
    <div class="location-line" ref="locationLine">
      <ul>
        <li :style="item.style" v-for="(item, index) in locationLineList"></li>
      </ul>
    </div>
  </div>
</template>
<style>
.el-input__inner {
  background-color: #000 !important;
  color: #fff !important;
  border-width: 0 !important;
  font-size: 12px;
}
.el-input__inner::placeholder {
  color: #fff;
}
.content span {
  display: inline-block;
  background: rgb(255, 254, 56);
  color: #000;
  cursor: pointer
}
.content span:hover{
    transform: scale(1.2);
}
.content span:nth-child(1) {
  background: rgb(255, 138, 53);
}
</style>

<style lang="sass" scoped>
.content
    width: 300px
    padding: 10px
    height: 100%
.location-line
    >ul
        >li
            position: absolute
            right: 0
            top: 0px
            background: rgb(251,221,75)
            border: .5px solid rgb(200,170,56)
            height: 1.5px
            width: 15px
.seatch-input
    position: fixed
    background: #000
    right: 10px
    top: 10px
    width: 300px
    border-radius: 5px
    z-index: 2
    .count
        color: #fff
        height: 32px
        font-size: 12px
    .btn-operation
        position: absolute
        right: 0
        height: 32px
        line-height: 32px
        padding-top: 1px
        top: 0
        >i
            width: 20px
            height: 20px
            font-size: 12px
            cursor: pointer
            color: #fff
            line-height: 20px
            text-align: center
            margin: 0 5px
            border-radius: 50%
            color: rgb(162,165,168)
            transition: background .3s
            &:nth-child(-n+2)
                color: rgb(55,55,58)
            &:nth-child(-n+2).active
                color: rgb(162,165,168)
            &:hover
                background: rgb(50,51,54)
            &:nth-child(3)
                color: rgb(162,165,168)
</style>

<script>
export default {
  name: 'GlobalSearch',
  data() {
    return {
      inputVal: '',
      ref: 'content',
      oldContentText: '',
      count: 0,
      index: 1,
      locationLineList: [],
    };
  },
  mounted() {},
  watch: {
    inputVal(v) {
      if (!v) {
        this.locationLineList = [];
      }
    },
  },
  methods: {
    onChange() {
      const {inputVal, ref} = this;
      const contentText = this.$refs[ref].innerText;
      this.oldContentText = contentText;
      if (!inputVal) {
        this.count = 0;
        this.$refs[ref].innerHTML = this.oldContentText;
        return;
      }
      const rg = new RegExp(`(${inputVal})`, 'gi');
      const newContentText = contentText.replace(rg, '<span>$1</span>');
      this.count = contentText.match(rg)?.length;
      this.$refs[ref].innerHTML = newContentText;
      this.indicateSet();
    },
    down() {
      if (!this.count) return;
      this.index++;
      if (this.index > this.count) {
        this.index = 1;
      }
      this.current(this.index);
    },
    up() {
      if (!this.count) return;
      this.index--;
      if (this.index <= 0) {
        this.index = this.count;
      }
      this.current(this.index);
    },
    current(index) {
      const childrenList = this.$refs[this.ref].children;
      let bgcolor = '';
      for (let i = 0; i < this.count; i++) {
        if (i == index - 1) {
          bgcolor = 'rgb(255,138,53)';
          childrenList[i].style.background = 'rgb(255,138,53)';
        } else {
          bgcolor = 'rgb(255,254,56)';
        }
        childrenList[i].style.background = bgcolor;
      }
      const offsetHeight = document.body.offsetHeight; // 页面可视区高度
      const offsetTop = childrenList[index - 1].offsetTop; // 元素距离浏览器顶部的距离
      if (offsetTop + 100 >= offsetHeight) {
        window.scrollTo(0, offsetTop - 100);
      } else {
        window.scrollTo(0, 0);
      }
      //document.documentElement.scrollTop
    },
    indicateSet() {
      this.locationLineList = [];
      const childrenList = this.$refs[this.ref].children;
      for (let i = 0; i < this.count; i++) {
        const offsetTop = childrenList[i].offsetTop;
        const offsetHeight = childrenList[i].offsetHeight;
        this.locationLineList.push({
          index: i,
          style: {
            top: offsetTop + offsetHeight/2 + 'px',
          },
        });
      }
    },
  },
  mounted() {},
};
</script>
<style></style>
