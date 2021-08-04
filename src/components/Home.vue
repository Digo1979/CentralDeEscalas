<template>
    <div>
        <h3 v-if="user">Olá, {{user.firt_name}} {{user.last_name}}</h3>
        <h3 v-if="!user">Você ainda não está logado</h3>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: 'Home',
        computed: {
            ...mapGetters(['user'])
        }
    }
</script>