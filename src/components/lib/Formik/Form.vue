<template>
    <div>
        <form @submit.prevent="handleData">
            <Field v-for="v in initialValues" :type="v.type" v-model="newValues[v.name]" :name="v.name" :val="v.value" :idLabel="v.idLabel" :textLabel="v.textLabel"></Field>
            <input type="submit"/>
        </form>
    </div>
</template>

<script>
    import Field from "./Field";
    export default {
        name: 'form',
        components: {Field},
        props: {
            initialValues: Array,
            submit: Function
        },
        data: () => ({
            newValues: {}
        }),
        methods: {
            handleData: function(){
                return this.submit(this.newValues);
            }
        }
    }
</script>
