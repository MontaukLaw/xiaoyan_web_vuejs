<template>
  <label class="mo-upload">
    <input type="file" :accept="accepts" @change="upload">
    <slot></slot>
  </label>
</template>

<script>
  export default {
    name: 'MoUpload',
    props: {
      accepts: { //允许的上传类型
        type: String,
        default: 'image/jpeg,image/jpg,image/png,image/gif'
      },
      flag: [String, Number], //当前上传标识,以便于在同一个监听函数中区分不同的上传域
      maxSize: {
        type: Number,
        default: 0 //上传大小限制
      },
      inputResourceAddress: {},
    },
    methods: {
      upload(event) {
        if (this.inputResourceAddress.description == null || this.inputResourceAddress.description == '') {
          alert("需要选择图片类型");
        } else {
          let file = event.target.files[0]
          const self = this
          const flag = this.flag
          if (file) {
            if (this.maxSize) {
              //todo filter file
            }
            //filter file, 文件大小,类型等过滤
            //如果是图片文件
            // const reader = new FileReader()
            // const imageUrl = reader.readAsDataURL(file)
            // img.src = imageUrl //在预览区域插入图片

            const formData = new FormData()
            formData.append('file', file)

            console.info(this.inputResourceAddress.targetId)

            self.$http.post('http://118.89.61.144:8903/file/upload', formData, {
              progress(event) {
                //传递给父组件的progress方法
                self.$emit('progress', parseFloat(event.loaded / event.total * 100), flag)
              }
            }).then(response => {
              const result = response.body
              console.info(result)
              if (result.success == true) {
                var vm = this
                let reqParam = {
                  targetId: this.inputResourceAddress.targetId,
                  description: this.inputResourceAddress.description,
                  address: result.obj
                }
                //console.info(reqParam)
                self.$http.post(apiHost + "/resourceaddresses/",
                  reqParam, {
                    //模拟表单提交
                    emulateJSON: true
                  }).then((res) => {
                  if (res.data == 1) {
                    console.info("updated")
                    self.$emit('complete', 200, 1, flag)
                  }
                })
              }
            })
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
</style>
