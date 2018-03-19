<template>
    <div class="over" v-show="$store.state.isCover">
      <span class="iconfont icon-close" @click="$store.state.isCover=false"></span>
      <ul>
        <!--<li v-for="(i,index) in list"-->
            <!--:key="index" :class="[act===index?'active':'']" :style="{background: 'url('+i.originUrl+') center no-repeat',backgroundSize: 'contain'}">-->
        <!--</li>-->
        <li v-for="(i,index) in list"
            :key="index" :class="[actImg===index?'active':'', i.height>700&&i.width>670&&actImg===index?'overHeight': '']">
          <img :src="i.originUrl" alt="" :class="[i.width>800?'overWidth':'']" @click="cutImg($event,i,index)">
        </li>
      </ul>
    </div>
</template>
<script>
export default {
  data () {
    return {
      act: 0
    }
  },
  components: {},
  props: {
    list: {
      type: Array
    },
    actImg: 0
  },
  created () {
  },
  methods: {
    cutImg (e, i, index) {
      let width = i.width
      let offsetX = e.offsetX // 鼠标离当前点击元素的左边距离
      // console.log(offsetX / 2 + '和' + width / 2)
      if (offsetX > width / 2 && offsetX < width) {
        if (index < this.list.length - 1) {
          index++
          this.$parent.actImg = index
        }
      } else {
        if (index === 0) {
          return false
        }
        index--
        this.$parent.actImg = index
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .over {
    position: absolute;
    background: rgba(24,24,24,0.7);
    top: 0;
    left: 0;
    height: 670px;
    min-height: 670px;
    width: 1020px;
    max-width: 1020px;
    z-index: 888;
    text-align: center;
    padding: 0 100px;
    overflow-y: scroll;
    display: flex;
    span {
      position: absolute;
      right: 30px;
      top: 30px;
      font-size: 26px;
      cursor: pointer;
      color: #fff;
    }
    ul {
      display: flex;
      flex: 1;
      li {
        display: none;
        position: relative;
        &.active {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        &.overHeight {
          display: block;
        }
        img.overWidth {
          width: 100%;
        }
        i,em {
          position: absolute;
          left: 0;
          top: 0;
          width: 50%;
          height: 100%;
          background: #666;
        }
        em {
          right: 0;
          background: #ddd;
        }
      }
    }
  }
</style>
