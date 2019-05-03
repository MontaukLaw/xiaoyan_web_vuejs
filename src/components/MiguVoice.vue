<template>
  <div>
    最新的资源文件名为:<b><font color=red> {{lastFileName}}</font></b>
    <br>
    <button type="button" class="btn btn-primary btn-sm" @click="updateMiguVoiceDB()">
      <i class="fa fa-plus"></i> 导入到数据库
    </button>

    <button type="button" class="btn btn-primary btn-sm" @click="freshMiguVoice()">
      <i class="fa fa-refresh"></i> 刷新
    </button>
    <h3 v-show="gettingData">Loading....... </h3>
    <br>
    注意, 导入后旧的数据会被同步更新, 即数据会以最新的资源文件为准.

    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-lg-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5>咪咕听书推荐内容</h5>
            </div>
            <div class="ibox-content">
              <table class="footable table table-stripped toggle-arrow-tiny">
                <thead>
                  <tr>
                    <th>
                      id
                    </th>
                    <th>
                      类型id
                    </th>
                    <th>
                      类型名称
                    </th>
                    <th>
                      资源创建日期
                    </th>
                    <th>
                      资源名称
                    </th>
                    <th>
                      文本作者
                    </th>
                    <th>
                      语音作者
                    </th>
                    <th>
                      封面图片
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="voice in voiceContentList">
                    <td>
                      {{voice.id}}
                    </td>
                    <td>
                      {{voice.categoryId}}
                    </td>
                    <td>
                      {{voice.categoryName}}
                    </td>
                    <td>
                      {{voice.createTime}}
                    </td>
                    <td>
                      {{voice.name}}
                    </td>
                    <td>
                      {{voice.textAuthor}}
                    </td>
                    <td>
                      {{voice.voiceAuthor}}
                    </td>
                    <td>
                      <img :src="voice.coverImageUrl" width="100px">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created: function() {
      var vm = this;
      //118.89.61.144:8903/bgapi/featuredcontents/miguvoice/last
      vm.$http.get(apiHost + '/featuredcontents/miguvoice/last').then((res) => {
        console.info(res.data)
        if (res.data.success == true) {
          this.lastFileName = res.data.obj
        }
      })
      //console.info(hostname);
    },
    data() {
      return {
        lastFileName: "",
        gettingData: false,
        voiceContentList: []
      }
    },
    methods: {
      freshMiguVoice() {
        var vm = this;
        vm.$http.get(apiHost + '/featuredcontents/miguvoice/pageno=1&pagesize=1000').then((res) => {
          this.voiceContentList = res.data.obj.list;
          console.info(this.voiceContentList)
        })
      },
      updateMiguVoiceDB() {
        this.gettingData = true
        var vm = this;
        vm.$http.put(apiHost + '/featuredcontents/miguvoice/' + '?filename=' + this.lastFileName).then((res) => {
          if (res.data.success == true) {
            console.info(res.data)
          }
          this.gettingData = false
        })
      }
    }

  }
</script>

<style>
</style>
