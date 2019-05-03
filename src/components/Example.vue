<template>
  <div>
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-lg-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5>技能示例</h5>
              <!-- <button @click="testJson" type="button" class="btn btn-xs">
                Test
              </button> -->
            </div>
            <div class="ibox-content">
              <ul class="nav nav-pills">
                <li role="presentation" v-for="skill in allSkills">
                  <a href="#" @click="displayExample(skill)">{{skill.name}}</a>
                </li>
              </ul>
              <br>
              <table class="footable table table-stripped toggle-arrow-tiny">
                <thead>
                  <tr>
                    <th>{{skillDisplay.name}}:</th>
                  </tr>
                </thead>
                <tbody>
                  <example-item v-for="(example,index) in examplesOfSkill" :example="example" :itemIndex="index" :key="example.id"
                    @on-refresh="refreshPage">
                  </example-item>
                  <tr>
                    <td>
                      <div class="row">
                        <div class="col-md-6">
                          <input type="text" placeholder="新增单轮语料" class="form-control input-sm" v-model="inputSingleExample">
                        </div>
                        <div class="col-md-2">
                          <button type="button" class="btn btn-primary btn-sm" @click="addSingleExample()">
                            <i class="fa fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="row">
                        <div class="col-md-6">
                          <textarea class="form-control" rows="10" placeholder="新增多轮语料" v-model="inputMultiExample"></textarea>
                        </div>
                        <div class="col-md-2">
                          <button type="button" class="btn btn-primary btn-sm" @click="addMultiExample()">
                            <i class="fa fa-plus"></i>
                          </button>
                        </div>
                      </div>
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
  import TransTime from "../common/time.js"
  import ExampleItem from "./ExampleItem"

  export default {
    created: function() {
      var vm = this;
      vm.$http.get(apiHost + '/skillsname/').then((res) => {
        this.allSkills = res.data;
        //console.info(this.allSkills)
        this.skillDisplay = this.allSkills[0]
      })
      //console.info(hostname);
    },
    components: {
      ExampleItem
    },
    data() {
      return {
        inputSingleExample: "",
        inputMultiExample: "",
        skillDisplay: {},
        allSkills: [],
        exampleDisplay: '',
        skillName: '',
        examplesOfSkill: [],
        ifShowInput: [{
          id: '',
          ifShow: false
        }],
        ifShowBoolArray: [false, true, false, false, false, false, false, false, false, false, false, false, false],
        testBol: false,
        inputExample: ""
      }
    },
    methods: {
      displayExample(skill) {
        //this.skillName = skill.name;
        this.skillDisplay = skill;
        //console.info(skillDisplay.id)
        this.getExampleOfSkill();
      },
      testJson() {
        var vm = this;
        vm.$http.get('http://localhost:8902/test').then((res) => {
          console.info(res)
        })
      },
      refreshPage() {
        //console.info("get emit")
        this.getExampleOfSkill();
      },
      //复用一下
      getExampleOfSkill() {
        var vm = this;
        vm.$http.get(apiHost + '/skills/' + this.skillDisplay.id + "/skillexamples/").then((res) => {
          //console.info(res)
          this.examplesOfSkill = res.data;
          //this.ifShowBoolArray = new Array();
          for (var i = 0; i < this.examplesOfSkill.length; i++) {
            this.ifShowBoolArray[i] = false
          }
        })
      },
      addSingleExample() {
        this.addExample(0);
        this.inputSingleExample = ""
      },
      addMultiExample() {
        //console.info(this.inputMultiExample.replace(/\n/g,";"))
        this.addExample(1)
        this.inputMultiExample = ""
      },
      addExample(ifMulti) {
        var vm = this;
        var exampleParam = ""
        //如果是单轮语料
        if (ifMulti == 0) {
          exampleParam = this.inputSingleExample
          //如果是多轮语料
        } else if (ifMulti == 1) {
          exampleParam = this.inputMultiExample.replace(/\n/g, ";")
        }
        let reqParam = {
          example: exampleParam,
          skillId: this.skillDisplay.id,
          ifMulti: ifMulti
        }
        vm.$http.post(apiHost + '/skillexamples/',
          reqParam, {
            //模拟表单提交
            emulateJSON: true
          }).then(res => {
          if (res.data == 1) {
            this.getExampleOfSkill();
            this.inputExample = ""
          } else {
            alert("未知错误")
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
      ifShowExample: function(aaa) {
        return function(aaa) {
          //console.info(index);
          //console.info(this.ifShowInput[parseInt(example.id)]);
          console.info(this.ifShowBoolArray[aaa])
          return this.ifShowBoolArray[aaa]
        }
      }
    }
  }
</script>

<style>
</style>
