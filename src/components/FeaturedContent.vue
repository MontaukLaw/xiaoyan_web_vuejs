<template>
  <div>
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-lg-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5>推荐内容</h5>
              <button type="button" class="btn btn-primary btn-xs pull-right" @click="addFcBtn">
                <i class="fa fa-plus"></i>
                新增推荐内容
              </button>
            </div>
            <div class="ibox-content">
              <ul class="nav nav-pills">
                <li role="presentation" v-for="(featureType,index) in featureTypes">
                  <a href="#" @click="getFCByType(index)" class="btn-default">{{featureType.name}}</a>
                </li>
              </ul>
              <br>
              <table class="footable table table-stripped toggle-arrow-tiny">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>推荐内容名称</th>
                    <th>备注</th>
                    <th>推荐内容类型</th>
                    <th>创建时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="featuredContent in featuredContents">
                    <td>{{featuredContent.id}}</td>
                    <td>{{featuredContent.name}}</td>
                    <td>{{featuredContent.description}}</td>
                    <td>{{typeTrans(featuredContent.type)}}</td>
                    <td>{{timeTrans(featuredContent.createTime)}}</td>
                    <td>
                      <button type="button" class="btn btn-default btn-xs" @click="deleteFC(featuredContent)">
                        <i class="fa fa-remove"></i>
                        删除
                      </button>
                      <button type="button" class="btn btn-default btn-xs" @click="showImageDetailDialog(featuredContent)">
                        <i class="fa fa-image"></i>
                        查看资源图片
                      </button>
                    </td>
                  </tr>
                  <!-- <fc-item v-for="featuredContent in featuredContents" :featuredContent="featuredContent">
                  </fc-item> -->
                  <!-- -->
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
    <!-- 查看图片dialog -->
    <featured-content-detail-dialog :ifShowMe="ifShowImageDetailDialog" @on-close="closeImageDetailDialog"
      :showImagesForFt="showImagesForFt">
      <h3> {{showImagesForFt.name}} 的图片:</h3>
      <div class="row v-center">
        <div class="col-md-2">
          图片类型
        </div>
        <div class="col-md-6">
          <select class="form-control m-b" v-model="inputResourceAddress.description">
            <option value="APP_ICON">App端图标</option>
            <option value="DEV_ICON">设备端图标</option>
            <option value="APP_BG">App端背景图</option>
            <option value="DEV_BG">设备端背景图</option>
          </select>
        </div>
        <div class="col-md-2">
        </div>
      </div>
      <figure class="upload-preview">
        <img :src="thumbnail" v-if="thumbnail" />
      </figure>
      <mo-upload flag="'thumbnail'" @complete="uploadComplete" @progress="uploadProgress" :inputResourceAddress="inputResourceAddress">
        <a>选择图片文件<i class="progress" :style="{width:progress + '%'}"></i></a>
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
    </featured-content-detail-dialog>

    <!-- 新增推荐内容dialog -->
    <featured-content-detail-dialog :ifShowMe="ifShowAddDialog" @on-close="closeAddDialog" :inputFC="inputFC">
      <h4>新增推荐内容</h4>
      <!--  {{inputDeveloper.name}}{{inputDeveloper.type}} -->
      <br>
      <div class="row">
        <div class="col-md-2">
          推荐名称
        </div>
        <div class="col-md-4">
          <input type="text" class="form-control input-sm" v-model="inputFC.name" />
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-2">
          类型
        </div>
        <div class="col-md-4">
          <select class="form-control m-b" v-model="inputFC.type">
            <option value=1>推荐视频</option>
            <option value=2>推荐音乐</option>
            <option value=3>推荐有声</option>
            <option value=4>推荐技能</option>
          </select>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-2">
          备注
        </div>
        <div class="col-md-4">
          <input type="text" class="form-control input-sm" v-model="inputFC.description" />
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-4">
          <button type="submit" class="btn btn-default btn-xs" @click="addFc">
            提交
          </button>
          <button type="submit" class="btn btn-default btn-xs" @click="closeAddDialog">
            取消
          </button>
        </div>

      </div>
    </featured-content-detail-dialog>
  </div>
</template>

<script>
  import FcItem from "./FCItem"
  import TransTime from "../common/time.js"
  import FeaturedContentDetailDialog from "./dialogs/common/DetailDialog"
  import MoUpload from './MoUpload'

  export default {
    created: function() {
      this.featureTypes = [{
        name: '推荐视频(默认显示3条)'
      }, {
        name: '推荐音乐(默认显示4条)'
      }, {
        name: '推荐有声(默认显示4条)'
      }, {
        name: '推荐技能(默认显示4条)'
      }]
      //设置一个默认
      this.inputResourceAddress.description = "APP_ICON"
      this.refreshPage()
    },
    data() {
      return {
        //1, 推荐视频, 2, 推荐音乐, 3 推荐有声内容, 4, 推荐技能
        featureTypes: [],
        featuredContents: [],
        ifShowAddDialog: false,
        inputFC: {},
        displayingType: 1,
        ifShowImageDetailDialog: false,
        showImagesForFt: Object,
        resourceAddresList: [],
        thumbnail: null,
        progress: 0, //上传进度
        inputResourceAddress: Object
      }
    },
    methods: {
      deleteResource(id) {
        console.info(id)
        var vm = this;
        vm.$http.delete(apiHost + '/resourceaddresses/' + id).then((res) => {
          //console.info(res.data);
          if (res.data == 1) {
            this.closeImageDetailDialog()
            this.refreshPage()
          }
        })
      },
      uploadProgress(progress, flag) {
        //这里可以通过回调的flag对不同上传域做处理
        this.progress = progress < 100 ? progress : 0;
      },
      uploadComplete(status, result, flag) {
        if (status == 200) { //
          //this.thumbnail = `domain.com/${result.key}` //七牛域名 + 返回的key 组成文件url
          alert("上传成功")
          this.refreshPage()
          this.closeImageDetailDialog()
          //this.showImageDetailDialog(this.showImagesForFt)
        } else {
          //失败处理
        }
      },
      showImageDetailDialog(featuredContent) {
        this.showImagesForFt = featuredContent
        this.ifShowImageDetailDialog = true
        this.resourceAddresList = featuredContent.resourceAddressList
        //准备如果要上传图片的资源地址信息
        this.inputResourceAddress.targetId = featuredContent.id
        //console.info(this.showImagesForFt)
      },
      closeImageDetailDialog() {
        this.ifShowImageDetailDialog = false
      },
      addFc() {
        //console.info(this.inputFC)
        var vm = this
        let reqParam = {
          name: this.inputFC.name,
          type: this.inputFC.type,
          description: this.inputFC.description
        }
        vm.$http.post(
          apiHost + '/featuredcontents/',
          reqParam, {
            //模拟表单提交
            emulateJSON: true
          }).then((res) => {
          //console.info(res.data)
          if (res.data == 1) {
            //displayingType
            //getFCByType
            //window.location.reload();
            this.closeAddDialog()
            this.refreshPage()
          }
        })
      },
      addFcBtn() {
        this.ifShowAddDialog = true
      },
      closeAddDialog() {
        this.ifShowAddDialog = false
      },
      refreshPage() {
        var vm = this;
        vm.$http.get(apiHost + '/featuredcontents/types/' + this.displayingType).then((res) => {
          //console.info(res.data);
          this.featuredContents = res.data;
        })
      },
      getFCByType(index) {
        //console.info(index)
        //this.type = index + 1;
        this.displayingType = index + 1
        this.refreshPage()
      },
      showFCDetail(featuredContent) {
        console.info(featuredContent)
      },
      deleteFC(featuredContent) {
        //console.info('id' + featuredContent.id)
        var vm = this;
        vm.$http.delete(apiHost + '/featuredcontents/' + featuredContent.id).then((res) => {
          //console.info(res.data);
          if (res.data == 1) {
            this.refreshPage()
          }
        })
      }
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
      },
      imageAddr: function(resAddr) {
        return function(resAddr) {
          return imgHost + resAddr.address
        }
      }
    },
    components: {
      FcItem,
      FeaturedContentDetailDialog,
      MoUpload,
    },
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
</style>
