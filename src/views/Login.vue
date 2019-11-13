<template>
    <div class="login">

        <Form :submit="onSubmit" :initialValues="[
    {name: 'email', type:'email', value: [''], idLabel: 'email', textLabel: 'Email :'},
    {name: 'password', type:'password', value:[''], idLabel:'password' ,textLabel: 'Password :'},
    ]"/>

    </div>
</template>


<script>
    import Form from '../components/lib/Formik/Form';
    import router from '../router';

    //import axios from 'axios';

    import authentication from '../../src/api/authentication';
    import LocalStorageService from "../services/LocalStorageService";

    export default {
        name: 'login',
        components: {
            Form
        },
        methods: {
            onSubmit(formData) {
                let email = formData.email;
                let password = formData.password;

                authentication
                    .login({email: email, password: password})
                    .then(function (data) {
                        if (data.http_status === 200 && data.jwt) {
                            LocalStorageService.setEntry("access_token", data.jwt);
                            router.push('/');
                        }
                    })
                    .catch(err => alert(err));
            }
        },
    }

</script>
