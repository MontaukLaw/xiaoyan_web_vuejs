<template>
  <div>
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-lg-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5>开发者</h5>
              <button type="button" class="btn btn-primary btn-xs pull-right" @click="addBtn"><i class="fa fa-plus"></i>
                新增开发者</button>
            </div>
            <div class="ibox-content">
              <table class="footable table table-stripped toggle-arrow-tiny">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>名称</th>
                    <th>类型</th>
                    <th>创建时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="developer in developers">
                    <td>{{developer.id}}</td>
                    <td>{{developer.name}}</td>
                    <td>{{transType(developer.type)}}</td>
                    <td>{{timeTrans(developer.createTime)}}</td>
                    <td>
                      <!--  <span class="label label-primary " @click="editDev(developer)"><i class="fa fa-edit"></i> 编辑</span>
                      <span class="label label-primary" @click="deleteDev(developer)"><i class="fa fa-remove"></i> 删除</span> -->
                      <button type="button" class="btn btn-default btn-xs" @click="editDevBtn(developer)">
                        <i class="fa fa-edit"></i>
                        编辑</button>
                      <button type="button" class="btn btn-default btn-xs" @click="deleteConfirm(developer)">
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

    <!-- 编辑用的dialog -->
    <developer-detail-dialog :ifShowMe="ifShowEditDialog" @on-close="closeEditDialog" :developerReadyToEdit="developerReadyToEdit">
      <h4> <i class="fa fa-edit"></i> 编辑</h4>
      <!--  {{inputDeveloper.name}}{{inputDeveloper.type}} -->
      <br>
      <div class="row">
        <div class="col-md-2">
          名称
        </div>
        <div class="col-md-6">
          <input type="text" class="form-control input-sm" v-model="developerReadyToEdit.name" />
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-2">
          类型
        </div>
        <div class="col-md-6">
          <input type="radio" value="1" id="optionsRadios1" v-model="developerReadyToEdit.type" />
          个人开发者
          <input type="radio" value="2" id="optionsRadios2" v-model="developerReadyToEdit.type" />
          公司
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-4">
          <button type="submit" class="btn btn-default btn-xs" @click="editDeveloper">
            提交
          </button>
          <button type="submit" class="btn btn-default btn-xs" @click="closeEditDialog">
            取消
          </button>
        </div>
      </div>

    </developer-detail-dialog>

    <!-- 新增开发者dialog -->
    <developer-detail-dialog :ifShowMe="ifShowAddDialog" @on-close="closeAddDialog" :inputDeveloper="inputDeveloper">
      <h4>新增开发者</h4>
      <!--  {{inputDeveloper.name}}{{inputDeveloper.type}} -->
      <br>
      <div class="row">
        <div class="col-md-2">
          名称
        </div>
        <div class="col-md-6">
          <input type="text" class="form-control input-sm" v-model="inputDeveloper.name" />
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-md-2">
          类型
        </div>
        <div class="col-md-6">
          <input type="radio" value="1" id="optionsRadios1" v-model="inputDeveloper.type" />
          个人开发者
          <input type="radio" value="2" id="optionsRadios2" v-model="inputDeveloper.type" />
          公司
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-4">
          <button type="submit" class="btn btn-default btn-xs" @click="addDeveloper">
            提交
          </button>
          <button type="submit" class="btn btn-default btn-xs" @click="closeAddDialog">
            取消
          </button>
        </div>
      </div>
    </developer-detail-dialog>

    <!--  确定删除用的dialog -->
    <delete-confirm-dialog :developer="developer" :ifShowMe="ifShowDeleteConfirm" @on-close="closeDeleteConfirmDialog">
      <h4>确定要删除么? </h4>
      <br>
      <button @click="deleteDev(developer)" type="button" class="btn btn-xs">
        确定
      </button>
      <button @click="closeDeleteConfirmDialog" type="button" class="btn btn-xs">
        取消
      </button>
    </delete-confirm-dialog>
  </div>
</template>

<script>
  import TransTime from "../common/time.js"
  import DeleteConfirmDialog from "./dialogs/DeleteConfirmDialog"
  import DeveloperDetailDialog from "./dialogs/DeveloperDetailDialog"

  export default {
    created: function() {
      var vm = this;
      vm.$http.get(apiHost + '/developers/').then((res) => {
        //developers = res.data;
        this.developers = res.data;
        console.info(this.developers[0].name);
      })
    },
    data() {
      return {
        developers: [{
          id: "",
          name: "",
          type: 0,
          create_Time: 0
        }],
        //删除确认对话框
        ifShowDeleteConfirm: false,
        ifShowAddDialog: false,
        developer: {},
        developerReadyToDel: {},
        ifShowEditDialog: false,
        inputDeveloper: {
          name: '',
          type: 2,
        },
        developerReadyToEdit: {}
      }
    },
    methods: {
      testResourceBtn() {
        console.info('btn pressed');
        this.$http.get('/bg/developers/').then((res) => {
          developers = res;
          //console.info(developers);
        })
      },
      editDeveloper() {
        var vm = this
        let id = this.developerReadyToEdit.id
        let reqParam = {
          name: this.developerReadyToEdit.name,
          type: this.developerReadyToEdit.type,
        }
        vm.$http.put(
          apiHost + '/developers/' + id,
          reqParam, {
            //模拟表单提交
            emulateJSON: true
          }).then((res) => {
          //console.info(res.data)
          if (res.data == 1) {
            window.location.reload();
          } else {
            alert("未知错误!")
          }
        })
      },
      deleteDev() {
        var vm = this
        let id = this.developerReadyToDel.id
        vm.$http.delete(
          apiHost + '/developers/' + id).then((res) => {
          console.info(res);
          if (res.data == 1) {
            window.location.reload();
          } else {
            alert("未知错误!")
          }
        })
        //console.info("delete");
      },
      addBtn() {
        //显示出来
        this.ifShowAddDialog = true
        //重置一下
        this.inputDeveloper.type = 2
        this.inputDeveloper.name = ""
      },
      addDeveloper() {
        //console.info(this.inputDeveloper)
        var vm = this
        let reqParam = {
          name: this.inputDeveloper.name,
          type: this.inputDeveloper.type,
        }
        vm.$http.post(
          apiHost + '/developers/',
          reqParam, {
            //模拟表单提交
            emulateJSON: true
          }).then((res) => {
          //console.info(res.data)
          if (res.data == 1) {
            window.location.reload();
          }
        })
      },
      closeDeleteConfirmDialog() {
        this.ifShowDeleteConfirm = false
      },
      closeAddDialog() {
        this.ifShowAddDialog = false
      },
      closeEditDialog() {
        this.ifShowEditDialog = false
      },
      deleteConfirm(developer) {
        this.developerReadyToDel = developer
        this.ifShowDeleteConfirm = true
      },
      editDevBtn(developer) {
        this.developerReadyToEdit = developer
        this.ifShowEditDialog = true
      }

    },
    computed: {
      timeTrans: function(time) {
        return function(time) {
          return TransTime.transTimeFunc.transTime(time)
        }
      },
      timeNow: function() {
        return TransTime.transTimeFunc.getTimeNow()
      },
      transType: function(type) {
        return function(type) {
          switch (type) {
            case 1:
              return "个人开发者"
              break;
            case 2:
              return "公司"
              break;
            default:
              return "未知"
          }
        }
      }
    },
    components: {
      DeleteConfirmDialog,
      DeveloperDetailDialog
    },
  }
</script>

<style>
</style>


<!-- Always decent and be simple! -->
