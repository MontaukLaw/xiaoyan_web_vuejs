<template>
  <div>
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-lg-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5>滚动条</h5>
              <button type="button" class="btn btn-primary btn-xs pull-right" @click="addBtn"><i class="fa fa-plus"></i>
                新增滚动条</button>
            </div>
            <div class="ibox-content">
              <table class="footable table table-stripped toggle-arrow-tiny">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>名称</th>
                    <th>类型</th>
                    <th>描述</th>
                    <th>链接地址</th>
                    <th>创建时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="banner in banners">
                    <td>{{banner.id}}</td>
                    <td>{{banner.name}}</td>
                    <td>{{banner.type}}</td>
                    <td>{{banner.description}}</td>
                    <td>{{banner.url}}</td>
                    <td>{{transTime(banner.createTime)}}</td>
                    <td>
                      <button type="button" class="btn btn-default btn-xs" @click="addImageBtn(banner)">
                        <i class="fa fa-image"></i>
                        添加图片资源 [ {{imageNumber(banner)}} P ]
                      </button>
                      <button type="button" class="btn btn-default btn-xs" @click="disable(banner)">
                        <i class="fa fa-remove"></i>
                        禁用</button>
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
    <detail-dialog :ifShowMe="ifShowBindImageDialog" @on-close="closeBindImageDialog" inputResourceAddress>
      <h3> {{bannerBindForImage.name}} 的图片:</h3>
      <div class="row v-center">
        <div class="col-md-2">
          图片类型
        </div>
        <div class="col-md-6">
          <select class="form-control m-b" v-model="inputResourceAddress.description">
            <option value="APP_BANNER">App端滚动条</option>
            <option value="DEV_BANNER">设备端滚动条</option>
            <option value="APP_ICON">App端图标</option>
            <option value="DEV_ICON">设备端图标</option>
            <option value="APP_BG">App端背景图</option>
            <option value="DEV_BG">设备端背景图</option>
          </select>
        </div>
        <div class="col-md-2">
        </div>
      </div>
      <mo-upload flag="'thumbnail'" @complete="uploadComplete" :inputResourceAddress="inputResourceAddress">
        <a>选择图片文件</a>
      </mo-upload>
      <hr>
      <div class="row" v-for="resAddr in resourceAddresList">
        <div class="col-md-2">
          {{resAddr.description}}:
          地址: {{resAddr.address}}
        </div>
        <div class="col-md-2">
          <button type="button" class="btn btn-default btn-xs" @click="deleteResource(resAddr.id)">
            <i class="fa fa-remove"></i>
            删除
          </button>
        </div>
        <div class="col-md-8">
          <img :src="imageAddr(resAddr)">
        </div>
      </div>

    </detail-dialog>
    <!-- 新增滚动条dialog -->
    <detail-dialog :ifShowMe="ifShowAddDialog" @on-close="closeAddDialog" :inputBanner="inputBanner">
      <h4>新增滚动条</h4>
      <!--  {{inputDeveloper.name}}{{inputDeveloper.type}} -->
      <br>
      <div class="row">
        <div class="col-md-2">
          名称
        </div>
        <div class="col-md-4">
          <input type="text" class="form-control input-sm" v-model="inputBanner.name" />
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-2">
          类型
        </div>
        <div class="col-md-2">
          <input type="text" class="form-control input-sm" v-model="inputBanner.type" />
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-2">
          描述
        </div>
        <div class="col-md-4">
          <input type="text" class="form-control input-sm" v-model="inputBanner.description" />
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-2">
          链接地址
        </div>
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="inputBanner.url" />
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-4">
          <button type="submit" class="btn btn-default btn-xs" @click="addBanner">
            提交
          </button>
          <button type="submit" class="btn btn-default btn-xs" @click="closeAddDialog">
            取消
          </button>
        </div>
      </div>
    </detail-dialog>
  </div>
</template>

<script>
  import TransTime from "../common/time.js"
  import ApiAccess from "../common/api_access.js"
  import EasyValidate from "../common/easy_validate.js"
  import MoUpload from './MoUpload'
  import DetailDialog from "./dialogs/common/DetailDialog"

  export default {
    data() {
      return {
        banners: [],
        ifShowAddDialog: false,
        inputBanner: {},
        ifShowBindImageDialog: false,
        bannerBindForImage: "",
        resourceAddresList: [],
        inputResourceAddress: {},
      }
    },
    created: function() {
      //复用
      this.refreshPage()
    },
    methods: {
      uploadComplete(status, result, flag) {
        if (status == 200) { //
          alert("上传成功")
          this.refreshPage()
          this.closeBindImageDialog()
          //this.showImageDetailDialog(this.showImagesForFt)
        } else {
          //失败处理
        }
      },
      deleteResource(id) {
        var vm = this;
        vm.$http.delete(apiHost + '/resourceaddresses/' + id).then((res) => {
          //console.info(res.data);
          if (res.data == 1) {
            this.closeBindImageDialog()
            this.refreshPage()
          }
        })
      },
      addImageBtn(banner) {
        this.bannerBindForImage = banner
        this.ifShowBindImageDialog = true
        this.resourceAddresList = banner.resourceAddressList
        //把目标id传进图片绑定里面
        this.inputResourceAddress.targetId = banner.id
      },
      disable(banner) {
        var vm = this
        vm.$http.put(
          apiHost + '/banners/' + banner.id + "/status/0"
        ).then((res) => {
          //console.info(res.data)
          if (res.data == 1) {
            this.refreshPage()
          }
        })
      },
      addBanner() {
        var vm = this
        let reqParam = {
          name: this.inputBanner.name,
          type: this.inputBanner.type,
          url: this.inputBanner.url,
          description: this.inputBanner.description,
          status: 1
        }
        vm.$http.post(
          apiHost + '/banners/',
          reqParam, {
            //模拟表单提交
            emulateJSON: true
          }).then((res) => {
          //console.info(res.data)
          if (res.data == 1) {
            this.closeAddDialog()
            this.refreshPage()
          }
        })
      },
      closeBindImageDialog() {
        this.ifShowBindImageDialog = false
      },
      closeAddDialog() {
        this.ifShowAddDialog = false
      },
      deleteConfirm(banner) {

      },
      editDevBtn(banner) {

      },
      addBtn() {
        this.ifShowAddDialog = true
      },
      refreshPage() {
        var vm = this;
        vm.$http.get(apiHost + '/banners/').then((res) => {
          //获取全部滚动条
          this.banners = res.data
          console.info(this.banners)
        })
      },
    },
    components: {
      DetailDialog,
      MoUpload,
    },
    computed: {
      imageNumber: function(banner) {
        return function(banner) {
          return banner.resourceAddressList.length
        }
      },
      imageAddr: function(resAddr) {
        return function(resAddr) {
          return imgHost + resAddr.address
        }
      },
      transTime: function(time) {
        return function(time) {
          return TransTime.transTimeFunc.transTime(time)
        }
      },
    }
  }
</script>

<style lang="scss">
  .mo-upload {
    display: inline-block;
    position: relative;
    margin-bottom: 0;

    input[type="file"] {
      display: none;
    }

    .mo-upload--label {
      display: inline-block;
      position: relative;
    }
  }

  .v-center {
    display: flex;
    align-items: center;
  }

  .h16 {
    line-height: 49px
  }
</style>
