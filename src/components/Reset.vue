<template>
    <form @submit.prevent="handleSubmit">
        <h3>Resetar senha</h3>
        <div class="form-group">
            <label>Senha</label>
            <input type="password" class="form-control" v-model="password" placeholder="Senha" />
        </div>
        <div class="form-group">
            <label>Confirme senha</label>
            <input type="password" class="form-control" v-model="password_confirm" placeholder="Confirme senha" />
        </div>
        <div class="d-grid gap-2">            
            <button class="btn btn-primary btn-block">Enviar</button>
        </div>          
    </form>
</template>

<script>
    import axios from 'axios'

    export default {    
        name: 'Reset',
        data() {
            return {
                password: '',
                password_confirm: ''
            }
        },
        methods: {
            async handleSubmit() {
                const response =await axios.post('reset', {
                    password: this.password,
                    password_confirm: this.password_confirm,
                    token: this.$route.params.token
                });
                console.log(response);
                this.$route.push('/login');
            }
        }
}
</script>