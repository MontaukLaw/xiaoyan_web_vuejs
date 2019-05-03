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
              <figure class="upload-preview">
                <img :src="thumbnail" v-if="thumbnail" />
              </figure>
              <mo-upload flag="'thumbnail'" @complete="uploadComplete" @progress="uploadProgress">
                <a>选择图片文件<i class="progress" :style="{width:progress + '%'}"></i></a>
              </mo-upload>
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
    data() {
      return {
        thumbnail: null,
        progress: 0 //上传进度
      }
    },
    methods: {
      uploadProgress(progress, flag) {
        //这里可以通过回调的flag对不同上传域做处理
        this.progress = progress < 100 ? progress : 0;
      },
      uploadComplete(status, result, flag) {
        if (status == 200) { //
          this.thumbnail = `domain.com/${result.key}` //七牛域名 + 返回的key 组成文件url
        } else {
          //失败处理
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
</style>
