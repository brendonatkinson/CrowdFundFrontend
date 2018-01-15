<template>
    <div>
    <!-- header -->
    <header>
        <div id="search-bar">
            <div class="container">
                <div class="row">
                    <form action="#" name="search" class="col-xs-12">
                        <input v-model="search" type="text" name="search" placeholder="Enter Search Term"><i id="search-close" class="fa fa-close"></i>
                    </form>
                </div>
            </div>
        </div>
        <nav  class="navigation">
            <div class="container">
                <div class="row">
                    <div class="logo-wrap col-md-3 col-xs-6">
                        <router-link :to="{name: 'projects'}">Kindness</router-link>
                    </div>
                    <div class="menu-wrap col-md-8 ">
                        <ul class="menu">
                            <li >
                                <router-link :to="{name: 'projects'}">Home</router-link>
                            </li>

                            <li>
                                <router-link :to="{name: 'profile'}">Profile</router-link>
                            </li>
                            <li v-if="this.$session.exists()">
                                <a v-on:click="show()">Logout</a>
                            </li>
                            <li v-else>
                                <router-link :to="{name: 'login'}">Login</router-link>
                            </li>
                            <li v-if="!this.$session.exists()">
                                <router-link  :to="{name: 'register'}">Register</router-link>
                            </li>

                        </ul>
                    </div>
                    <div class="col-md-1 col-xs-6">
                        <div id="search-toggle">
                            <i class="fa fa-search"></i>
                        </div>
                    </div>
                </div>
            </div>

        </nav>

    </header>
        <v-dialog/>
    <div class="causes-page-wrapper single-cause">
        <div class="container"> <router-view></router-view>

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
                search: ""
            }
        },
        methods: {
            show () {
                this.$modal.show('dialog', {
                    title: 'Logging Out',
                    text: 'Are you sure you want to logout?',
                    buttons: [
                        { title: 'Logout', handler: () => {
                            this.$http.post(this.API + "users/logout", {}, {
                                headers: {
                                    'X-Authorization': this.$session.get("jwt")
                                }})
                                .then(function(response) {
                                    if (response.status === 200){
                                        this.$session.destroy();
                                        this.$router.push('/');
                                        this.$modal.hide('dialog');
                                    }
                                }, function(error) {
                                    this.error = error;
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
