<template>
    <div id="app">
        <div id="nav">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <router-link class="navbar-brand" to="/">Vote App</router-link>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/users">Users <i class="fa fa-user"></i></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/vote">Vote <i class="fa fa-envelope"></i></router-link>
                        </li>
                        <li class="nav-item">
                            <RenderMenuAuth class="nav-link"></RenderMenuAuth>
                        </li>
                    </ul>
                </div>

            </nav>
        </div>
        <router-view/>
    </div>
</template>

<style>
</style>
<script>
    import RenderMenuAuth from "./components/RenderMenuAuth";

    export default {
        components: {RenderMenuAuth}
    }
</script>
