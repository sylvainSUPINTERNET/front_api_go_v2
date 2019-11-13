<template>
    <div>
        <label>{{label}}}</label>
        <label v-for="choice in choices" :key="choice.id">
            {{choice.text}}
            <input type="radio" :name="name" :value="choice.id" @change="$emit('input', $event.target.value)" :checked="value === choice.id"/>
            <!-- emit ici va remonter la valeur sur l'event change (valeur de l'input ici) au component parent  (data) et la bind sur sa valeur qu'il a dans data (ici status) -->
            <!-- Dans ce cas v-model va être update car l'event natif du DOM (input / change) va agir sur v-model-->
        </label>
    </div>
</template>


<script>
    export default {
        name:'RadioGroup',
        props: {
            value: String,
            label:String,
            choices: Array,
            name: String
        },
    }
</script>


<style scoped>

</style>
