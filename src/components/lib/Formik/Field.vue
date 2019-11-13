<template>
    <div>
        <label :for="this.idLabel"> {{this.textLabel}}
            <!-- all but (also radio) -->
        <input v-if="type !== 'select'" :type="type" @change="$emit('input', $event.target.value)" :value="val[0]" :name="name" :id="this.idLabel"/>

            <!-- only select -->
        <select v-if="type === 'select' && type !== 'radio'" :name="name" @change="$emit('input', $event.target.value)" :id="this.idLabel">
            <option value="o"> </option>
            <option v-for="o in val" :value="o">{{o}}</option>
        </select>


        </label>
    </div>
</template>
<script>
    export default {
        name:'field',
        props: {
            type:String,
            val:Array,
            name: String,
            idLabel: String,
            textLabel: String
        },
        data: () => ({

        }),
        methods: {

        }
    }
</script>
