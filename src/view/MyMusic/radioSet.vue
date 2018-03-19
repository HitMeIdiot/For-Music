<template>
    <div>
      <tit title="我订阅的电台"></tit>
    </div>
</template>
<script>
import tit from '@/components/title'
import { userDj } from '@/api/api'
export default {
  data () {
    return {
      myId: '',
      djList: []
    }
  },
  components: {
    tit
  },
  created () {
    this.myId = sessionStorage.myId
    this.getUserDj('330105132')
  },
  methods: {
    getUserDj (id) {
      userDj({params: {uid: id}}).then((res) => {
        console.log('用户电台', res)
        if (res.code === 200) {

        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
</style>
