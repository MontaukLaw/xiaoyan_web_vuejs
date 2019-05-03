<template>
  <div>
    <nav class="navbar-default navbar-static-side" role="navigation">
      <div class="sidebar-collapse">
        <ul class="nav metismenu" id="side-menu">
          <li class="nav-header">
            <div class="dropdown profile-element"> <span>
                <img alt="image" class="img-circle" src="../../static/img/profile_small.jpg" />
              </span>
              <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                <span class="clear"> <span class="block m-t-xs"> <strong class="font-bold">王测试</strong>
                  </span> <span class="text-muted text-xs block">管理员 <b class="caret"></b></span> </span> </a>
              <ul class="dropdown-menu animated fadeInRight m-t-xs">
                <li><a href="login.html">登出</a></li>
              </ul>
            </div>
            <div class="logo-element">
              CH+
            </div>
          </li>
          <li>
            <a href="index.html"><i class="fa fa-th-large"></i> <span class="nav-label">内容运营</span> <span class="fa arrow"></span></a>
            <ul class="nav nav-second-level">
              <!--  <li>
                <router-link to="/fileupload">图片上传</router-link>
              </li> -->
              <li>
                <router-link to="/featuredcontent">推荐内容</router-link>
              </li>
              <li>
                <router-link to="/banner">滚动条/Banner</router-link>
              </li>
              <li>
                <router-link to="/miguvoice">咪咕听书</router-link>
              </li>
              <!--  -->
              <!--  <li>
                <router-link to="/images">图片管理</router-link>
              </li> -->
            </ul>
          </li>
          <li class="active">
            <a href="system.html"><i class="fa fa-diamond"></i> <span class="nav-label">技能相关</span> <span class="fa arrow"></span></a>
            <ul class="nav nav-second-level">
              <li>
                <router-link to="/develpoer">开发者信息</router-link>
              </li>
              <li>
                <router-link to="/skill">技能</router-link>
              </li>
              <li>
                <router-link to="/example">技能示例</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
</script>

<style>
</style>
