<template>
    <div class="layer">
      <slot name="lay"></slot>
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
  .layer {
    position: absolute;
    width: 200px;
    padding: 10px;
    left: 55px;
    height: auto;
    top: 12px;
    background: #fff;
    border-radius: 1px;
    box-shadow: 0 0 8px 3px #E1E1E2;
  }
</style>
