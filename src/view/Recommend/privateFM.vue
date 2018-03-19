<template>
    <div>
      私人FM
    </div>
</template>
<script>
import { personalFm } from '@/api/api'
export default {
  data () {
    return {
    }
  },
  components: {
  },
  created () {
    this.getPerFm()
  },
  methods: {
    getPerFm () {
      personalFm().then((res) => {
        console.log('私人FM', res)
      })
    }
  }
}
</script>
<style scoped lang="scss">
</style>
