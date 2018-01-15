<template>
    <div><router-link v-if="this.$session.exists()" class="btn btn-big btn-solid" :to="{name: 'newproject'}"><i class="fa fa-archive"></i><span>Create New Project</span></router-link>
    <div class="grid-cause-area">
        <div class="container">
            <div class="row">

                <paginate name="proj_list" :list="filteredProjects" :per="6">
                <div v-for="proj in paginated('proj_list')" class="col-md-4 col-sm-6 col-xs-12 projectbox">
                <!--<div v-for="proj in filteredProjects" class="col-md-4 col-sm-6 col-xs-12">-->
                    <div class="cause content-box">
                        <div class="img-wrapper">
                            <div class="overlay">
                            </div>
                            <img class="img-responsive" src="assets/img/causes/img-1.jpg" alt="">
                        </div>
                        <div class="info-block">
                            <h4><router-link :to="{ name: 'project', params: {projid: proj.id}}">{{proj.title}}</router-link>
                                </h4>
                            <p>{{proj.subtitle}}</p>

                        </div>
                    </div>
                </div>
                </paginate>


            </div>
            <div class="pagination-wrapper">
                <paginate-links
                        for="proj_list"
                        :simple="{prev: 'Back',
                                next: 'Next'
                                }"
                        :classes="{'ul': 'pagination'}">
                </paginate-links>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                error: "",
                errorFlag: false,
                projects: [],
                paginate: ['proj_list'],
                API: "http://csse-s365.canterbury.ac.nz:4896/api/v2/"
            }
        },
        mounted: function() {
            this.getProjects();
        },
        computed: {
                filteredProjects:function()
                {
                    let self=this;
                    return self.projects.filter(function(proj){return proj.title.toLowerCase().indexOf(self.$parent.search.toLowerCase())>=0;});
                }
            },
        methods: {
            getProjects: function() {
                this.$http.get(this.API + 'projects?open=true')
                    .then(function(response) {
                        this.projects = response.data;
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
            getSingleProject: function(id) {
                this.$http.get(this.API + 'projects/' + id)
                    .then(function(response) {
                        this.proj = response.data;
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            }
        }
    }
</script>