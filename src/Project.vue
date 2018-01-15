<template>

    <div class="causes-page-wrapper single-cause">
        <div class="container">
            <div class="row cause">
                <div class="col-md-10 col-md-offset-1">
                    <div class="image-wrapper">
                        <img v-bind:src="this.projectimage">
                    </div>
                    <div class="meta">
                        <h2>{{ proj.title }}</h2>
                        <h4>{{ proj.subtitle }}</h4>
                        <div class="short-stats clearfix">
                            <h5><i class="fa fa-heart-o"></i>Created by {{proj.creators[0].username}} on {{new Date(proj.creationDate).toDateString()}}</h5>
                            <h5><i class="fa fa-heart-o"></i>{{proj.progress.numberOfBackers}} donors</h5>
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="foundings">
                            <div class="progress-bar-wrapper min">
                                <div class="progress-bar-outer">
                                   <p class="values"><span class="value one">Raised: ${{proj.progress.currentPledged}}</span>/<span class="value two"> Goal: ${{ proj.target}}</span></p>
                                    <div class="progress-bar-inner">
                                        <div class="progress-bar">
                                            <span data-percent="75"> <span class="pretng">75%</span> </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="donation clearfix">
                        <ul class="tabs-switcher nav nav-tabs clearfix">
                            <li class="active">
                                <a data-toggle="tab" href="#tab-details"><i class="fa fa-paypal"></i> Details</a>
                            </li>
                            <li>
                                <a data-toggle="tab" href="#tab-pledges"><i class="fa fa-cc-visa"></i> Pledges</a>
                            </li>
                            <li>
                                <a data-toggle="tab" href="#tab-rewards"><i class="fa fa-cc-visa"></i> Rewards</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane row active" id="tab-details">
                                <div class="description_box top5">{{proj.description}}</div>
                            </div>
                            <div class="tab-pane row top5" id="tab-pledges">
                                <h3>Pledges</h3>
                                <ul class="top5">
                                    <li v-for="donor in this.pledges">
                                        <p>{{ donor.username }} - ${{ donor.amount}}</p>
                                    </li>
                                </ul>

                            </div>
                            <div class="tab-pane row" id="tab-rewards">
                                <div v-for="prize in proj.rewards"class="pledges_block_info top5">
                                    <div class="pledge_amount">Pledge ${{ prize.amount }}</div>
                                    <div id="pledges_block_info_1">
                                        <div class="pledges_block_info_text">{{ prize.description }}</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="donation-wrapper" id="donate">
            <div class="container" >
                <div class="row">
                    <div class="col-md-10 col-md-offset-1">
                        <div class="donation clearfix">
                                    <h2 class="col-xs-12">Donate Now</h2>
                                    <form class="donation-form col-xs-12 row">
                                        <div class="field col-sm-6">
                                            <div class="radio-inputs">
                                                <label for="amount"><span></span>Donation Amount</label>
                                                <input v-model="amount" type="number" id="amount">
                                                <label for="anon">Make donation Anonymous</label>
                                                <input v-model="anon" type="checkbox" id="anon">
                                            </div>
                                        </div>
                                        <div class="field col-sm-6">
                                            <a v-if="this.$session.exists() && this.$session.get('uid') != proj.creators[0].id" v-on:click="doPledge()" class="btn btn-big btn-solid "><i class="fa fa-archive"></i><span>Donate Now</span></a>
                                            <a v-if="this.$session.get('uid') === proj.creators[0].id" v-on:click="closeProject()" class="btn btn-big btn-solid "><i class="fa fa-archive"></i><span>Close Project</span></a>
                                        </div>
                                    </form>
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
                proj: "",
                projectimage: "",
                API: "http://csse-s365.canterbury.ac.nz:4896/api/v2/",
                pledges: [],
                amount: "",
                anon: false,
            }
        },
        mounted: function() {
            this.getSingleProject();
            this.getProjectImage();
        },
        methods: {
            getSingleProject: function() {
                this.$http.get(this.API + 'projects/' + this.$route.params.projid)
                    .then(function(response) {
                        this.proj = response.data;
                        let pledges = [];
                        let anon = {
                            "id": 0,
                            "username": "Anonymous",
                            "amount": 0
                        };
                        response.data.backers.slice(-5).forEach( function (backer)
                        {
                            console.log(backer.username);
                            if (backer.username === 'anonymous'){
                                anon.amount += backer.amount;
                            } else {
                                pledges.push(backer)
                            }
                        });
                        if (anon.amount > 0){
                        pledges.push(anon);}
                        this.pledges = pledges;
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
            getProjectImage: function() {
                this.$http.get(this.API + 'projects/' + this.$route.params.projid + "/image")
                .then(response => {

                    this.projectimage = window.URL.createObjectURL(new Blob([response.body], {type : 'image/jpeg'}));
                });

            },
            doPledge: function() {
                if (this.amount === ""){
                    alert("Please enter a valid number");
                } else{
                let pledgedata =
                    {
                        "id": this.$session.get("uid"),
                        "amount": parseInt(this.amount),
                        "anonymous": this.anon,
                        "card": {
                            "authToken": this.$session.get("jwt")
                        }
                    };
                this.$http.post(this.API + 'projects/' + this.$route.params.projid +  '/pledge', pledgedata, {
                    headers: {
                        'X-Authorization': this.$session.get("jwt")
                    }})
                    .then((response) => {
                        if (response.status === 201){
                            alert("Successfully Pledged");
                        } else {
                            alert("Please enter a valid number");
                        }
                    }, function(error) {
                        this.error = error.body;
                        this.errorFlag = true;
                    });}
            },
            closeProject: function() {
                let status =
                    {
                        "open": false
                    };
                this.$http.put(this.API + 'projects/' + this.$route.params.projid , status, {
                    headers: {
                        'X-Authorization': this.$session.get("jwt")
                    }})
                    .then((response) => {
                        if (response.status === 201){
                            alert("Successfully Closed");
                            this.$router.push('/')
                        }
                    }, function(error) {
                        this.error = error.body;
                        this.errorFlag = true;
                    });
            }
        }
    }
</script>