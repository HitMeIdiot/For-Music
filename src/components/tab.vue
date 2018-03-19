<template>
  <div>
    <div  class="tab">
      <ul>
        <li v-for="(i, index) in list"
            :key="index"
            :class="[index===actIndex?'active':'']"
            @click="cutTab(i,index)">
          {{i.name}}
          <i></i>
        </li>
      </ul>
    </div>
    <slot name="con">

    </slot>
  </div>
</template>
<script>
export default {
  data () {
    return {
      actIndex: 0
    }
  },
  props: {
    list: Array,
    default: []
  },
  components: {
  },
  created () {

  },
  methods: {
    cutTab (i, index) {
      this.actIndex = index
    }
  }
}
</script>
<style scoped lang="scss">
  .tab {
    border-bottom: 1px solid #E1E1E2;
    margin-bottom: 20px;
    text-align: center;
    ul {
      display: flex;
      width: 480px;
      margin: 0 auto;
      li {
        position: relative;
        flex: 1;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
      }
      li.active {
        i {
          position: absolute;
          bottom: 0;
          left: 12px;
          width: 56px;
          height: 2px;
          background: #C62F2F;
        }
      }
    }
  }
</style>
