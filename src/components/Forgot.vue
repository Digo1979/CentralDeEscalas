<template>
    <form @submit.prevent="handleSubmit">        
        <div v-if="message" class="alert alert-success" role="alert">
            {{message}}
        </div>
        <error v-if="error" :error="error" />
        <h3>Esqueceu sua senha</h3>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="email" placeholder="Email">
        </div>
        <div class="d-grid gap-2">            
            <button class="btn btn-primary btn-block">Enviar</button>
        </div>        
    </form>
</template>

<script>
    import axios from 'axios'
    import Error from './Error.vue'
    
    export default{
        name: 'Forgot',
        compoents: {
            Error
        },
        data(){
            return {
                email: '',
                message: '',
                error: ''
            }
        },
        methods: {
            async handleSubmit() {
                try {
                const response = await axios.post('forgot', {
                    email: this.email
                });
                this.error = '';
                this.message = "Email enviado com sucesso!";
                console.log(response);
                } catch (e) {
                    this.message = '';
                    this.error = "Ocorreu um erro!";
                }
            }
        }
    }
</script>