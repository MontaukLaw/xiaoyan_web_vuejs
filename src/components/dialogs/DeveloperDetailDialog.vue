<template>
  <div>
    <div class="dialog-cover" @click="closeMe" v-if="ifShowMe">
    </div>
    <transition name="drop">
      <div class="dialog-content developer-detail" v-if="ifShowMe">
      <!--  <p class="dialog-close" @click="closeMe">
          <i class="fa fa-rotate-left"></i>
        </p> -->
        <slot>empty here if you cant see the slot</slot>
        <!-- <slot>empty here if you cant see the slot </slot> -->
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      ifShowMe: {
        type: Boolean,
        default: false
      },
      developer: {

      },
      inputDeveloper: {

      },
      developerReadyToEdit: {

      }
    },
    data() {
      return {

      };
    },
    methods: {
      closeMe() {
        //向上激活一个自定义event
        this.$emit('on-close')
      },
    }
  }
</script>

<style scoped>
  .dialog-content.developer-detail {
    width: 50%;
    position: fixed;
    max-height: 80%;
    overflow: auto;
    background: #fff;
    top: 20%;
    left: 50%;
    margin-left: -25%;
    z-index: 10;
    border: 2px solid #464068;
    padding: 2%;
    line-height: 1.6;
    text-align: left;
  }
</style>
