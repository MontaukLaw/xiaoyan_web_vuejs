<template>
  <tr>
    <td>
      <div class="row v-center">
        <div class="col-md-4">
          <span v-show="ifShowExample">
            {{example.example}}
          </span>
          <span v-show="ifShowInput">
            <input type="text" class="form-control input-sm" v-model="exampleInInput">
          </span>
        </div>
        <div class="col-md-2">
          <span v-show="ifShowExample">
            <button type="button" class="btn btn-warning btn-sm" @click="enterEditExample()">
              <i class="fa fa-edit"></i>
            </button>
          </span>
          <span v-show="ifShowInput">
            <button type="button" class="btn btn-warning btn-sm" @click="editExample()">
              <i class="fa fa-check"></i>
            </button>
          </span>
          <button type="button" class="btn btn-warning btn-sm" @click="removeExample()">
            <i class="fa fa-minus"></i>
          </button>
        <!--  <button type="button" class="btn btn-warning btn-sm" @click="testEmit()">
            <i class="fa fa-star"></i>
          </button> -->
        </div>
      </div>

    </td>
  </tr>
</template>

<script>
  export default {
    props: {
      itemIndex: 0,
      example: Object,
    },
    data() {
      return {
        ifShowInput: false,
        ifShowExample: true,
        exampleInInput: "",
        show: false,
        inputTemp: ""
      }
    },
    created: function() {
      //console.info(this.example.example)
      this.exampleInInput = this.example.example
    },
    methods: {
      toggleInputDisplay() {
        this.ifShowExample = !this.ifShowExample
        this.ifShowInput = !this.ifShowInput
      },
      toggleShow() {
        this.show = !this.show
      },
      removeExample() {
        var vm = this
        console.info(this.example.id)
        vm.$http.delete(apiHost + '/skillexamples/' + this.example.id).then((res) => {
          console.info(res.data)
          if (res.data == 1) {
            //window.location.reload();
            console.info("deleted")
            //向上emit一个时间
            this.$emit('on-refresh')
          }
        })
      },
      enterEditExample() {
        this.toggleInputDisplay();
        this.inputTemp = this.exampleInInput
        //console.info(this.itemIndex)
      },
      editExample() {
        if (this.inputTemp != this.exampleInInput) {
          this.example.example = this.exampleInInput
          this.inputTemp = this.exampleInInput
          var vm = this
          let reqParam = {
            example: this.exampleInInput,
          }
          vm.$http.put(
            //localhost:8903/bg/skillexamples/:id
            apiHost + '/skillexamples/' + this.example.id,
            reqParam, {
              //模拟表单提交
              emulateJSON: true
            }).then((res) => {
            if (res.data == 1) {
              console.info("updated")
            }
          })
        }
        this.toggleInputDisplay();
      },
    },
    computed: {
      transText(){
      }
    }
  }
</script>

<style>
  .v-center {
    display: flex;
    align-items: center;
  }
</style>
