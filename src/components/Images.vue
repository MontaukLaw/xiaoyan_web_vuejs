<template>
  <div>
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-lg-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5>图片上传</h5>
            </div>
            <div class="ibox-content">
              <mo-upload flag="'thumbnail'" @complete="uploadComplete">
                <button type="button" class="btn btn-primary btn-sm "> 点我上传图片文件</button>
              </mo-upload>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-lg-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5>图片管理</h5>
            </div>
            <div class="ibox-content">
              <table class="footable table table-stripped toggle-arrow-tiny">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>地址</th>
                    <th>对应目标id</th>
                    <th>对应目标名称</th>
                    <th>备注</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="resAddr in resourceAddresses">
                    <td>{{resAddr.id}}</td>
                    <td>{{resAddr.address}}</td>
                    <td>{{resAddr.targetId}}</td>
                    <td>{{resAddr.targetName}}</td>
                    <td>{{resAddr.description}}</td>
                    <td>
                      <button type="button" class="btn btn-default btn-xs" @click="deleteResource(resAddr)">
                        <i class="fa fa-remove"></i>
                        删除</button>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="5">
                      <ul class="pagination pull-right"></ul>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import MoUpload from './MoUpload'

  export default {
    components: {
      MoUpload,
    },
    created: function() {
      var vm = this;
      //http://localhost:8903/bgapi/ResourceAddresses/
      vm.$http.get(apiHost + '/resourceaddresses/').then((res) => {
        //developers = res.data;
        this.resourceAddresses = res.data;
        console.info(this.resourceAddresses);
      })
    },
    data() {
      return {
        resourceAddresses: [],

      }
    },
    methods: {
      uploadComplete(status, result, flag) {
        console.info("uploaded")

      },
      deleteResource(resAddr) {
        var vm = this;
        //http://localhost:8903/bgapi/ResourceAddresses/
        vm.$http.delete(apiHost + '/resourceaddresses/' + resAddr.id).then((res) => {
          if (res.data == 1) {
            window.location.reload();
          } else {
            alert("未知错误!")
          }
        })

      }
    }
  }
</script>

<style>
</style>
