<template>
  <div>
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-lg-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5>技能列表</h5>
              <button type="button" class="btn btn-primary btn-xs pull-right" @click="addBtn"><i class="fa fa-plus"></i>
                新增技能</button>
            </div>
            <div class="ibox-content">
              <table class="footable table table-stripped toggle-arrow-tiny">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>名称</th>
                    <th>服务商</th>
                    <th>技能描述</th>
                    <th>技能分类</th>
                    <th>创建时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="skill in skills">
                    <td>{{skill.id}}</td>
                    <td>{{skill.name}}</td>
                    <td>{{skill.developer.name}}</td>
                    <td>{{skill.description}}</td>
                    <td>{{transType(skill.type)}}</td>
                    <td>{{transTime(skill.createTime)}}</td>
                    <td>
                      <button type="button" class="btn btn-default btn-xs" @click="editSkillBtn(skill)">
                        <i class="fa fa-edit"></i>
                        编辑
                      </button>
                      <button type="button" class="btn btn-default btn-xs" @click="imageDetailBtn(skill)">
                        <i class="fa fa-image"></i>
                        绑定图片 [ {{imageNumber(skill)}}p ]
                      </button>
                      <button type="button" class="btn btn-default btn-xs" @click="deleteConfirm(skill)">
                        <i class="fa fa-remove"></i>
                        删除
                      </button>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="7">
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

    <DetailDialog :ifShowMe="ifShowImageDialog" @on-close="closeImageDialog">
      <h4>为 <label class="label-primary">{{skillName}}技能</label> 绑定图片</h4>
      <br>
      <div class="row">
        <div class="col-md-2">
          图片类型
        </div>
        <div class="col-md-4">
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
      <div class="row h16">
        <div class="col-md-2">
          上传图片文件:
        </div>
        <div class="col-md-4">
          <figure class="upload-preview">
            <img :src="thumbnail" v-if="thumbnail" />
          </figure>
          <mo-upload flag="'thumbnail'" @complete="uploadComplete" @progress="uploadProgress" :inputResourceAddress="inputResourceAddress">
            <i class="fa fa-upload"></i> <a>点我选择图片文件<i class="progress" :style="{width:progress + '%'}"></i></a>
          </mo-upload>
        </div>
      </div>
      <!-- 图片部分 -->
      <div class="row  h16" v-for="resAddr in resourceAddresList">
        <div class="col-md-4">
          {{resAddr.description}}:
          地址: {{resAddr.address}}
        </div>
        <div class="col-md-2">
          <button type="button" class="btn btn-warning btn-xs" @click="deleteResource(resAddr.id)">
            <i class="fa fa-remove"></i>
            删除
          </button>
        </div>
        <div class="col-md-4">
          <img :src="imageAddr(resAddr)">
        </div>
      </div>
    </DetailDialog>

    <delete-confirm-dialog :ifShowMe="ifShowDeleteConfirm" @on-close="closeDeleteDialog">
      <h4>确定要删除么? </h4>
      <br>
      <button @click="deleteSkill" type="button" class="btn btn-xs">
        确定
      </button>
      <button @click="closeDeleteDialog" type="button" class="btn btn-xs">
        取消
      </button>
    </delete-confirm-dialog>

    <!-- 新增技能dialog -->
    <detail-dialog :ifShowMe="ifShowAddDialog" @on-close="closeAddDialog" :dialogInput="dialogInput">
      <h4>新增技能</h4>
      <br>
      <div class="row">
        <div class="col-md-2">
          技能名称
        </div>
        <div class="col-md-4">
          <input type="text" class="form-control input-sm" v-model="dialogInput.name" />
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-2">
          技能类型
        </div>
        <div class="col-md-4">
          <select class="form-control m-b" v-model="dialogInput.type">
            <option value=1>影音阅读</option>
            <option value=2>生活服务</option>
            <option value=3>效率工具</option>
            <option value=4>教育百科</option>
            <option value=5>商业金融</option>
            <option value=6>游戏娱乐</option>
            <option value=7>健康健身</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          技能描述
        </div>
        <div class="col-md-8">
          <input type="text" class="form-control input-sm" v-model="dialogInput.description" />
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-2">
          服务商
        </div>
        <div class="col-md-4">
          <select class="form-control m-b" v-model="dialogInput.developerId">
            <option v-for="developer in developers" :value="developer.id">{{developer.name}}</option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-4">
          <button type="submit" class="btn btn-default btn-xs" @click="confirmBtn">
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
  import DetailDialog from "./dialogs/DeveloperDetailDialog"
  import TransTime from "../common/time.js"
  import ApiAccess from "../common/api_access.js"
  import DeleteConfirmDialog from "./dialogs/common/DelConfirmDialog"
  import EasyValidate from "../common/easy_validate.js"
  import MoUpload from './MoUpload'

  export default {
    created: function() {
      //复用
      this.refreshPage()
    },
    data() {
      return {
        skills: [],
        ifShowAddDialog: false,
        dialogInput: {},
        skillReadyToDel: {},
        ifShowDeleteConfirm: false,
        developers: [],
        addOrUpdateOp: "",
        thumbnail: null,
        progress: 0, //上传进度
        inputResourceAddress: {},
        ifShowImageUpload: false,
        resourceAddresList: [],
        ifShowImageDialog: false,
        skillName: '',
      }
    },
    methods: {
      refreshPage() {
        var vm = this;
        vm.$http.get(apiHost + '/skills/').then((res) => {
          //developers = res.data;
          this.skills = res.data;
          //console.info(this.skills[0]);
        })
      },
      closeImageDialog() {
        this.ifShowImageDialog = false
      },
      //绑定图片按钮
      imageDetailBtn(skill) {
        this.inputResourceAddress.targetId = skill.id
        this.resourceAddresList = skill.skillIconList
        this.ifShowImageDialog = true
        this.skillName = skill.name
      },
      deleteResource(resAddrId) {
        console.info(resAddrId)
        var vm = this;
        vm.$http.delete(apiHost + '/resourceaddresses/' + resAddrId).then((res) => {
          //console.info(res.data);
          if (res.data == 1) {
            this.closeImageDialog()
            this.refreshPage()
          }
        })
      },
      getDevelopers() {
        var vm = this
        vm.$http.get(apiHost + '/developers/').then((res) => {
          this.developers = res.data
        })
      },
      uploadProgress(progress, flag) {
        //这里可以通过回调的flag对不同上传域做处理
        this.progress = progress < 100 ? progress : 0;
      },
      uploadComplete(status, result, flag) {
        alert('上传完成')
        this.refreshPage()
        //因为不会自动刷新, 所以上传成功后只好关窗口
        this.closeImageDialog()

      },
      addBtn() {
        this.ifShowAddDialog = true
        this.getDevelopers()
        this.addOrUpdateOp = "ADD"
        //重置一下
        this.dialogInput = new Object()

        //隐藏上传图片的部分
        //this.ifShowImageUpload = false

      },
      closeAddDialog() {
        this.ifShowAddDialog = false
      },
      validate(reqParam) {
        return EasyValidate.easyValidate.validate(reqParam)
      },
      //编辑技能
      editSkillBtn(skill) {
        this.dialogInput = skill
        this.ifShowAddDialog = true
        this.addOrUpdateOp = "UPDATE"
        this.getDevelopers()
        this.dialogInput.developerId = skill.developer.id
        //console.info(this.dialogInput)
        //显示图片上传的部分
        //this.ifShowImageUpload = true
        //this.resourceAddresList = this.dialogInput.skillIconList
        //将targetId赋值给inputResourceAddress
        //this.inputResourceAddress.targetId = skill.id

      },
      updateSkill() {
        let reqParam = {
          name: this.dialogInput.name,
          type: this.dialogInput.type,
          description: this.dialogInput.description,
          developerId: this.dialogInput.developerId,
          id: this.dialogInput.id
        }
        ApiAccess.accessApi.updateSkill(reqParam)
      },
      //确认按钮
      confirmBtn() {
        if (this.addOrUpdateOp == "UPDATE") {
          this.updateSkill()
        } else if (this.addOrUpdateOp == "ADD") {
          this.addSkill()
        }
      },
      //增加技能按钮
      addSkill() {
        let reqParam = {
          name: this.dialogInput.name,
          type: this.dialogInput.type,
          description: this.dialogInput.description,
          developerId: this.dialogInput.developerId
        }
        //cartView();
        ApiAccess.accessApi.saveSkill(reqParam)
      },
      //删除按钮
      deleteConfirm(skill) {
        this.skillReadyToDel = skill
        this.ifShowDeleteConfirm = true
      },
      closeDeleteDialog() {
        this.ifShowDeleteConfirm = false
      },
      //删除技能
      deleteSkill() {
        //console.info(this.skillReadyToDel.id)
        var vm = this
        let id = this.skillReadyToDel.id
        vm.$http.delete(
          apiHost + '/skills/' + id).then((res) => {
          console.info(res);
          if (res.data == 1) {
            window.location.reload();
          } else {
            alert("未知错误!")
          }
        })
      }
    },
    components: {
      DetailDialog,
      DeleteConfirmDialog,
      MoUpload,
    },
    computed: {
      imageAddr: function(resAddr) {
        return function(resAddr) {
          return imgHost + resAddr.address
        }
      },
      imageNumber: function(skill) {
        return function(skill) {
          return skill.skillIconList.length
        }
      },
      transTime: function(time) {
        return function(time) {
          return TransTime.transTimeFunc.transTime(time)
        }
      },
      transType: function(type) {
        return function(type) {
          //1: 影音阅读
          //2: 生活服务
          // 3: 效率工具
          // 4: 教育百科
          // 5: 商业金融
          // 6: 游戏娱乐
          // 7: 健康健身
          switch (type) {
            case 1:
              return "影音阅读"
            case 2:
              return "生活服务"
            case 3:
              return "效率工具"
            case 4:
              return "教育百科"
            case 5:
              return "商业金融"
            case 6:
              return "游戏娱乐"
            case 7:
              return "健康健身"
            default:
              return "未知"
          }
        }
      }
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
