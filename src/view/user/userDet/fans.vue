<template>
    <div class="user">
      <tit title="粉丝"></tit>
      <foll :list="followList"></foll>
    </div>
</template>
<script>
import tit from '@/components/title'
import foll from '@/components/followFan'
import { userFolloweds } from '@/api/api'
export default {
  data () {
    return {
      followList: []
    }
  },
  components: {
    tit,
    foll
  },
  created () {
    this.getFollowList(this.$route.query.userId)
  },
  methods: {
    getFollowList (id) {
      userFolloweds({params: {uid: id}}).then((res) => {
        console.log('关注列表', res)
        if (res.code === 200) {
          this.followList = res.followeds
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .user {
    padding: 15px 30px 30px 30px;
  }
</style>
