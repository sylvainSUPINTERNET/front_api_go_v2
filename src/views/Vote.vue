<template>
    <div class="vote container">
        <h3 class="text-center mt-4">Vote</h3>


        <!--{{votesList}}-->


        <div v-show="userDecodedData.accessLevel === 'ROLE_ADMIN'" >
            <b-card
                    overlay
                    img-src="https://picsum.photos/seed/picsum/900/300"
                    img-alt="Card Image"
                    text-variant="white"
                    class="text-center"
                    title="Let's start a new vote !"
                    sub-title="">
                <b-card-text>

                    <div class="mt-1">
                        <modal-generic type="createVote" :access-level="userDecodedData.accessLevel"></modal-generic>
                    </div>

                </b-card-text>
            </b-card>
        </div>


        <div v-show="userDecodedData.accessLevel === 'ROLE_ADMIN'">
            <hr>
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="card-header text-center">Votes en cours</div>
                        <div class="card-body">
                            <div v-for="v in votesList">
                                <ul class="list-group">
                                    <li class="list-group-item"><strong>Title</strong> {{v.title}}</li>
                                    <!--<li class="list-group-item"><strong >Description</strong> {{v.desc}} </li>-->
                                    <li class="list-group-item">
                                        <div  class="mt-3">
                                            <i class="fa fa-eye"></i> <a :href="getVoteUrl(v.uuid)">Voir plus</a>
                                        </div>
                                    </li>
                                </ul>
                                <hr>
                            </div>
                        </div>
                        <div class="card-footer">
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div v-show="userDecodedData.accessLevel === 'ROLE_USER'">
            <hr>
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="card-header text-center">Votes en cours</div>
                        <div class="card-body">
                            <div v-for="v in votesList">
                                <ul class="list-group">
                                    <li class="list-group-item"><strong>Title</strong> {{v.title}}</li>
                                    <!--<li class="list-group-item"><strong >Description</strong> {{v.desc}} </li>-->
                                    <li class="list-group-item">
                                        <div  class="mt-3">
                                            <i class="fa fa-eye"></i> <a :href="getVoteUrl(v.uuid)">Voir plus</a>
                                        </div>
                                    </li>
                                </ul>
                                <hr>
                            </div>
                        </div>
                        <div class="card-footer">
                        </div>
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
        name: 'vote',
        components: {
            ModalGeneric
        },
        props: {},
        data: () => ({
            userDecodedData: "",
            votesList: {}
        }),
        methods: {
            decodedToken: function () {
                return jsonwebtoken.verify(localStorageService.getToken(), configAuth.jwtSecret);
            },
            getVotes: async function () {
                try {
                    const votesData = await votes.get(localStorageService.getToken());
                    return votesData;
                } catch (e) {

                }
            },
            getVoteUrl(uuid){
                return `/votes/${uuid}`
            }
        },
        created: function () {
            this.userDecodedData = this.decodedToken();
            this.getVotes()
                .then((res => this.votesList = res.data.Value))
                .catch(err => console.log(err))
        }
    }
</script>




