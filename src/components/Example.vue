<template>
  <div>
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-lg-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5>技能示例</h5>

            </div>
            <div class="ibox-content">
              <ul class="nav nav-pills">
                <li role="presentation" v-for="skill in allSkills"><a href="#" @click="displayExample(skill)">{{skill.name}}</a></li>
              </ul>
              <br>
              <strong>{{exampleName}}</strong>
              <br>
              

            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    created: function() {
      var vm = this;
      vm.$http.get('/api/bg/skills/').then((res) => {
        this.allSkills = res.data;
        console.info(this.allSkills)
        this.exampleName = this.allSkills[0].name
      })
    },
    data() {
      return {
        skill: {},
        allSkills: [],
        exampleDisplay: '',
        exampleName:'',
      }
    },
    methods: {
      displayExample(skill) {
        this.exampleDisplay = skill.name;
      }
    },
  }
</script>

<style>
</style>
