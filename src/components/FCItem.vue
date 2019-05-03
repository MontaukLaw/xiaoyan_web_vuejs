<template>
  <tr>
    <td>xxxx</td>
    <td>xxx</td>
    <td>备xx注</td>
    <td>xx</td>
    <td>xxxx</td>
    <td>xx</td>
  </tr>
</template>

<script>
  import TransTime from "../common/time.js"

  export default {
    data() {
      return {
        ifShowImage: false
      }
    },
    props: {
      featuredContent: Object,
    },
    computed: {
      timeTrans: function(time) {
        return function(time) {
          return TransTime.transTimeFunc.transTime(time)
        }
      },
      typeTrans: function(type) {
        return function(type) {
          //1, 推荐视频, 2, 推荐音乐, 3 推荐有声内容, 4, 推荐技能
          switch (type) {
            case 1:
              return "视频"
              break;
            case 2:
              return "音乐"
              break;
            case 3:
              return "有声内容"
              break;
            case 4:
              return "技能"
              break;
          }
        }
      }
    }
  }
</script>

<style>
</style>
