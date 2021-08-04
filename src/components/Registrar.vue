<template>
    <form @submit.prevent="handleSubmit">
        <error v-if="error" :error="error" />
        <h3>Registrar</h3>

        <div class="form-group">
            <label>Primeiro Nome</label>
            <input type="text" class="form-control" v-model="firt_name" placeholder="Primeiro nome"/>
        </div>

        <div class="form-group">
            <label>Último nome</label>
            <input type="text" class="form-control" v-model="last_name" placeholder="Último nome"/>
        </div>

        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="email" placeholder="Email"/>
        </div>

        <div class="form-group">
            <label>Senha</label>
            <input type="password" class="form-control" v-model="password" placeholder="Senha"/>
        </div>

        <div class="form-group">
            <label>Confirma senha</label>
            <input type="password" class="form-control" v-model="password_confirm" placeholder="Confirma senha"/>
        </div>

        <div class="d-grid gap-2">            
            <button class="btn btn-primary btn-block">Registrar</button>
        </div>        
    </form> 
</template>

<script>
    import axios from 'axios'
    import Error from './Error.vue'

    export default {
        name: 'Registrar',
        compoents: {
            Error
        },        
        data() {
            return {
                firt_name: '',
                last_name: '',
                email: '',
                password: '',
                password_confirm: '',
                error: ''
            }
        },
        methods: {
            async handleSubmit(){
                try {
                    const response = await axios.post('registrar', {
                        firt_name: this.firt_name,
                        last_name: this.last_name,
                        email: this.email,
                        password: this.password,
                        password_confirm: this.password_confirm
                    });

                    console.log(response);

                    this.$router.push('/login');
                } catch (e) {
                    this.error = "Ocorreu um erro!"
                }
            }
        }
    }

</script>
