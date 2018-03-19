<template>
    <div class="drop">
      <slot name="dropCon"></slot>
    </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  components: {},
  created () {
  },
  methods: {}
}
</script>
<style scoped lang="scss">
  .drop {
    width: 275px;
    height: 365px;
    position: absolute;
    top: 35px;
    left: 7px;
    background: #fff;
    z-index: 8888;
    box-shadow: 0 0 3px 1px #E1E1E2;
  }
</style>
