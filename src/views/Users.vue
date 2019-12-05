<template>
    <div class="users container">
        <h1 class="text-center mt-4">Manage users</h1>

        <!--{{usersList}} -->
        <div class="mt-5">
            <div class="card mb-3" v-for="(u, index) in usersList">
                <div class="card-body">
                    <div class="card-header">
                        n° <strong><i>{{u.uuid}}</i></strong>
                    </div>
                    <div>
                        <div class="row">
                            <div class="col">
                                <img src="https://via.placeholder.com/150.png/09f/fff%20C/O%20https://placeholder.com/" class="rounded float-right mt-2">
                                <strong>{{u.first_name}} {{u.last_name}}</strong>
                            </div>
                            <hr class="my-4"/>
                        </div>
                        <div class="col">
                            <p class="text-info"><strong>@</strong>{{u.email}}</p>
                        </div>
                        <div class="col">
                            Role : <strong>{{u.accessLevel}}</strong>
                        </div>
                        <div class="card-footer row mt-2 text-center">

                            <modal-generic type="deleteUser" :access-level="userDecodedData.accessLevel" :index="index" :uuidToDelete="u.uuid"></modal-generic>

                            <modal-generic type="updateUser" :access-level="userDecodedData.accessLevel" :index="index" :uuidToUpdate="u.uuid"></modal-generic>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


<script>

    import users from '../api/users';
    import LocalStorageService from "../services/LocalStorageService";
    import ModalGeneric from "../components/ModalGeneric";
    import * as jsonwebtoken from "jsonwebtoken";
    import configAuth from "../config/authentication";


    export default {
        name: 'users',
        components: {
            ModalGeneric
        },
        props: {},
        data: () => ({
            userDecodedData:"",
            usersList: {}
        }),
        methods: {
            getUsers: async function () {
                let token = LocalStorageService.getToken();

                try {
                    const usersList = await users.get(token);
                    return usersList;
                } catch (e) {
                    console.log(e);
                }
            },
            decodedToken: function () {
                return jsonwebtoken.verify(LocalStorageService.getToken(), configAuth.jwtSecret);
            },
        },
        created: function () {
            this.userDecodedData = this.decodedToken();
            this.getUsers().then((res) => {
                if (res.http_status === 200) {
                    this.usersList = res.data.Value.filter(el => el.uuid.substring(0, 6) !== 'DELETE');
                }
            });
        }
    }
</script>
