const easyValidate = {
  validate(param) {
    if (param == null) {
      alert("所有项目都是必填")
      return false
    }
    if (Object.keys(param) == 0) {
      alert("所有项目都是必填")
      return false
    }
    for (let i in param) {
      //console.log(i); //a b c d
      //console.log(param[i]);
      if (param[i] == null) {
        alert("所有项目都是必填")
        return false
      }
      if (param[i] == "") {
        alert("所有项目都是必填")
        return false;
      }
    }
    return true
  }
}

export default {
  easyValidate
}
