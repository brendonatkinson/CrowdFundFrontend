<template>

    <div>

        <div v-if="this.$session.exists()">
            <div class="donation-wrapper" id="userdetails">
                <div class="container" >
                    <div class="row">
                        <div class="col-md-10 col-md-offset-1">
                            <div class="donation clearfix">
                                <ul class="tabs-switcher nav nav-tabs clearfix">
                                    <li class="active">
                                        <a data-toggle="tab" href="#projects"><i class="fa fa-pencil-square-o"></i>My Projects</a>
                                    </li>
                                    <li>
                                        <a data-toggle="tab" href="#details"><i class="fa fa-id-card-o"></i>User Details</a>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane row active" id="projects">
                                        <!-- Show Owned Projects-->
                                        <h2>Owned projects</h2><br>
                                        <table>
                                            <h3>Open</h3><br>
                                            <tr v-for= "project in ownedprojects">
                                                <td v-if="project.open === true"><router-link :to="{ name: 'project', params: {projid: project.id}}">{{project.title}}</router-link></td>
                                            </tr><br>
                                            <h3>Closed</h3><br>
                                            <tr v-for= "project in ownedprojects">
                                                <td v-if="project.open === false"><router-link :to="{ name: 'project', params: {projid: project.id}}">{{project.title}}</router-link></td>
                                            </tr>
                                        </table><br>

                                        <v-dialog/>

                                        <!-- Show Pledged Projects -->
                                        <h1>Pledged projects</h1>
                                        <table>
                                            <tr v-for= "project in backedprojects">
                                                <td><router-link :to="{ name: 'project', params: {projid: project.id}}">{{project.title}}</router-link></td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="tab-pane row" id="details">
                                        <p class="col-xs-12">Update Details</p>
                                        <form class="donation-form col-xs-12 row">
                                            <div class="field col-sm-6">
                                                <h4>Username</h4>
                                                <input v-model="username" type="text" name="username">
                                            </div>
                                            <div class="field col-sm-6">
                                                <h4>Email</h4>
                                                <input v-model="email" type="email" name="email">
                                            </div>
                                            <div class="field col-sm-6">
                                                <h4>Password</h4>
                                                <input v-model="passwd" type="text" name="PW">
                                            </div>
                                            <div class="field col-sm-6">
                                                <h4>Location</h4>
                                                <input v-model="location" type="text" name="Locale">
                                            </div>
                                            <div class="field col-sm-6">
                                                <a v-on:click="updateAccount()" class="btn btn-big btn-solid "><i class="fa fa-id-card-o"></i><span>Update Account</span></a>
                                                <a v-on:click="show()" class="btn btn-big btn-solid "><i class="fa fa-times"></i><span>Delete Account</span></a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div v-else>
            <div class="donation-wrapper" id="logreg">
                <div class="container" >
                    <div class="row">
                        <div class="col-md-10 col-md-offset-1">
                            <div class="donation clearfix">
                                <ul class="tabs-switcher nav nav-tabs clearfix">
                                    <li v-bind:class="{ active: isLogin }">
                                        <a data-toggle="tab" href="#tab-1"><i class="fa fa-unlock"></i>Login</a>
                                    </li>
                                    <li v-bind:class="{ active: isRegister }">
                                        <a data-toggle="tab" href="#tab-2"><i class="fa fa-id-card-o"></i>Register</a>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane row" v-bind:class="{ active: isLogin }" id="tab-1">
                                        <p class="col-xs-12">Please Login</p>
                                        <form class="donation-form col-xs-12 row">
                                            <div class="field col-sm-6">
                                                <h4>Username</h4>
                                                <input v-model="username" type="text">
                                            </div>
                                            <div class="field col-sm-6">
                                                <h4>Email</h4>
                                                <input v-model="email" type="text">
                                            </div>
                                            <div class="field col-sm-6">
                                                <h4>Password</h4>
                                                <input v-model="passwd" type="password">
                                            </div>
                                            <div class="field col-sm-6">
                                                <a v-on:click="doLogin()" class="btn btn-big btn-solid "><i class="fa fa-unlock"></i><span>Login</span></a>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="tab-pane row" v-bind:class="{ active: isRegister }" id="tab-2">
                                        <p class="col-xs-12">Please Register an account</p>
                                        <form class="donation-form col-xs-12 row">
                                            <div class="field col-sm-6">
                                                <h4>Username</h4>
                                                <input v-model="username" type="text">
                                            </div>
                                            <div class="field col-sm-6">
                                                <h4>Email</h4>
                                                <input v-model="email" type="text">
                                            </div>
                                            <div class="field col-sm-6">
                                                <h4>Password</h4>
                                                <input v-model="passwd" type="password">
                                            </div>
                                            <div class="field col-sm-6">
                                                <h4>Location</h4>
                                                <input v-model="location" type="text">
                                            </div>
                                            <div class="field col-sm-6">
                                                <a v-on:click="doRegister()" class="btn btn-big btn-solid "><i class="fa fa-id-card-o"></i><span>Register Now</span></a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                API: "http://csse-s365.canterbury.ac.nz:4896/api/v2/",
                username: "",
                email: "",
                passwd: "",
                location: "",
                ownedprojects: [],
                backedprojects: [],
                isLogin: false,
                isRegister: false
            }
        },
        mounted: function() {
            this.getUserProjects();
            this.pageInit();
            this.getUserDetails();
        },
        methods: {
            doLogin: function() {
                if ((this.username === "" && this.email === "") || this.passwd === "") {
                    alert("Please fill all details. Username or Email required")
                } else {
                    let loginstring = "";
                    if (this.username === ""){
                        loginstring = 'users/login?email=' + this.email + '&password=' + this.passwd
                    } else {
                        loginstring = 'users/login?username=' + this.username + '&password=' + this.passwd
                    }
                    this.$http.post(this.API + loginstring)
                        .then((response) => {
                            if (response.status === 200 && 'token' in response.data) {
                                //Kill previous login data
                                this.$session.destroy();
                                this.$session.clear();
                                this.$session.start();
                                this.$session.set('jwt', response.body.token);
                                this.$session.set('uid', response.body.id);
                                this.$router.push('/')
                            }
                        }, function (error) {
                            alert("Login Failed");
                            this.error = error.body;
                            this.errorFlag = true;
                        }
                    );
                }
            },
            doRegister: function() {
                if (this.username === "" || this.email === "" || this.passwd === ""){
                    alert("Please fill in all details to register")
                } else if (this.email.indexOf("@") === -1){
                    alert("Invalid Email")
                }
                else {
                let userdata =
                    {
                        "username": this.username,
                        "email": this.email,
                        "password": this.passwd,
                        "location": this.location
                    };
                this.$http.post(this.API + 'users', userdata)
                    .then((response) => {
                        if (response.status === 201){
                            alert("Successfully Registered");
                            this.doLogin();
                        } else{
                            alert("Registration Failed :(")
                        }
                    }, function(error) {
                        this.error = error.body;
                        this.errorFlag = true;
                    });
            }},
            getUserProjects: function() {
                if(this.$session.exists()){
                    let id = this.$session.get('uid');

                    this.$http.get(this.API + 'projects?creator='+ id)
                        .then(function(response) {
                            this.ownedprojects = response.data;
                        }, function(error) {
                            this.error = error;
                            this.errorFlag = true;
                        });

                    this.$http.get(this.API + 'projects?backer='+ id)
                        .then(function(response) {
                            this.backedprojects = response.data;
                            this.backedprojects = this.backedprojects.filter((thing, index, self) =>
                                self.findIndex((t) => {return t.id === thing.id; }) === index)
                        }, function(error) {
                            this.error = error;
                            this.errorFlag = true;
                        });
                }


            },
            getUserDetails: function() {
                if(this.$session.exists()){
                    let id = this.$session.get('uid');

                    this.$http.get(this.API + 'users/'+ id, {
                        headers: {
                            'X-Authorization': this.$session.get("jwt")
                        }})
                        .then(function(response) {

                            this.username = response.data.username;
                            this.email = response.data.email;
                            this.location = response.data.location;
                            console.log(this.email);
                        }, function(error) {
                            this.error = error;
                            this.errorFlag = true;
                        });
                }


            },
            pageInit () {
                if (this.$route.name === "register"){
                    this.isRegister = true;
                } else {
                    this.isLogin = true;
                }
            },
            updateAccount: function() {
                if (this.username === "" || this.email === "" || this.passwd === "" || this.location === ""){
                    alert("Please fill in all details to register")
                } else if (this.email.indexOf("@") === -1){
                    alert("Invalid Email")
                }
                else {
                    let userdata =
                        {
                            "username": this.username,
                            "email": this.email,
                            "password": this.passwd,
                            "location": this.location
                        };
                    this.$http.put(this.API + 'users/' + this.$session.get('uid'), userdata, {
                        headers: {
                            'X-Authorization': this.$session.get("jwt")
                        }})
                        .then((response) => {
                            if (response.status === 200){
                                alert("Successfully Updated");
                                this.doLogin();
                            } else{
                                alert("Update Failed :(")
                            }
                        }, function(error) {
                            this.error = error.body;
                            this.errorFlag = true;
                        });
                }},
            show () {
                this.$modal.show('dialog', {
                    title: 'Deleting Account',
                    text: 'Are you sure you want to delete your user account?',
                    buttons: [
                        { title: 'Delete Account', handler: () => {
                            this.$http.delete(this.API + 'users/' + this.$session.get('uid'), {
                                headers: {
                                    'X-Authorization': this.$session.get("jwt")
                                }})
                                .then((response) => {
                                    if (response.status === 200){
                                        this.$session.destroy();
                                        this.$router.push('/');
                                        this.$modal.hide('dialog');
                                    } else{
                                        alert("Delete Failed :(")
                                    }
                                }, function(error) {
                                    this.error = error.body;
                                    this.errorFlag = true;
                                });

                        } },
                        { title: 'Close' }
                    ]
                })
            },
            hide () {
                this.$modal.hide('dialog');
            }
        }
    }
</script>