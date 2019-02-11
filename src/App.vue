<template>
  <div id="app">
    <left-nav>

    </left-nav>
    <div id="page-wrapper" class="gray-bg">
      <div class="row border-bottom">
        <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
          <ul class="nav navbar-top-links navbar-right">
            <li>
              <span class="m-r-sm text-muted welcome-message">欢迎来到云耳晓言项目管理后台 (建议使用Firefox或Chrome浏览器访问)</span>
            </li>
            <li>
              <a href="login.html">
                <i class="fa fa-sign-out"></i> 注销
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <keep-alive>
        <router-view />
      </keep-alive>

      <div class="footer">
        <div class="pull-right">
          <strong>www.cloudhearing.cn</strong>
        </div>
        <div>
          <strong></strong> 云耳科技 &copy; 2016-2019 系统维护 Marc LUO zunly@hotmail.com
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LeftNav from "./components/LeftNav"
  export default {
    name: 'App',
    components: {
      LeftNav,
    }
  }
</script>

<style>
  #app {}

  /*   font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px; */
</style>
