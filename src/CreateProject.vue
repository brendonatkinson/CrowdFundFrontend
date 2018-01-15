
<template>
    <div>
        <div class="container">
            <h3>Project Details</h3>
            <form class="donation-form col-xs-12 row">
                <div class="field col-sm-6">
                    <h4>Title</h4>
                    <input v-model="title" type="text">
                </div>
                <div class="field col-sm-6">
                    <h4>Subtitle</h4>
                    <input v-model="subtitle" type="text">
                </div>
                <div class="field col-sm-6">
                    <h4>Description</h4>
                    <input v-model="description" type="text">
                </div>
                <div class="field col-sm-6">
                    <h4>Target</h4>
                    <input v-model="target" type="number">
                </div>
                <v-dialog/>
                <div class="field col-sm-6">
                <h3>Rewards</h3><br>
                        <input v-model="amount" placeholder="Amount"><br>
                        <input v-model="rewdescription" placeholder="Description">
                    <a v-on:click="addNewReward" class="btn btn-big btn-solid "><i class="fa fa-id-card-o"></i><span>Add Reward</span></a>
                <br>
                    <ul>
                            <li v-for="gift in rewards">${{gift.amount}} - {{gift.description}}</li>
                        </ul>
                </div>


                <div class="field col-sm-6">
                    <a v-on:click="createProject()" class="btn btn-big btn-solid "><i class="fa fa-id-card-o"></i><span>Create Project</span></a>
                </div>
            </form>
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
                amount: "",
                rewdescription: "",
                rewards: [],
                title: "",
                subtitle: "",
                description: "",
                target: 0

            }
        },
        methods: {
            addNewReward: function () {
                if (this.amount !== "" || this.rewdescription !== ""){
                    this.rewards.push({
                        amount: parseInt(this.amount),
                        description: this.rewdescription
                    });
                }
            },
            createProject: function() {
                if (this.title === "" || this.subtitle === "" || this.description === "" || this.target === 0 || this.rewards.length === 0){
                    alert("Please fill in all details to create a new project")
                }
                else {
                    let projectdata =
                        {
                            "title": this.title,
                            "subtitle": this.subtitle,
                            "description": this.description,
                            "target": parseInt(this.target),
                            "creators": [
                                {
                                    "id": this.$session.get('uid')
                                }
                            ],
                            "rewards": this.rewards
                        };
                    this.$http.post(this.API + '/projects', projectdata, {
                        headers: {
                            'X-Authorization': this.$session.get("jwt")
                        }})
                        .then((response) => {
                            if (response.status === 201){
                                alert("Successfully Created");
                                this.doLogin();
                            } else{
                                alert("Create Failed :(")
                            }
                        }, function(error) {
                            this.error = error.body;
                            this.errorFlag = true;
                        });
                }},
        }
    }
</script>



