<template>
    <div>
      <div class="title">
        <p>
          <b>{{title}}</b>
          <tab :list="tabList"></tab>
        </p>
      </div>
    </div>
</template>
<script>
import tab from '@/components/tab_com'
export default {
  data () {
    return {
      tabList: [
        {css: 'icon-caidan1'},
        {css: 'icon-caidan'},
        {css: 'icon-caidan2'}
      ]
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    tab
  },
  created () {
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">
  .title {
    p {
      border-bottom: 1px solid #ddd;
      border-top: 1px solid #ddd;
      display: flex;
      justify-content: flex-end;
      padding: 2px 30px;
      align-items: center;
      b {
        font-size: 12px;
        flex: 1;
        flex-shrink: 0;
      }
      span {
        display: flex;
        i {
          margin-left: 20px;
        }
      }
    }
  }
</style>
