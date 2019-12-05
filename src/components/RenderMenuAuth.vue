<template>
    <div class="renderMenuAuth">
        <router-link v-show="isLogged" to="/logout">Logout ({{this.roleDisplay}})</router-link>
        <router-link v-show="!isLogged" to="/logout">Login</router-link>
    </div>
</template>

<script>

    import LocalStorageService from "../services/LocalStorageService";
    import * as jsonwebtoken from "jsonwebtoken";
    import configAuth from "../config/authentication";

    export default {
        name: 'RenderMenuAuth',
        props: {
        },
        data: () => ({
            roleDisplay: "",
            isLogged: false
        }),
        methods: {
            checkLogin(){
                if(localStorage.getItem("access_token")){
                    let decoded = jsonwebtoken.verify(LocalStorageService.getToken(), configAuth.jwtSecret);

                    this.roleDisplay = this.renderAccessStyle(decoded["accessLevel"]);
                    return true;
                } else {
                    return false;
                }
            },
            renderAccessStyle(access){
                if(access === "ROLE_ADMIN"){
                    return "admin"
                } else {
                    return "user"
                }
            }
        },
        created() {
            // TODO -> fixed bug display admin / user on login / logout
            console.log("SET IS LOGGED ?");
            this.isLogged = this.checkLogin();
        }
    }
</script>

