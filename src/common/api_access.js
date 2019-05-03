import Vue from 'vue'
import EasyValidate from "./easy_validate.js"
import VueResource from 'vue-resource'

Vue.use(VueResource)

const accessApi = {
  updateSkill(reqParam) {
    //先校验数据
    var ifValidate = EasyValidate.easyValidate.validate(reqParam)
    //alert("所有项目都是必填")
    if (ifValidate == false) {
      return
    }
    let url = apiHost + "/skills/" + reqParam.id
    Vue.http.put(
      url,
      reqParam, {
        //模拟表单提交
        emulateJSON: true
      }).then((res) => {
      if (res.data == 1) {
        console.info("updated")
        window.location.reload();
      } else {
        alert("未知错误!")
      }
    })

  },
  saveSkill(reqParam) {
    let url = apiHost + /developers/ + reqParam.developerId + "/skills/"
    var vm = this
    console.info(reqParam)
    //var ifValidate = this.validate(reqParam);
    var ifValidate = EasyValidate.easyValidate.validate(reqParam)
    //alert("所有项目都是必填")
    if (ifValidate == false) {
      return
    }
    Vue.http.post(url,
      reqParam, {
        //模拟表单提交
        emulateJSON: true
      }).then((res) => {
      if (res.data == 1) {
        window.location.reload();
      } else {
        alert("未知错误!")
      }
    })
  },
  validate(reqParam) {
    return EasyValidate.easyValidate.validate(reqParam)
  }
}

export default {
  accessApi
}
