<template>
  <div class="home mt-4">
    <HelloWorld msg="Welcome to Your Vote application !" class="text-center"/>
    <img class="rounded mx-auto d-block" alt="Vue logo" src="../assets/vote.jpg">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>




