<template>
    <div class="user">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  components: {
  },
  created () {
  },
  methods: {}
}
</script>
<style scoped lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
