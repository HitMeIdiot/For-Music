<template>
    <div class="user">
      <dyn :eventList="eventList"></dyn>
    </div>
</template>
<script>
import tit from '@/components/title'
import dyn from '@/components/dyn'
import { userEvent } from '@/api/api'
export default {
  data () {
    return {
      eventList: []
    }
  },
  components: {
    tit,
    dyn
  },
  created () {
    this.getUserDyn(this.$route.query.userId)
  },
  methods: {
    getUserDyn (id) {
      userEvent({params: {uid: id}}).then((res) => {
        console.log('用户动态', res)
        if (res.code === 200) {
          this.eventList = res.events
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .user {
    padding: 0 0 30px 30px;
  }
</style>
