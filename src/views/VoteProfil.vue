<template>
    <div class="vote-profil container">
        <h3 class="text-center mt-4">Vote : {{$route.params.uuid}}</h3>
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-header text-center">Status</div>
                    <div class="card-body">
                        <p class="text-justify">{{this.vote.desc}}</p>
                        <div class="text-center">

                            <div v-show="!isVoted">
                                <modal-generic type="updateVote"
                                               :access-level="userDecodedData.accessLevel"></modal-generic>
                            </div>

                            <div v-show="isVoted">
                                <p class="alert alert-danger">You already vote</p>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div v-if="this.vote.uuid_vote.length > 0">
                        <h4 class="ml-4 text-center">Votes</h4>
                        <ul class="list-group">


                            <li v-for="voter in this.vote.uuid_vote" class="list-group-item">
                                <i class="fa fa-user"></i> {{voter}}
                            </li>

                        </ul>
                    </div>
                    <div v-show="this.vote.uuid_vote.length === 0">
                        <p class="alert alert-warning text-center m-5">No votes for the moment.</p>
                    </div>

                    <div class="card-footer">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


    import localStorageService from "../services/LocalStorageService";
    import * as jsonwebtoken from "jsonwebtoken";
    import configAuth from "../config/authentication";
    import votes from "../api/votes";
    import ModalGeneric from "../components/ModalGeneric";

    export default {
        name: 'voteProfil',
        components: {
            ModalGeneric
        },
        props: {},
        data: () => ({
            userDecodedData: "",
            vote: {
                uuid_vote: [],
                desc: "",
                title: ""
            },
            isVoted: false
        }),
        methods: {
            decodedToken: function () {
                return jsonwebtoken.verify(localStorageService.getToken(), configAuth.jwtSecret);
            },
            getVote: async function () {
                let uuid = this.$route.params.uuid;

                try {
                    const voteData = await votes.getOne(localStorageService.getToken(), uuid);
                    return voteData;
                } catch (e) {

                }
            },
            getUserUrl(uuid) {
                return `/users/${uuid}`
            },
        },
        created: function () {
            this.userDecodedData = this.decodedToken();
            this.getVote()
                .then((res) => {
                    this.vote = res.data
                    this.isVoted = res.data.uuid_vote.includes(this.userDecodedData["uuid"])
                })
                .catch(err => console.log(err))
        }
    }
</script>




