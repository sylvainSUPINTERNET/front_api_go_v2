<template class="modal-generic">

    <div>

        <!-- only admin -->
        <div v-if="this.type === 'createVote'">
            <b-button id="show-btn" class="btn btn-lg btn-success" @click="$bvModal.show('modal-1')">Create Vote
            </b-button>
            <b-modal id="modal-1" title="Create new vote" hide-footer @hide="modalHide">
                <p class="my-4 text-center">Create your vote</p>
                <Form class="text-center" :submit="onSubmitVoteCreate" :initialValues="[
            {name: 'title', type:'text', value: [''], idLabel: 'vote-title', textLabel: 'Text :'},
            {name: 'desc', type:'text', value:[''], idLabel:'vote-text' ,textLabel: 'Description :'},
            ]"></Form>

                <b-alert show variant="danger text-center" v-show="this.error && this.errorMsg !== ''">
                    {{this.errorMsg}}
                </b-alert>

            </b-modal>
        </div>


        <div v-if="this.type === 'updateVote'">
            <b-button id="show-btn" class="btn btn-md btn-success" @click="$bvModal.show('modal-1')">Send vote <i class="fa fa-envelope"></i></b-button>
            <b-modal id="modal-1" hide-footer>
                <div class="d-block text-center">
                    <h3>Confirm your vote</h3>
                </div>
                <b-button class="mt-3" block @click="onSubmitVoteUpdate()">I confirm</b-button>
            </b-modal>
        </div>


        <div v-if="this.type === 'deleteUser'">
            <b-button id="show-btn-delete" class="btn btn-md btn-danger" @click="$bvModal.show('delete' + getIdModal(index))">Delete <i class="fa fa-ban"></i></b-button>
            <b-modal :id="'delete' + generateIdModal(index)" hide-footer>
                <div class="d-block text-center">
                    <h3>Are you sure to delete this user ?</h3>
                </div>
                <b-button class="mt-3" block @click="onSubmitUserDelete()">I confirm</b-button>
            </b-modal>
        </div>


        <div v-if="this.type === 'updateUser'">
            <b-button id="show-btn-update" class="ml-2 btn btn-md btn-info" @click="$bvModal.show('update' + getIdModal(index))">Update
                <i class="fa fa-edit"></i>
            </b-button>
            <b-modal :id="'update' + generateIdModal(index)" title="Update user" hide-footer @hide="modalHide">
                <p class="my-4 text-center">New informations</p>
                <Form class="text-center" :submit="onSubmitUserUpdate" :initialValues="[
            {name: 'email', type:'email', value: [''], idLabel: 'user-email-update', textLabel: 'New Email :'},
            ]"></Form>

                <b-alert show variant="danger text-center" v-show="this.error && this.errorMsg !== ''">
                    {{this.errorMsg}}
                </b-alert>

            </b-modal>
        </div>



        <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide>
            Hello, world! This is a toast message.
        </b-toast>

    </div>

</template>

<script>
    import Form from "./lib/Formik/Form";
    import votes from "../api/votes";
    import LocalStorageService from "../services/LocalStorageService";
    import users from "../api/users";

    export default {
        name: 'ModalGeneric',
        components: {
            Form
        },
        props: {
            type: String,
            accessLevel: String,
            index: Number,
            uuidToDelete: String,
            uuidToUpdate: String,
        },
        data: () => ({
            error: false,
            errorMsg: "",
            toastCount: 0
        }),
        methods: {
            onSubmitVoteCreate(formData) {
                let vote = {
                    desc: formData.desc,
                    title: formData.title
                };
                if (typeof vote.desc === 'undefined' || typeof vote.title === 'undefined') {
                    this.error = true;
                    this.errorMsg = "Invalid fields."
                } else {
                    this.$bvModal.hide('modal-1');

                    this.error = false;
                    this.errorMsg = "";

                    votes
                        .post(LocalStorageService.getToken(), vote)
                        .then((data) => {
                            this.$parent.votesList = [...this.$parent.votesList, data.data];
                            this.modalHide();
                            this.displayToast("Vote added !","Vote created with success");
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }

            },
            onSubmitUserUpdate(formData){
                users
                    .put(LocalStorageService.getToken(), this.uuidToUpdate, formData.email)
                    .then( (res) => {
                        if(res.http_status === 200) {
                            this.$bvModal.hide('update' + this.generateIdModal(this.index));

                            let objIndex = this.$parent.usersList.findIndex((obj => obj.uuid === this.uuidToUpdate));
                            this.$parent.usersList[objIndex].email = formData.email
                        }
                    })
                    .catch( err => {
                        console.log(err);
                    })
            },
            onSubmitVoteUpdate(){
                this.$bvModal.hide('modal-1');

                votes
                    .put(LocalStorageService.getToken(), this.$parent.vote.uuid  , this.$parent.userDecodedData["uuid"])
                    .then( (res) => {
                        this.$parent.vote.uuid_vote = res.data.uuid_vote
                        this.$parent.isVoted = true;
                    })
                    .catch( err => console.log(err))
            },
            onSubmitUserDelete(){
                users
                    .delete(LocalStorageService.getToken(), this.uuidToDelete)
                    .then( (res) => {
                        console.log(res);
                        this.$parent.usersList = this.$parent.usersList.filter(el => el.uuid !== this.uuidToDelete);
                    })
                    .catch( err => {
                        alert(err);
                    });
                },
            modalHide() {
                // reset these fields
                this.error = false;
                this.errorMsg = "";
            },
            generateIdModal(index){
                return "modal-"+index;
            },
            getIdModal(index){
                return "modal-"+index;
            },
            displayToast(title,msg) {
                this.$bvToast.toast(`${msg}`, {
                    title: `${title}`,
                    autoHideDelay: 5000,
                    appendToast: true
                })

            }
        },
    }
</script>

